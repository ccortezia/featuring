import os
from flask import Flask
from flask_restful import Resource, Api
from logging.config import dictConfig
from .version import version
from feature_request import FeatureRequest, FeatureRequestList


class Ping(Resource):
    def get(self):
        return "pong"


def make_app():
    HERE = os.path.dirname(os.path.abspath(__file__))
    os.environ.setdefault('SETTINGS_ENVIRON', 'featuring.settings.production')
    os.environ.setdefault('LOGCONFIG_ENVIRON', 'featuring.settings.logconfig.production')

    app = Flask('featuring')
    api = Api(app, catch_all_404s=True)
    api.add_resource(Ping, '/api/v1/ping')
    api.add_resource(FeatureRequestList, '/api/v1/features')
    api.add_resource(FeatureRequest, '/api/v1/features/<int:rid>')

    # Get application configuration.
    app.config.from_object('featuring.settings.default')
    app.config.from_object(os.environ['SETTINGS_ENVIRON'])

    # Get logging configuration.
    app.config.from_object(os.environ['LOGCONFIG_ENVIRON'])
    dictConfig(app.config['LOGGING'])

    return app
