from flask_restful import Resource, Api
from .version import version
import featuring

from feature_request import (
    FeatureRequestResource,
    FeatureRequestListResource)


class Ping(Resource):
    def get(self):
        return "pong"

api = Api(featuring.app, catch_all_404s=True)
api.add_resource(Ping, '/api/v1/ping')
api.add_resource(FeatureRequestListResource, '/api/v1/features')
api.add_resource(FeatureRequestResource, '/api/v1/features/<int:rid>')
app = api.app
