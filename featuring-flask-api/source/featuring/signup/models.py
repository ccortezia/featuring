import uuid
from flask import request
from peewee import Model, CharField, BooleanField
from featuring import app
from featuring.common.sendmail import send
from .constants import PLAINTEXT_WELCOME_MESSAGE, HTML_WELCOME_MESSAGE


def generate_uid():
    return str(uuid.uuid4())


class Signup(Model):
    uid = CharField(max_length=50, unique=True, default=generate_uid)
    email = CharField(unique=True)
    username = CharField(unique=True)
    fullname = CharField()
    pending = BooleanField(default=True)

    class Meta:
        db_table = 'signup'
        database = app.db

    def send_welcome_email(self):
        content = (request.environ['HTTP_HOST'], self.uid)
        content = {"url": 'http://{}/activate/{}'.format(*content)}
        send(to=self.email,
             subject="Welcome to Featuring !",
             text=PLAINTEXT_WELCOME_MESSAGE.format(**content),
             html=HTML_WELCOME_MESSAGE.format(**content))
