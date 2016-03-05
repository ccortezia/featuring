from featuring import app
from playhouse.signals import Model, pre_save
from playhouse.fields import PasswordField
from peewee import CharField


class User(Model):
    username = CharField(max_length=25, unique=True)
    password = PasswordField()
    fullname = CharField(max_length=120)

    class Meta:
        db_table = 'user'
        database = app.db
