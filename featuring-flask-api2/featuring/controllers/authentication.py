import re
import jose
from jose import jwt
import sqlalchemy
from datetime import timedelta
from flask import current_app
from featuring.entities.user.models import User
from featuring.utilities.common import now, dt_from_ts
from .exceptions import AuthenticationFailure


def create_session_token(username, password):
    try:
        user = User.query.filter_by(username=username).one()
    except sqlalchemy.orm.exc.NoResultFound:
        raise AuthenticationFailure('invalid username')

    if user.password != password:
        raise AuthenticationFailure('invalid password')

    return generate_jwt_token({
        'username': user.username,
        'fullname': user.fullname,
        'is_admin': user.is_admin
    })


def parse_jwt_header(header):
    m = re.match('^Bearer ([^ ]+)$', header)
    if not m:
        return None
    return m.groups()[0]


def extract_jwt_payload(authorization_header):

    token = parse_jwt_header(authorization_header)
    if not token:
        raise AuthenticationFailure('unaccepted authentication data')

    jwt_payload = decode_jwt_token(token)
    if not jwt_payload:
        raise AuthenticationFailure('authentication rejected')

    if 'exp' in jwt_payload:
        exp = dt_from_ts(jwt_payload['exp'])
        if exp < now():
            raise AuthenticationFailure('authentication token expired')

    return jwt_payload


def generate_jwt_token(info):
    secret = current_app.config['SECRET_KEY']
    token_duration = current_app.config['TOKEN_SECONDS']
    token_expires_on = now() + timedelta(seconds=int(token_duration))
    payload = {'exp': token_expires_on}
    payload.update(info)
    return jwt.encode(payload, secret, algorithm='HS256')


def decode_jwt_token(encoded):
    secret = current_app.config['SECRET_KEY']
    try:
        return jwt.decode(encoded, secret)
    except (jose.exceptions.JWTError, jose.exceptions.ExpiredSignatureError):
        return None
