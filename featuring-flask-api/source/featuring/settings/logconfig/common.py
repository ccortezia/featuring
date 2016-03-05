import os
from ..default import LOGGING_BASEDIR


LOGGING = {
    'version': 1,
    'formatters': {
        'verbose': {
            'format': '[%(levelname)-7s][%(asctime)s][%(threadName)s %(process)d][%(name)s] %(message)s'
        },
        'simple': {
            'format': '[%(levelname)-7s][%(asctime)s][%(threadName)s][%(name)s] %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
            'level': 'DEBUG'
        },
        'null': {
            'class': 'logging.NullHandler',
            'formatter': 'simple',
            'level': 'DEBUG'
        },
        'file.error': {
            'class': 'logging.NullHandler',
            'formatter': 'simple',
            'level': 'ERROR'
        },
        'file.access': {
            'class': 'logging.NullHandler',
            'formatter': 'simple',
            'level': 'DEBUG'
        }
    },
    'root': {
        'level': 'DEBUG',
        'handlers': ['console']
    },
}


if LOGGING_BASEDIR:
    LOGGING['handlers'].update({
        'file.error': {
            'class': 'featuring.settings.logconfig.handlers.FileHandler',
            'formatter': 'simple',
            'filename': os.path.join(LOGGING_BASEDIR, 'featuring.error.log'),
            'level': 'ERROR'
        },
        'file.access': {
            'class': 'featuring.settings.logconfig.handlers.FileHandler',
            'formatter': 'simple',
            'filename': os.path.join(LOGGING_BASEDIR, 'featuring.access.log'),
            'level': 'DEBUG'
        }

    })
