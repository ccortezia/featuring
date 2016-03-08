import json
from fixtures import *
from featuring.user import User
from featuring.user.fixtures import create_users


def test_user_create(client, auth):
    data = {'username': 'user-1', 'fullname': 'User number #1'}
    resp = client.post("/api/v1/users", data=data, headers=auth)
    assert resp.status_code == 201
    rdata = json.loads(resp.data)
    assert rdata['username'] == data['username']
    assert rdata['fullname'] == data['fullname']


def test_user_create_with_password(client, auth):
    data = {'username': 'user-2', 'fullname': 'User number #1', 'password': 'passphrase'}
    resp = client.post("/api/v1/users", data=data, headers=auth)
    assert resp.status_code == 201
    rdata = json.loads(resp.data)
    assert rdata['username'] == data['username']
    assert rdata['fullname'] == data['fullname']


def test_user_create_auth_error(client):
    data = {'username': 'user-1', 'fullname': 'User number #1'}
    resp = client.post("/api/v1/users", data=data)
    assert resp.status_code == 401


@pytest.mark.parametrize("field", ["username", "fullname"])
def test_feature_request_create_should_fail_with_missing_field(client, field, auth):
    data = {'username': 'root', 'fullname': 'SuperRoot'}
    data.pop(field)
    resp = client.post("/api/v1/users", data=data, headers=auth)
    assert resp.status_code == 400


def test_user_get(client, auth):
    resp = client.get("/api/v1/users/root", headers=auth)
    assert resp.status_code == 200
    rdata = json.loads(resp.data)
    assert rdata['username'] == 'root'


def test_user_get_auth_error(client):
    resp = client.get("/api/v1/users/root")
    assert resp.status_code == 401


def test_user_update(client, auth):
    data = {'fullname': 'AdolfHeinz'}
    resp = client.patch("/api/v1/users/root", data=data, headers=auth)
    assert resp.status_code == 201
    rdata = json.loads(resp.data)
    assert rdata['fullname'] == 'AdolfHeinz'


def test_user_update_auth_error(client):
    data = {'fullname': 'AdolfHeinz'}
    resp = client.patch("/api/v1/users/root", data=data)
    assert resp.status_code == 401


def test_user_delete(client, auth):
    resp = client.delete("/api/v1/users/root", headers=auth)
    assert resp.status_code == 204


def test_user_delete_auth_error(client):
    resp = client.delete("/api/v1/users/root")
    assert resp.status_code == 401
