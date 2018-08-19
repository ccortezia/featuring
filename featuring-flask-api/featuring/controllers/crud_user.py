from featuring import db
from featuring.entities.user.models import User
from .persistence import normalize_db_update_err, normalize_db_fetch_err


# --------------------------------------------------------------------------------------------------
# User CRUD
# --------------------------------------------------------------------------------------------------

@normalize_db_update_err
def create_one_user(username, fullname, is_admin=False, password=None):
    instance = User(**locals())
    db.session.add(instance)
    db.session.flush()
    return instance


@normalize_db_fetch_err
def retrieve_user_by_username(username):
    return User.query.filter_by(username=username).one()


def retrieve_all_users():
    return User.query.order_by(User.username)


def delete_user_by_username(username):
    return User.query.filter_by(username=username).delete()

