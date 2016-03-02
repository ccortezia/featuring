import pytest
import featuring
from featuring.api import app


@pytest.fixture
def client():
    featuring.app.config['TESTING'] = True
    return app.test_client()
