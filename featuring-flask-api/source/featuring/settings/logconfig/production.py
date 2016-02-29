from .common import LOGGING, logger

LOGGING['loggers'] = {
    'werkzeug': logger('ERROR'),
    'FEATURING': logger('ERROR'),
}
