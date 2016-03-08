import logging
import json
from fixtures import *
from featuring.common.utils import now
from featuring.feature_request.models import FeatureRequest, Client
from featuring.feature_request.fixtures import create_clients, create_demo_feature_requests


@pytest.fixture
def setdb(request):
    def fin():
        FeatureRequest.delete().execute()
        Client.delete().execute()
    request.addfinalizer(fin)
    fin()
    clients = create_clients()
    create_demo_feature_requests(clients)


DATA_TEMPLATE = {
    "title": "New feature request for the product",
    "client": 1,
    "priority": 100,
    "product_area": 1,
    "ticket_url": "http://bugzimp/1"
}


def test_feature_request_list(setdb, client, auth):
    resp = client.get("/api/v1/features", headers=auth)
    assert resp.status_code == 200


def test_feature_request_list_auth_error(setdb, client):
    resp = client.get("/api/v1/features")
    assert resp.status_code == 401


def test_feature_request_create(setdb, client, auth):
    data = DATA_TEMPLATE.copy()
    resp = client.post("/api/v1/features", data=data, headers=auth)
    assert resp.status_code == 201


def test_feature_request_create_auth_error(setdb, client):
    data = DATA_TEMPLATE.copy()
    resp = client.post("/api/v1/features", data=data)
    assert resp.status_code == 401


def test_feature_request_create_with_invalid_client_should_fail(setdb, client, auth):
    data = DATA_TEMPLATE.copy()
    data['client'] = 1010
    resp = client.post("/api/v1/features", data=data, headers=auth)
    assert resp.status_code == 400


@pytest.mark.parametrize("field", ["ticket_url", "client", "ticket_url", "product_area"])
def test_feature_request_create_should_fail_with_missing_field(setdb, client, field, auth):
    data = DATA_TEMPLATE.copy()
    data.pop(field)
    resp = client.post("/api/v1/features", data=data, headers=auth)
    assert resp.status_code == 400


def test_feature_request_get_one(setdb, client, auth):
    resp = client.get("/api/v1/features/1", headers=auth)
    assert resp.status_code == 200


def test_feature_request_get_one_auth_error(setdb, client):
    resp = client.get("/api/v1/features/1")
    assert resp.status_code == 401


def test_feature_request_get_no_existent_should_fail(setdb, client, auth):
    resp = client.get("/api/v1/features/oioio", headers=auth)
    assert resp.status_code == 404
    resp = client.get("/api/v1/features/909", headers=auth)
    assert resp.status_code == 404


def test_feature_request_update(setdb, client, auth):
    data = DATA_TEMPLATE.copy()
    data['priority'] = 100
    resp = client.patch("/api/v1/features/1", data=data, headers=auth)
    assert resp.status_code == 201
    resp = client.get("/api/v1/features/1", headers=auth)
    assert json.loads(resp.data)["priority"] == 9


def test_feature_request_update_auth_error(setdb, client):
    data = DATA_TEMPLATE.copy()
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 401


def test_feature_request_update_with_valid_deadline(setdb, client, auth):
    dt = now().isoformat()
    data = {"deadline": dt}
    resp = client.patch("/api/v1/features/1", data=data, headers=auth)
    assert resp.status_code == 201
    resp = client.get("/api/v1/features/1", headers=auth)
    assert json.loads(resp.data)["deadline"] == dt


def test_feature_request_update_with_invalid_deadline_should_fail(setdb, client, auth):
    data = {"deadline": "2010-01"}
    resp = client.patch("/api/v1/features/1", data=data, headers=auth)
    assert resp.status_code == 400


def test_feature_request_delete(setdb, client, auth):
    resp = client.delete("/api/v1/features/1", headers=auth)
    assert resp.status_code == 204


def test_feature_request_delete_auth_error(setdb, client):
    resp = client.delete("/api/v1/features/1")
    assert resp.status_code == 401
