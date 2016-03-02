from featuring import app
from featuring.common.utils import tomorrow

from peewee import (
    Model,
    CharField,
    DateTimeField,
    IntegerField,
    ForeignKeyField
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
    priority = IntegerField()
    client = ForeignKeyField(Client, related_name='feature_requests')
    product_area = CharField(choices=PRODUCT_AREAS.items())
    ticket_url = CharField(max_length=300)

    class Meta:
        db_table = 'feature_request'
        database = app.db
        indexes = ((('client', 'priority'), True),)
