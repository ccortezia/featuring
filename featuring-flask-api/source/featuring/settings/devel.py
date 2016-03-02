import os
from .default import *

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '../../..')
DB_PATH = os.path.join(ROOT, 'devel.db')

DEPLOY = "devel"
DEBUG = True
PROPAGATE_EXCEPTIONS = True
