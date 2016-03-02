from .default import *

DEPLOY = 'production'
DEBUG = False
PROPAGATE_EXCEPTIONS = True
USE_SENTRY = True
DB_PATH = os.environ['DB_PATH']
