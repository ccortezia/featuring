import logging
import json
from fixtures import *
from featuring.common.utils import now


def test_feature_request_list(client):
    resp = client.get("/api/v1/features")
    assert resp.status_code == 200
    assert len(json.loads(resp.data)) > 0


def test_feature_request_create(client):
    data = {"title": "novo", "client": 1, "priority": 100, "ticket_url": "http://bugzimp/1"}
    resp = client.post("/api/v1/features", data=data)
    assert resp.status_code == 201
    assert len(json.loads(resp.data)) > 0


@pytest.mark.parametrize("field", ["priority", "ticket_url", "client", "ticket_url"])
def test_feature_request_create_should_fail_with_missing_field(client, field):
    data = {"title": "novo", "client": 1, "priority": 100, "ticket_url": "http://bugzimp/1"}
    data.pop(field)
    resp = client.post("/api/v1/features", data=data)
    assert resp.status_code == 400
    assert len(json.loads(resp.data)) > 0


def test_feature_request_get_one(client):
    resp = client.get("/api/v1/features/1")
    assert resp.status_code == 200
    assert len(json.loads(resp.data)) > 0


def test_feature_request_get_no_existent_should_fail(client):
    resp = client.get("/api/v1/features/oioio")
    assert resp.status_code == 404
    resp = client.get("/api/v1/features/909")
    assert resp.status_code == 404


def test_feature_request_update(client):
    data = {"title": "novo", "client": 1, "priority": 100, "ticket_url": "http://bugzimp/1"}
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 201
    assert len(json.loads(resp.data)) > 0


def test_feature_request_update_with_valid_deadline(client):
    data = {"deadline": now().isoformat()}
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 201


def test_feature_request_update_with_invalid_deadline_should_fail(client):
    data = {"deadline": "2010-01"}
    resp = client.patch("/api/v1/features/1", data=data)
    assert resp.status_code == 400


def test_feature_request_delete(client):
    resp = client.delete("/api/v1/features/1")
    assert resp.status_code == 204
