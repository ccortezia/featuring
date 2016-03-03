from featuring import app
from featuring.common.utils import tomorrow
from playhouse.signals import Model, pre_save, post_delete, pre_delete

from peewee import (
    CharField,
    DateTimeField,
    IntegerField,
    ForeignKeyField,
    Check,
    fn
)


PRODUCT_AREAS = {
    1: 'Policies',
    2: 'Billing',
    3: 'Claims',
    4: 'Report'
}


class Client(Model):
    label = CharField(max_length=20, unique=True)

    class Meta:
        db_table = 'client'
        database = app.db


class FeatureRequest(Model):
    title = CharField(max_length=60, unique=True)
    description = CharField(max_length=1000, default="")
    deadline = DateTimeField(default=lambda: tomorrow().isoformat())
    priority = IntegerField(constraints=[Check('priority > 0')])
    client = ForeignKeyField(Client, related_name='feature_requests')
    product_area = CharField(choices=PRODUCT_AREAS.items())
    ticket_url = CharField(max_length=300)

    class Meta:
        db_table = 'feature_request'
        database = app.db
        indexes = ((('client', 'priority'), True),)

    @classmethod
    def lowest_priority(cls, client):
        return cls.select() \
            .where(cls.client == client) \
            .aggregate(fn.Max(cls.priority)) or 0

    @classmethod
    def shift_priorities(cls, client, p_init, p_end, delta):
        if not delta:
            return

        delta_factor = delta / abs(delta)

        filtering = (
            cls.client == client,
            cls.priority >= p_init,
            cls.priority <= p_end)

        ordering = cls.priority.desc() if delta > 0 else cls.priority.asc()

        # Fetch affected sibblings
        items = cls.select() \
            .where(*filtering) \
            .order_by(ordering)

        # Arrange sibblings to ensure priority consistency
        for item in items:
            cls.update(priority=cls.priority + delta) \
               .where(cls.id == item.id) \
               .execute()


@pre_delete(sender=FeatureRequest)
def sort_priorities_after_delete(cls, instance):
    lowest = cls.lowest_priority(instance.client)
    set_priority_aside(instance.id, lowest)
    cls.shift_priorities(
        instance.client,
        instance.priority + 1,
        lowest,
        -1)


class PriorityUpdateSpec:
    obj = None
    client = None
    priority = None
    lowest = None
    next = None


def create_priority_update_specs(current, updated):
    exists = current.id is not None
    cspec = PriorityUpdateSpec()
    cspec.obj = current
    cspec.client = current.client
    cspec.lowest = FeatureRequest.lowest_priority(current.client)
    cspec.next = cspec.lowest + (0 if exists else 1)
    cspec.priority = cspec.obj.priority if exists else cspec.next
    uspec = PriorityUpdateSpec()
    uspec.obj = updated
    uspec.client = updated.client
    uspec.lowest = FeatureRequest.lowest_priority(updated.client)
    uspec.next = uspec.lowest + (0 if exists and cspec.client == uspec.client else 1)
    uspec.priority = updated.priority or uspec.next
    uspec.priority = min(uspec.next, uspec.priority)
    return cspec, uspec


def set_priority_aside(from_id, lowest):
    cls = FeatureRequest
    safe_tmp = lowest + 10
    cls.update(priority=safe_tmp) \
       .where(cls.id == from_id) \
       .execute()


def delta_1(v0, v1):
    delta = (v1 - v0) * (-1)
    return (delta / abs(delta))


@pre_save(sender=FeatureRequest)
def sort_priorities_before_update_and_create(cls, instance, created):

    with instance._meta.database.atomic():

        exists = instance.id is not None
        fresh = exists and cls.get(cls.id == instance.id)

        # Normalize current and updated state for analysis.
        current, updated = create_priority_update_specs(
            current=fresh or instance,
            updated=instance)

        # Potentially alter object being saved.
        instance.priority = updated.priority

        if current.client == updated.client:
            # No change of value detected in the instance.
            if (updated.priority - current.priority) == 0:
                return

            # No need to arrange sibblings.
            if updated.priority > updated.next:
                return

            # Update a single client priorities.
            exists and set_priority_aside(instance.id, current.lowest)
            delta = delta_1(current.priority, updated.priority)
            cls.shift_priorities(updated.client,
                                 min(current.priority, updated.priority),
                                 max(current.priority, updated.priority),
                                 delta)
        else:
            # Update the previous client priorities.
            exists and set_priority_aside(instance.id, current.lowest)
            cls.shift_priorities(current.client,
                                 current.priority,
                                 current.lowest,
                                 -1)
            # Update the target client priorities.
            cls.shift_priorities(updated.client,
                                 updated.priority,
                                 updated.lowest,
                                 +1)
