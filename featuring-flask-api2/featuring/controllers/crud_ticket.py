from sqlalchemy.sql import text
from featuring import db
from featuring.entities.ticket.models import Ticket
from featuring.utilities.common import maybe_update
from .persistence import normalize_db_update_err, normalize_db_fetch_err


# --------------------------------------------------------------------------------------------------
# Ticket CRUD
# --------------------------------------------------------------------------------------------------

@normalize_db_update_err
def create_one_ticket(title, product_id, client_id,
                      description=None,
                      deadline=None,
                      priority=None,
                      url=None):

    instance = Ticket(**locals())
    db.session.add(instance)

    # Priority requires special handling.
    update_ticket_priority(instance, priority, allocate=True)

    return instance


@normalize_db_fetch_err
def retrieve_ticket_by_ticket_id(ticket_id):
    return Ticket.query.filter_by(ticket_id=ticket_id).one()


def retrieve_all_tickets():
    return Ticket.query.order_by(Ticket.ticket_id)


@normalize_db_fetch_err
@normalize_db_update_err
def update_ticket_by_ticket_id(ticket_id=None,
                               title=None,
                               product_id=None,
                               client_id=None,
                               description=None,
                               deadline=None,
                               priority=None,
                               url=None):

    ticket = Ticket.query.filter_by(ticket_id=ticket_id).one()
    maybe_update(ticket, 'title', title)
    maybe_update(ticket, 'product_id', product_id)
    maybe_update(ticket, 'client_id', client_id)
    maybe_update(ticket, 'description', description)
    maybe_update(ticket, 'deadline', deadline)
    maybe_update(ticket, 'url', url)
    db.session.flush()

    # Priority requires special handling.
    if priority is not None:
        update_ticket_priority(ticket, priority)

    return ticket


def update_ticket_priority(ticket, priority, allocate=False):

    # Priority requires special handling.
    with db.session.no_autoflush:

        # Lock table to reliably use table aggregation value on computation.
        Ticket.query.with_for_update()

        # Adjust new incoming value to range [1, maximum].
        maximum = _greatest_priority_number() + (1 if allocate else 0)
        priority = priority or (maximum if allocate else 0)  # Set dynamic default
        priority = min(priority, maximum)  # Adjust to maximum
        priority = max(1, priority)  # Adjust to minimum

        previous_priority = ticket.priority
        no_change = priority == previous_priority

        # Optimized early return in case no change is needed.
        if not allocate and no_change:
            return

        # Forces Shift+ in case there is no previous value.
        # Forces Shift+ in case this is an explicit allocation.
        if not previous_priority or allocate:
            previous_priority = priority + 1

        # Update affected rows priorities.
        _shift_switch_priority_block(
            floor=min(previous_priority, priority),
            ceil=max(previous_priority, priority),
            shift=(previous_priority > priority) - (previous_priority < priority))

    ticket.priority = priority
    db.session.flush()


def delete_ticket_by_ticket_id(ticket_id):
    return Ticket.query.filter_by(ticket_id=ticket_id).delete()


def _greatest_priority_number():
    return db.session.query(db.func.max(Ticket.priority)).scalar() or 0


def _shift_switch_priority_block(floor, ceil, shift):
    if db.engine.name == 'mysql':
        return _shift_switch_priority_block_mysql(floor, ceil, shift)

    raise NotImplementedError(f'not supported when using {db.engine.name} as the database')


def _shift_switch_priority_block_mysql(floor, ceil, shift):
    """Shifts the `priority` column of rows respective to the given range according to `shift`.

    The overriden value (either floor or ceil, depending on shift) assumes its counter part. So
    when the block is shifted by -1, floor will become ceil in the end. When the block is shifted by
    +1, ceil will become floor in the end.

    NOTE 1: the reason this function uses plain SQL instead of the ORM is because no good equivalent
    to `update ... order by` syntax in SQLAlchemy at the ORM layer.

    NOTE 2: a solution to this kind of problem can be implemented in a more robust way using native
    database triggers depending on specific database deployment constraints (transaction level) and
    if the database supports deferred unique integrity checks. As per MySQL 8.x that type of
    deferred checking is not possible, and bulk updating sequencial unique integers is faded to
    violate a constraint. The currently accepted solution is to leverage the `order by` support on
    update operations to make sure rows are updated in a predictable order. Additionally to that,
    to fulfill this specific use case an out-of-range temporary placeholder has to be used to avoid
    boundary clashes.

    @param floor: int, target range initial value
    @param ceil: int, target range final value
    @param shift: a positive or negative integer indicating the shift direction
    """

    # Placeholder must be a value outside the integers range being shifted.
    placeholder = _greatest_priority_number() + 2

    params = dict(floor=floor, ceil=ceil, placeholder=placeholder)

    if shift < 0:
        db.session.execute(text('''
            update tickets
            set priority = :placeholder
            where priority = :floor
        '''), params)
        db.session.execute(text('''
            update tickets
            set priority = priority - 1
            where priority > :floor and priority <= :ceil
            order by priority asc;
            '''), params)
        db.session.execute(text('''
            update tickets
            set priority = :floor
            where priority = :ceil
        '''), params)

    elif shift > 0:
        db.session.execute(text('''
            update tickets
            set priority = :placeholder
            where priority = :ceil
        '''), params)
        db.session.execute(text('''
            update tickets
            set priority = priority + 1
            where priority >= :floor and priority < :ceil
            order by priority desc;
            '''), params)
        db.session.execute(text('''
            update tickets
            set priority = :ceil
            where priority = :floor
        '''), params)
