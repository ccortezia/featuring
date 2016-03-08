from flask_restful import Resource, Api
from .version import version
import featuring

from session import SessionResource

from feature_request import (
    FeatureRequestResource,
    FeatureRequestListResource)

from user import (
    UserResource,
    UserListResource)


class Ping(Resource):
    def get(self):
        return "pong"

api = Api(featuring.app, catch_all_404s=True)
api.add_resource(Ping,                       '/api/v1/ping')
api.add_resource(FeatureRequestListResource, '/api/v1/features')
api.add_resource(FeatureRequestResource,     '/api/v1/features/<int:rid>')
api.add_resource(UserListResource,           '/api/v1/users')
api.add_resource(UserResource,               '/api/v1/users/<string:username>')
api.add_resource(SessionResource,            '/api/v1/session')
app = api.app
