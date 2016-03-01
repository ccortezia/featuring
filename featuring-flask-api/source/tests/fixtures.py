import pytest
import featuring


@pytest.fixture
def client(request):
    featuring.app.config['TESTING'] = True
    return featuring.app.test_client()
