from .common import LOGGING

LOGGING['loggers'] = {
    'gunicorn.error':  {'level': 'DEBUG', 'handlers': ['console']},
    'gunicorn.access': {'level': 'DEBUG', 'handlers': ['null']},
    'werkzeug':        {'level': 'DEBUG', 'handlers': ['console']},
    'featuring':       {'level': 'DEBUG', 'handlers': ['console']}
}
