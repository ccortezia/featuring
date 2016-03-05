from .common import LOGGING

LOGGING['loggers'] = {
    'gunicorn.error':  {'propagate': False, 'level': 'DEBUG', 'handlers': ['file.error']},
    'gunicorn.access': {'propagate': False, 'level': 'DEBUG', 'handlers': ['file.access']},
    'werkzeug':        {'propagate': False, 'level': 'DEBUG', 'handlers': ['file.access']},
    'featuring':       {'propagate': False, 'level': 'DEBUG', 'handlers': ['console', 'file.access', 'file.error']}
}
