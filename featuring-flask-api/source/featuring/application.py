import os
import sqlite3
from flask import Flask, g, jsonify
from flask import got_request_exception
import logging
from logging.config import dictConfig
from peewee import SqliteDatabase, IntegrityError
from featuring.security import AuthenticationFailure, AuthorizationFailure


def make_app():
    HERE = os.path.dirname(os.path.abspath(__file__))
    os.environ.setdefault('SETTINGS_ENVIRON', 'featuring.settings.devel')
    os.environ.setdefault('LOGCONFIG_ENVIRON', 'featuring.settings.logconfig.devel')

    app = Flask('featuring')

    # Get application configuration.
    app.config.from_object('featuring.settings.default')
    app.config.from_object(os.environ['SETTINGS_ENVIRON'])

    # Get logging configuration.
    app.config.from_object(os.environ['LOGCONFIG_ENVIRON'])
    dictConfig(app.config['LOGGING'])

    database = SqliteDatabase(app.config['DB_PATH'])
    app.db = database

    @app.after_request
    def after_request(response):
        # TODO: make CORS more configurable, it is too wide open now.
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH')
        return response

    @app.errorhandler(IntegrityError)
    def application_db_integrity_error(e):
        logging.getLogger("featuring").error(e)
        message = "a database integrity error occurred, review you request"
        response = jsonify({"detail": message})
        response.status_code = 400
        return response

    @app.errorhandler(AuthenticationFailure)
    def application_generic_err(e):
        response = jsonify({"detail": e.message})
        response.status_code = 401
        return response

    @app.errorhandler(AuthorizationFailure)
    def application_generic_err(e):
        response = jsonify({"detail": e.message or 'insufficient privileges'})
        response.status_code = 403
        return response

    @app.errorhandler(Exception)
    def application_generic_err(e):
        logging.getLogger("featuring").exception(e)
        message = "an unexpected error occured. Check the log for details"
        response = jsonify({"detail": message})
        response.status_code = 500
        return response

    @app.before_request
    def before_request():
        g.db = database
        g.db.connect()

    @app.after_request
    def after_request(response):
        g.db.close()
        return response

    return app
