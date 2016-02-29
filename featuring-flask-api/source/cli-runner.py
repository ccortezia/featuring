import os
import logging
from docopt import docopt


__doc__ = """run

Usage:
  run.py [options]

Options:
  -h --help              Show this screen.
  --verbosity=<v>        Verbosity level (0 - 3) [default: 0]
  --host=<host>          Host [default: localhost]
  --port=<port>          Port [default: 5000]
  --debug                Debug [default: True]
  --reload               Auto-Reload [default: True]
  --environ=<environ>    Deployment Settings (devel, production) [default: devel]
"""


def define_settings_environ(environ):
    if environ:
        os.environ['SETTINGS_ENVIRON'] = 'featuring.settings.{}'.format(environ)
        os.environ['LOGCONFIG_ENVIRON'] = 'featuring.settings.logconfig.{}'.format(environ)


def log_app_url_map(app):
    rules = [(rule.rule, rule.methods) for rule in app.url_map.iter_rules()]
    logger = logging.getLogger('featuring')
    logger.info(' ------------ Available API --------------')
    maxlen = max([len(rule) for rule, methods in rules])
    for rule, methods in rules:
        if rule.startswith('/static'):
            continue
        methods = " | ".join(methods)
        logger.info('{:<{}} [ {} ]'.format(rule, maxlen, methods))
    logger.info(' -----------------------------------------')


def log_app_details(app):
    logger = logging.getLogger('featuring')
    logger.info("pid [%s]" % os.getpid())
    logger.info("environ [%s]" % app.config['DEPLOY'])
    logger.info("debug [%s]" % app.config["DEBUG"])


def main():
    arguments = docopt(__doc__)
    host = arguments.get('--host')
    port = int(arguments.get('--port'))
    debug = arguments.get('--debug')
    use_reloader = arguments.get('--reload')
    environ = arguments.get('--environ')

    # Define environment variables.
    define_settings_environ(environ)

    # Safe to make fisrt import app from now on, environ is already setup.
    import featuring

    try:
        log_app_details(featuring.app)
        log_app_url_map(featuring.app)

    except KeyboardInterrupt:
        return

    else:
        logging.info('application server listening at http://{}:{}'.format(host, port))
        featuring.app.run(host=host, port=port, debug=debug, use_reloader=use_reloader)


if __name__ == '__main__':
    main()
