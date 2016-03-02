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


def test_create_feature_request(setdb):
    FeatureRequest.create(
        client=Client.get(Client.id == 1),
        title="Main Title",
        description="Long Description",
        priority=1,
        product_area=1,
        ticket_url='http://local.trac/1')


def test_create_feature_requests_with_repeated_priority_client_pair_should_fail(setdb):
    FeatureRequest.create(
        client=Client.get(Client.id == 1),
        title="Main Title",
        description="Long description",
        priority=1,
        product_area=1,
        ticket_url='http://local.trac/1')
    with pytest.raises(IntegrityError):
        FeatureRequest.create(
            client=Client.get(Client.id == 1),
            title="Another title",
            description="Longest description ever",
            priority=1,
            product_area=2,
            ticket_url='http://local.trac/2')


def test_create_feature_requests_with_valid_priority_client_pair(setdb):
    FeatureRequest.create(
        client=Client.get(Client.id == 1),
        title="Main Title",
        description="Long description",
        priority=1,
        product_area=1,
        ticket_url='http://local.trac/1')
    FeatureRequest.create(
        client=Client.get(Client.id == 2),
        title="Another title",
        description="Longest description ever",
        priority=1,
        product_area=2,
        ticket_url='http://local.trac/2')


def test_create_feature_request_with_repeated_title_should_fail(setdb):
    FeatureRequest.create(
        client=Client.get(Client.id == 1),
        title="Main Title",
        description="Long description",
        priority=1,
        product_area=1,
        ticket_url='http://local.trac/1')
    with pytest.raises(IntegrityError):
        FeatureRequest.create(
            client=Client.get(Client.id == 2),
            title="Main Title",
            description="Longest description ever",
            priority=1,
            product_area=2,
            ticket_url='http://local.trac/2')
