from flask import request
from flask_restful import Resource, abort, marshal_with
from featuring.security import jwt_protected, generate_token, decode_token
from featuring.user import User
from .serializers import SessionDetailSerializer, SessionCreationResultSerializer
from .parsers import SessionCreateParser


class SessionResource(Resource):

    @jwt_protected
    @marshal_with(SessionDetailSerializer)
    def get(self):
        return {
            'username': request.session['username'],
            'fullname': request.session['fullname'],
            'is_admin': request.session['is_admin']
        }

    @marshal_with(SessionCreationResultSerializer)
    def post(self):
        args = SessionCreateParser.parse_args()

        try:
            user = User.get(User.username == args['username'])
        except User.DoesNotExist:
            abort(401, message='invalid credentials')

        if not user.password.check_password(args['password']):
            abort(401, message='invalid credentials')

        token = generate_token({
            'username': user.username,
            'fullname': user.fullname,
            'is_admin': user.is_admin
        })
        return {'token': token}, 201
