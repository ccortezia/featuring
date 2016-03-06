import re
import jwt
import functools
from datetime import timedelta
from flask import current_app, request
from .exceptions import AuthenticationFailure
from featuring.common.utils import now, dt_from_ts


def parse_jwt_header(header):
    m = re.match('^Bearer ([^ ]+)$', header)
    if not m:
        return None
    return m.groups()[0]


def jwt_protected(func):

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if 'Authorization' not in request.headers:
            raise AuthenticationFailure('missing authentication data')

        token = parse_jwt_header(request.headers['Authorization'])
        if not token:
            raise AuthenticationFailure('unaccepted authentication data')

        jwt_payload = decode_token(token)
        if not jwt_payload:
            raise AuthenticationFailure('authentication rejected')

        if 'exp' in jwt_payload:
            exp = dt_from_ts(jwt_payload['exp'])
            if exp < now():
                raise AuthenticationFailure('authentication token expired')

        request.session = jwt_payload
        return func(*args, **kwargs)

    return wrapper


def generate_token(username):
    secret = current_app.config['SECRET_KEY']
    token_duration = current_app.config['TOKEN_SECONDS']
    token_expires_on = now() + timedelta(seconds=token_duration)
    payload = {'username': username, 'exp': token_expires_on}
    return jwt.encode(payload, secret, algorithm='HS256')


def decode_token(encoded):
    secret = current_app.config['SECRET_KEY']
    try:
        return jwt.decode(encoded, secret)
    except jwt.exceptions.InvalidTokenError:
        return None
