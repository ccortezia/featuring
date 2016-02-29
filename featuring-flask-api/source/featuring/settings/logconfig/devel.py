from .common import LOGGING, logger

LOGGING['loggers'] = {
    'werkzeug': logger('DEBUG'),
    'featuring': logger('DEBUG'),
}
