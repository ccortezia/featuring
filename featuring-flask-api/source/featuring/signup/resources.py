import featuring
from peewee import IntegrityError
from flask_restful import Resource, abort, marshal_with
from featuring.security import jwt_protected, authorize
from featuring.security.rules import IsAdmin
from featuring.user import User
from .models import Signup
from .serializers import SignupSerializer, SignupCreateSerializer
from .parsers import SignupCreateParser, SignupFinishParser


def find_or_abort(uid):
    message = "no public signup record with uid {} could be found".format(uid)
    try:
        return Signup.get(Signup.uid == uid)
    except Signup.DoesNotExist:
        abort(404, message=message)


class SignupResource(Resource):

    @marshal_with(SignupSerializer)
    def get(self, uid):
        obj = find_or_abort(uid)
        return obj, 200

    @jwt_protected
    def delete(self, uid):
        authorize(IsAdmin)
        obj = find_or_abort(uid)
        obj.delete_instance()
        return '', 204

    @marshal_with(SignupSerializer)
    def post(self, uid):
        args = SignupFinishParser.parse_args()
        obj = find_or_abort(uid)
        User.create(
            email=obj.email,
            username=obj.username,
            fullname=obj.fullname,
            password=args['password'])
        obj.delete_instance()
        return '', 204


def get_signup_from_any_field(username, email):
    cond = Signup.username == username
    cond |= Signup.email == email
    try:
        return Signup.select().where(cond).get()
    except Signup.DoesNotExist:
        pass


class SignupListResource(Resource):

    @marshal_with(SignupCreateSerializer)
    def post(self):
        args = SignupCreateParser.parse_args()
        username, email = args['username'], args['email']

        # Abort in case the user is already registered.
        if User.select().where(User.username == username).count():
            abort(400, reason='unique')

        try:
            obj = Signup.create(**args)
        except IntegrityError:
            # Re-create signup in case of repetition.
            obj = get_signup_from_any_field(username, email)
            obj and obj.delete_instance()
            obj = Signup.create(**args)

        obj.send_welcome_email()
        return obj, 201
