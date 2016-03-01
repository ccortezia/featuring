from .common import LOGGING

LOGGING['loggers'] = {
    'gunicorn.error':  {'level': 'DEBUG', 'handlers': ['file.error']},
    'gunicorn.access': {'level': 'DEBUG', 'handlers': ['file.access']},
    'werkzeug':        {'level': 'DEBUG', 'handlers': ['file.access']},
    'featuring':       {'level': 'DEBUG', 'handlers': ['console', 'file.access', 'file.error']}
}
