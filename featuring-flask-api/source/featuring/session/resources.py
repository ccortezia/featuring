from flask import request
from flask_restful import Resource, abort, marshal_with
from featuring.security import jwt_protected, generate_token, decode_token
from .serializers import SessionDetailSerializer, SessionCreationResultSerializer
from .parsers import SessionCreateParser


class SessionResource(Resource):

    @jwt_protected
    @marshal_with(SessionDetailSerializer)
    def get(self):
        return {'username': request.session['username']}

    @marshal_with(SessionCreationResultSerializer)
    def post(self):
        args = SessionCreateParser.parse_args()
        # XXX: ignore password for now
        token = generate_token(args['username'])
        return {'token': token}, 201
