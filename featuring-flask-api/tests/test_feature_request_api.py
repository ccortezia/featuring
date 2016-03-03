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


def test_feature_request_list(setdb, client):
    resp = client.get("/api/v1/features")
    assert resp.status_code == 200


def test_feature_request_create(setdb, client):
    data = {"title": "novo", "client": 1, "priority": 100, "product_area": 1, "ticket_url": "http://bugzimp/1"}
    resp = client.post("/api/v1/features", data=data)
    assert resp.status_code == 201


def test_feature_request_create_with_invalid_client_should_fail(setdb, client):
    data = {"title": "novo", "client": 1010, "priority": 100, "product_area": 1, "ticket_url": "http://bugzimp/1"}
    resp = client.post("/api/v1/features", data=data)
    assert resp.status_code == 400


@pytest.mark.parametrize("field", ["ticket_url", "client", "ticket_url", "product_area"])
def test_feature_request_create_should_fail_with_missing_field(setdb, client, field):
    data = {"title": "novo", "client": 1, "priority": 100, "product_area": 2, "ticket_url": "http://bugzimp/1"}
    data.pop(field)
    resp = client.post("/api/v1/features", data=data)
    assert resp.status_code == 400


def test_feature_request_get_one(setdb, client):
    resp = client.get("/api/v1/features/1")
    assert resp.status_code == 200


def test_feature_request_get_no_existent_should_fail(setdb, client):
    resp = client.get("/api/v1/features/oioio")
    assert resp.status_code == 404
    resp = client.get("/api/v1/features/909")
    assert resp.status_code == 404


def test_feature_request_update(setdb, client):
    data = {"title": "novo", "client": 1, "priority": 100, "ticket_url": "http://bugzimp/1"}
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 201
    resp = client.get("/api/v1/features/1")
    assert json.loads(resp.data)["priority"] == 9


def test_feature_request_update_with_valid_deadline(setdb, client):
    dt = now().isoformat()
    data = {"deadline": dt}
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 201
    resp = client.get("/api/v1/features/1")
    assert json.loads(resp.data)["deadline"] == dt


def test_feature_request_update_with_invalid_deadline_should_fail(setdb, client):
    data = {"deadline": "2010-01"}
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 400


def test_feature_request_delete(setdb, client):
    resp = client.delete("/api/v1/features/1")
    assert resp.status_code == 204
