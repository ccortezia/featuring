import json
from fixtures import *
from featuring.user.fixtures import create_users
from featuring.user import User


@pytest.fixture(scope='session')
def setdb(request):
    User.delete().execute()
    create_users()


def test_session_create(setdb, client):
    resp = client.post("/api/v1/session", data={'username': 'root', 'password': '123123'})
    assert resp.status_code == 201
    data = json.loads(resp.data)
    assert 'token' in data


def test_session_create_invalid_username_fail(setdb, client):
    resp = client.post("/api/v1/session", data={'username': 'blaster', 'password': '123123'})
    assert resp.status_code == 401
    data = json.loads(resp.data)
    assert 'token' not in data


def test_session_create_invalid_password_fail(setdb, client):
    resp = client.post("/api/v1/session", data={'username': 'root', 'password': '6631'})
    assert resp.status_code == 401
    data = json.loads(resp.data)
    assert 'token' not in data


def test_session_create_missing_username_fail(setdb, client):
    resp = client.post("/api/v1/session", data={'password': '6631'})
    assert resp.status_code == 400
    data = json.loads(resp.data)
    assert 'token' not in data


def test_session_create_missing_password_fail(setdb, client):
    resp = client.post("/api/v1/session", data={'username': 'root'})
    assert resp.status_code == 400
    data = json.loads(resp.data)
    assert 'token' not in data


def test_session_get(setdb, client):
    resp = client.post("/api/v1/session", data={'username': 'root', 'password': '123123'})
    token = json.loads(resp.data)['token']
    resp = client.get("/api/v1/session", headers={'Authorization': 'Bearer {}'.format(token)})
    assert resp.status_code == 200
    data = json.loads(resp.data)
    assert data['username'] == 'root'
