import pytest
import json
import featuring
from featuring.api import app


@pytest.fixture(scope='session')
def client():
    featuring.app.config['TESTING'] = True
    return app.test_client()


@pytest.fixture(scope='session')
def auth(client):
    resp = client.post('/api/v1/session', data={'username': 'root', 'password': '123123'})
    token_str = json.loads(resp.data)['token']
    return {'Authorization': 'Bearer {}'.format(token_str)}
