import os

PRESERVE_CONTEXT_ON_EXCEPTION = True

SQLALCHEMY_ECHO = False
SQLALCHEMY_COMMIT_ON_TEARDOWN = True
SQLALCHEMY_TRACK_MODIFICATIONS = False

DBHOST = os.environ.setdefault('DBHOST', '127.0.0.1')
DBPORT = os.environ.setdefault('DBPORT', '3306')
DBUSER = os.environ.setdefault('DBUSER', 'featuring')
DBPASS = os.environ.setdefault('DBPASS', '123123')
DBNAME = os.environ.setdefault('DBNAME', 'featuring')
DBCONN = os.environ.setdefault('DBCONN', 'mysql+mysqlconnector')
DBOPTS = os.environ.setdefault('DBOPTS', 'charset=utf8')
SQLALCHEMY_DATABASE_URI = f"{DBCONN}://{DBUSER}:{DBPASS}@{DBHOST}/{DBNAME}?{DBOPTS}"


SECRET_KEY = 'secret'
TOKEN_SECONDS = 60 * 5
