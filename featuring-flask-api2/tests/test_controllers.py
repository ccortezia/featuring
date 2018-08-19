import pytest
from .fixtures import *  # noqa
from featuring.controllers.crud_ticket import update_ticket_by_ticket_id


@pytest.mark.parametrize(
    'instance_idx,new_priority,expectation',
    (
        (0,  2, [2, 1, 3, 4]),
        (1,  1, [2, 1, 3, 4]),
        (0,  4, [4, 1, 2, 3]),
        (-1, 1, [2, 3, 4, 1]),
        (0,  5, [4, 1, 2, 3]),
        (0,  0, [1, 2, 3, 4]),
        (1,  3, [1, 3, 2, 4]),
    )
)
def test_update_ticket_by_ticket_id(db, some_tickets, instance_idx, new_priority, expectation):
    tickets = some_tickets.all()
    target_ticket_id = tickets[instance_idx].ticket_id
    update_ticket_by_ticket_id(target_ticket_id, priority=new_priority)
    db.session.expire_all()
    assert([t.priority for t in some_tickets.all()] == expectation)
    db.session.rollback()
