import os

DEBUG = False
LOGGING_BASEDIR = os.environ.get('LOGGING_BASEDIR')
SECRET_KEY = os.environ.get('SECRET_KEY', 'some-not-so-secret-pass')
TOKEN_SECONDS = os.environ.get('TOKEN_SECONDS', 60 * 60 * 24 * 5)

EMAIL_SENDER = "Featuring <featuring@signup.com>"
MANDRILL_USERNAME = os.environ['MANDRILL_USERNAME']
MANDRILL_PASSWORD = os.environ['MANDRILL_PASSWORD']
