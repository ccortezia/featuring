
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
            'class': 'logging.FileHandler',
            'formatter': 'simple',
            'filename': '/tmp/featuring.error.log',
            'level': 'ERROR'
        },
        'file.access': {
            'class': 'logging.FileHandler',
            'formatter': 'simple',
            'filename': '/tmp/featuring.access.log',
            'level': 'DEBUG'
        }
    }
}
