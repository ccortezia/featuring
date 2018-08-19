import os
import sys
import pytest
import featuring
from featuring.initdata import insert_mandatory_data


HERE = os.path.abspath(os.path.dirname(__file__))
ROOT = os.path.normpath(os.path.join(HERE, os.pardir))


@pytest.fixture(scope='session')
def schema():
    """Provides a new database to a test environment"""
    with featuring.app.app_context():
        featuring.db.drop_all()
        featuring.db.create_all()


@pytest.fixture
def db():
    """Provides a new database to a test case"""
    from featuring.entities.user.models import User
    from featuring.entities.ticket.models import Ticket
    User.query.delete()
    Ticket.query.delete()
    insert_mandatory_data()
    return featuring.db


@pytest.fixture
def client():
    """Provides a test client bound to the app context"""
    sys.path.append(ROOT)
    featuring.app.config['TESTING'] = True
    featuring.app.config['SQLALCHEMY_ECHO'] = False
    yield featuring.app.test_client()


@pytest.fixture
def committed(db):
    """This fixture commits the current database session when loaded"""
    db.session.commit()
    return db
