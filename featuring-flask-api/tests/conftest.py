import pytest
from logging.config import dictConfig


@pytest.fixture(scope="session")
def logconfig():
    """Ensure logging is configured inside the tests"""
    from featuring.settings.logconfig.devel import LOGGING
    dictConfig(LOGGING)
