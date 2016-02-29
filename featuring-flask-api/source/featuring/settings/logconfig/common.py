
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
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
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'null': {
            'level': 'DEBUG',
            'class': 'logging.NullHandler',
            'formatter': 'simple'
        }
    }
}


def logger(level):
    return {
        'handlers': ['console'],
        'propagate': False,
        'level': level
    }
