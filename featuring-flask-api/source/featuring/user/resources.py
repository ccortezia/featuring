import featuring
from peewee import IntegrityError
from flask_restful import Resource, abort, marshal_with
from .models import User
from .serializers import UserSerializer
from .parsers import UserCreateParser, UserPatchParser
from featuring.security import jwt_protected


def find_or_abort(username):
    try:
        return User.get(User.username == username)
    except User.DoesNotExist:
        abort(404, message="no user with username {} could be found".format(username))


class UserResource(Resource):
    method_decorators = [jwt_protected]

    @marshal_with(UserSerializer)
    def get(self, username):
        obj = find_or_abort(username)
        return obj, 200

    def delete(self, username):
        obj = find_or_abort(username)
        obj.delete_instance()
        return '', 204

    @marshal_with(UserSerializer)
    def patch(self, username):
        args = UserPatchParser.parse_args()
        obj = find_or_abort(username)
        User.update(**args).where(User.username == username).execute()
        obj = find_or_abort(username)
        return obj, 201


class UserListResource(Resource):
    method_decorators = [jwt_protected]

    @marshal_with(UserSerializer)
    def get(self):
        return list(User.select()
            .order_by(User.username.asc()))

    @marshal_with(UserSerializer)
    def post(self):
        args = UserCreateParser.parse_args()
        created = User.create(**args)
        return created, 201
