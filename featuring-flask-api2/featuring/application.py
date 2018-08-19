import logging.config
import flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
import featuring


def make_app():
    app = flask.Flask(__name__)

    # Get application configuration.
    app.config.from_object('featuring.settings.default')
    app.config.from_envvar('APP_SETTINGS', silent=True)

    # Get logging configuration.
    app.config.from_object('featuring.logconfig.default')
    app.config.from_envvar('APP_LOGCONFIG', silent=True)

    # Apply logging configuration.
    logging.config.dictConfig(app.config['LOGGING'])

    # Initialize database access handler.
    app.db = SQLAlchemy(app)

    # Initialize Alembic integration.
    app.migrate = Migrate(app, app.db)

    # Initialize bcrypt flask extension.
    app.bcrypt = Bcrypt(app)

    @app.after_request
    def after_request(response):
        # TODO: make CORS more configurable, it is too wide open now.
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
        return response

    @app.errorhandler(404)
    def handle_method_not_found(e):
        return ('', 404)

    @app.errorhandler(405)
    def handle_method_not_allowed(e):
        return ('', 405)

    @app.errorhandler(Exception)
    def handle_unexpected_error(e):
        app.logger.exception(e)
        return ('', 500)

    return app


def mount_apis(app):
    app.register_blueprint(featuring.api.v1.create_api_blueprint(), url_prefix='/api/v1')
