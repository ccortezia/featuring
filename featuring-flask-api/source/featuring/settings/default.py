import os

DEBUG = False
LOGGING_BASEDIR = os.environ.get('LOGGING_BASEDIR')
SECRET_KEY = os.environ.get('SECRET_KEY', 'some-not-so-secret-pass')
