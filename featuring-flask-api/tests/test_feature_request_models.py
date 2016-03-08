import pytest
from peewee import IntegrityError
from featuring.feature_request.models import FeatureRequest, Client
from featuring.feature_request.fixtures import create_clients


@pytest.fixture
def setdb(request):
    def fin():
        FeatureRequest.delete().execute()
        Client.delete().execute()
    request.addfinalizer(fin)
    fin()
    create_clients()


def padded_title(title):
    return " " * 10 + title


def create_feature_request(title, client, priority):
    FeatureRequest.create(
        client=Client.get(Client.id == client),
        title=padded_title(title),
        description="",
        priority=priority,
        product_area=1,
        ticket_url='http://local.trac/1')


def update_feature_request(title, client, priority):
    obj = FeatureRequest.get(FeatureRequest.title == padded_title(title))
    obj.client = Client.get(Client.id == client)
    obj.priority = priority
    obj.save()


def delete_feature_request(title):
    obj = FeatureRequest.get(FeatureRequest.title == padded_title(title))
    obj.delete_instance()


def get_feature_request(title):
    return FeatureRequest.get(FeatureRequest.title == padded_title(title))


def test_create_feature_request_success(setdb):
    create_feature_request("t0", 1, 1)
    assert get_feature_request("t0").title == padded_title("t0")
    assert get_feature_request("t0").client_id == 1
    assert get_feature_request("t0").priority == 1


