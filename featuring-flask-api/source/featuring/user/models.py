import functools
from peewee import CharField, BooleanField
from playhouse.signals import Model, pre_save
from playhouse.fields import PasswordField
from featuring import app
from featuring.security.utils import generate_secret_key


# Ensures a created user cannot login just yet
safe_default_password = functools.partial(generate_secret_key, 50)


class User(Model):
    username = CharField(max_length=25, unique=True)
    password = PasswordField(default=safe_default_password)
    fullname = CharField(max_length=120)
    is_admin = BooleanField(default=False)

    class Meta:
        db_table = 'user'
        database = app.db
