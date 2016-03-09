import json
from fixtures import *
from featuring.user import User
from featuring.signup import Signup


@pytest.fixture()
def setdb(request):
    Signup.delete().execute()


def test_signup_create(setdb, client):
    data = {'username': 'user-1', 'fullname': 'User number #1', 'email': 'user1@foo.org'}
    resp = client.post("/api/v1/signup", data=data)
    rdata = json.loads(resp.data)
    assert resp.status_code == 201
    assert rdata['pending']
    assert Signup.select().count() == 1


def test_signup_create_repeated(setdb, client):
    data = {'username': 'user-1', 'fullname': 'User number #1', 'email': 'user1@foo.org'}
    resp = client.post("/api/v1/signup", data=data)
    resp = client.post("/api/v1/signup", data=data)
    rdata = json.loads(resp.data)
    assert resp.status_code == 400
    assert Signup.select().count() == 1


@pytest.mark.parametrize("field", ["email", "username", "fullname"])
def test_signup_create_should_fail_with_missing_field(setdb, client, field):
    data = {'username': 'user-1', 'fullname': 'Outsider-1', 'email': 'outlander@ooo.com'}
    data.pop(field)
    resp = client.post("/api/v1/signup", data=data)
    assert resp.status_code == 400
    assert Signup.select().count() == 0


def test_signup_get(setdb, client):
    data = {'username': 'user-1', 'fullname': 'Outsider-1', 'email': 'outlander@ooo.com'}
    resp = client.post("/api/v1/signup", data=data)
    rdata = json.loads(resp.data)
    uid = rdata['uid']
    assert rdata['pending']
    resp = client.get("/api/v1/signup/{}".format(uid))
    assert resp.status_code == 200
    rdata = json.loads(resp.data)
    assert rdata == {'pending': True}


def test_signup_finish(setdb, client):
    data = {'username': 'outsider', 'fullname': 'Outsider-1', 'email': 'outlander@ooo.com'}
    resp = client.post("/api/v1/signup", data=data)
    rdata = json.loads(resp.data)
    uid = rdata['uid']
    assert User.select().where(User.username == 'outsider').count() == 0
    resp = client.post("/api/v1/signup/{}".format(uid), data={'password': 'safepass'})
    assert resp.status_code == 204
    created_user = User.get(User.username == 'outsider')
    assert created_user
    assert created_user.password.check_password('safepass')
    resp = client.get("/api/v1/signup/{}".format(uid))
    assert resp.status_code == 404