def test_create_feature_request_at_highest_priority_should_offset_lesser_ones(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    create_feature_request("t5", 1, 1)
    assert get_feature_request("t1").priority == 2
    assert get_feature_request("t2").priority == 3
    assert get_feature_request("t3").priority == 4
    assert get_feature_request("t4").priority == 5
    assert get_feature_request("t5").priority == 1


def test_create_feature_request_at_mid_level_priority_should_offset_lesser_ones(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    create_feature_request("t5", 1, 3)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 4
    assert get_feature_request("t4").priority == 5
    assert get_feature_request("t5").priority == 3


def test_create_feature_request_at_lowest_priority_should_not_change_sibblings(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    create_feature_request("t5", 1, 4)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
    assert get_feature_request("t4").priority == 5
    assert get_feature_request("t5").priority == 4


def test_create_feature_request_under_lowest_priority_should_not_change_sibblings(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    create_feature_request("t5", 1, 5)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
    assert get_feature_request("t4").priority == 4
    assert get_feature_request("t5").priority == 5


def test_create_feature_request_with_unknown_priority_should_set_at_lowest(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    create_feature_request("t5", 1, None)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
    assert get_feature_request("t4").priority == 4
    assert get_feature_request("t5").priority == 5


def test_create_feature_request_under_priority_should_compact_range(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    create_feature_request("t5", 1, 6)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
    assert get_feature_request("t4").priority == 4
    assert get_feature_request("t5").priority == 5


def test_create_feature_request_client_priority_namespace(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, None)
    create_feature_request("t4", 2, 1)
    create_feature_request("t5", 2, None)
    create_feature_request("t6", 3, None)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
    assert get_feature_request("t4").priority == 1
    assert get_feature_request("t5").priority == 2
    assert get_feature_request("t6").priority == 1


def test_create_feature_request_with_negative_priority_should_fail(setdb):
    with pytest.raises(IntegrityError):
        create_feature_request("t1", 1, -1)


def test_create_feature_request_with_repeated_title_should_fail(setdb):
    create_feature_request("title-1", 1, 1)
    with pytest.raises(IntegrityError):
        create_feature_request("title-1", 1, 2)


# ---

def test_update_feature_request_increase_priority_to_mid_level(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    update_feature_request("t4", 1, 2)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 3
    assert get_feature_request("t3").priority == 4
    assert get_feature_request("t4").priority == 2


def test_update_feature_request_increase_priority_to_highest(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    update_feature_request("t4", 1, 1)
    assert get_feature_request("t1").priority == 2
    assert get_feature_request("t2").priority == 3
    assert get_feature_request("t3").priority == 4
    assert get_feature_request("t4").priority == 1


def test_update_feature_request_decrease_priority_to_mid_level(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    update_feature_request("t1", 1, 3)
    assert get_feature_request("t1").priority == 3
    assert get_feature_request("t2").priority == 1
    assert get_feature_request("t3").priority == 2
    assert get_feature_request("t4").priority == 4


def test_update_feature_request_decrease_priority_to_lowest(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    update_feature_request("t2", 1, 4)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 4
    assert get_feature_request("t3").priority == 2
    assert get_feature_request("t4").priority == 3


def test_update_feature_request_decrease_priority_to_under_lowest(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    update_feature_request("t2", 1, 10)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 4
    assert get_feature_request("t3").priority == 2
    assert get_feature_request("t4").priority == 3


def test_update_feature_request_increase_priority_over_maximum(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    with pytest.raises(IntegrityError):
        update_feature_request("t4", 1, -1)


def test_update_feature_request_keep_client_and_priority_should_not_change_sibblings(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    update_feature_request("t1", 1, 1)
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
    assert get_feature_request("t4").priority == 4


def test_update_feature_request_change_client_keep_priority_should_change_sibblings(setdb):
    create_feature_request("t1.1", 1, 1)
    create_feature_request("t1.2", 1, 2)
    create_feature_request("t1.3", 1, 3)
    create_feature_request("t1.4", 1, 4)
    create_feature_request("t2.1", 2, 1)
    create_feature_request("t2.2", 2, 2)
    create_feature_request("t2.3", 2, 3)
    update_feature_request("t1.1", 2, 1)
    assert get_feature_request("t1.1").priority == 1
    assert get_feature_request("t1.2").priority == 1
    assert get_feature_request("t1.3").priority == 2
    assert get_feature_request("t1.4").priority == 3
    assert get_feature_request("t2.1").priority == 2
    assert get_feature_request("t2.2").priority == 3
    assert get_feature_request("t2.3").priority == 4


def test_update_feature_request_change_client_set_highest_priority_should_change_sibblings(setdb):
    create_feature_request("t1.1", 1, 1)
    create_feature_request("t1.2", 1, 2)
    create_feature_request("t1.3", 1, 3)
    create_feature_request("t1.4", 1, 4)
    create_feature_request("t2.1", 2, 1)
    create_feature_request("t2.2", 2, 2)
    create_feature_request("t2.3", 2, 3)
    update_feature_request("t1.3", 2, 1)
    assert get_feature_request("t1.1").priority == 1
    assert get_feature_request("t1.2").priority == 2
    assert get_feature_request("t1.3").priority == 1
    assert get_feature_request("t1.4").priority == 3
    assert get_feature_request("t2.1").priority == 2
    assert get_feature_request("t2.2").priority == 3
    assert get_feature_request("t2.3").priority == 4


def test_update_feature_request_change_client_set_mid_level_priority_should_change_sibblings(setdb):
    create_feature_request("t1.1", 1, 1)
    create_feature_request("t1.2", 1, 2)
    create_feature_request("t1.3", 1, 3)
    create_feature_request("t1.4", 1, 4)
    create_feature_request("t2.1", 2, 1)
    create_feature_request("t2.2", 2, 2)
    create_feature_request("t2.3", 2, 3)
    update_feature_request("t1.3", 2, 2)
    assert get_feature_request("t1.1").priority == 1
    assert get_feature_request("t1.2").priority == 2
    assert get_feature_request("t1.3").priority == 2
    assert get_feature_request("t1.4").priority == 3
    assert get_feature_request("t2.1").priority == 1
    assert get_feature_request("t2.2").priority == 3
    assert get_feature_request("t2.3").priority == 4


def test_update_feature_request_change_client_set_lowest_level_priority_should_change_sibblings(setdb):
    create_feature_request("t1.1", 1, 1)
    create_feature_request("t1.2", 1, 2)
    create_feature_request("t1.3", 1, 3)
    create_feature_request("t1.4", 1, 4)
    create_feature_request("t2.1", 2, 1)
    create_feature_request("t2.2", 2, 2)
    create_feature_request("t2.3", 2, 3)
    update_feature_request("t1.3", 2, 4)
    assert get_feature_request("t1.1").priority == 1
    assert get_feature_request("t1.2").priority == 2
    assert get_feature_request("t1.3").priority == 4
    assert get_feature_request("t1.4").priority == 3
    assert get_feature_request("t2.1").priority == 1
    assert get_feature_request("t2.2").priority == 2
    assert get_feature_request("t2.3").priority == 3


def test_update_feature_request_change_client_set_under_lowest_level_priority_should_change_sibblings(setdb):
    create_feature_request("t1.1", 1, 1)
    create_feature_request("t1.2", 1, 2)
    create_feature_request("t1.3", 1, 3)
    create_feature_request("t1.4", 1, 4)
    create_feature_request("t2.1", 2, 1)
    create_feature_request("t2.2", 2, 2)
    create_feature_request("t2.3", 2, 3)
    update_feature_request("t1.3", 2, 14)
    assert get_feature_request("t1.1").priority == 1
    assert get_feature_request("t1.2").priority == 2
    assert get_feature_request("t1.3").priority == 4
    assert get_feature_request("t1.4").priority == 3
    assert get_feature_request("t2.1").priority == 1
    assert get_feature_request("t2.2").priority == 2
    assert get_feature_request("t2.3").priority == 3


def test_update_feature_request_change_client_set_priority_single_element_on_target_client(setdb):
    create_feature_request("t1.1", 1, 1)
    create_feature_request("t1.2", 1, 2)
    create_feature_request("t1.3", 1, 3)
    create_feature_request("t1.4", 1, 4)
    create_feature_request("t2.1", 2, 1)
    update_feature_request("t1.3", 2, 1)
    assert get_feature_request("t1.1").priority == 1
    assert get_feature_request("t1.2").priority == 2
    assert get_feature_request("t1.3").priority == 1
    assert get_feature_request("t1.4").priority == 3
    assert get_feature_request("t2.1").priority == 2


# ---

def test_delete_feature_request_highest_priority_should_change_sibblings(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    delete_feature_request("t1")
    assert get_feature_request("t2").priority == 1
    assert get_feature_request("t3").priority == 2
    assert get_feature_request("t4").priority == 3


def test_delete_feature_request_mid_level_priority_should_change_sibblings(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    delete_feature_request("t2")
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t3").priority == 2
    assert get_feature_request("t4").priority == 3


def test_delete_feature_request_lowest_priority_should_not_change_sibblings(setdb):
    create_feature_request("t1", 1, 1)
    create_feature_request("t2", 1, 2)
    create_feature_request("t3", 1, 3)
    create_feature_request("t4", 1, 4)
    delete_feature_request("t4")
    assert get_feature_request("t1").priority == 1
    assert get_feature_request("t2").priority == 2
    assert get_feature_request("t3").priority == 3
