from .common import LOGGING

LOGGING['loggers'] = {
    'gunicorn.error':  {'propagate': False, 'level': 'DEBUG', 'handlers': ['console']},
    'gunicorn.access': {'propagate': False, 'level': 'DEBUG', 'handlers': ['null']},
    'werkzeug':        {'propagate': False, 'level': 'DEBUG', 'handlers': ['console']},
    'featuring':       {'propagate': False, 'level': 'DEBUG', 'handlers': ['console']}
}
