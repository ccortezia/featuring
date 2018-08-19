import sqlalchemy
import functools
from featuring import db
from .exceptions import UniqueViolation, NotFound


def try_reraise_db_error(e):
    if db.engine.name == 'mysql':
        import mysql.connector.errors
        if isinstance(e.orig, mysql.connector.errors.IntegrityError):
            _handle_mysql_error(e.orig)


def _handle_mysql_error(e):
    if e.errno == 1062:
        raise UniqueViolation(e.msg)


def normalize_db_update_err(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except sqlalchemy.exc.SQLAlchemyError as e:
            db.session.rollback()
            try_reraise_db_error(e)
            raise
    return wrapped


def normalize_db_fetch_err(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except sqlalchemy.orm.exc.NoResultFound:
            raise NotFound()
    return wrapped
