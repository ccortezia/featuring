import re
import jwt
import functools
from flask import current_app, request
from flask_restful import abort


def parse_jwt_header(header):
    m = re.match('^Bearer ([^ ]+)$', header)
    if not m:
        return None
    return m.groups()[0]


def jwt_protected(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if 'Authorization' not in request.headers:
            abort(401, message='missing authentication data')
        token = parse_jwt_header(request.headers['Authorization'])
        if not token:
            abort(401, message='unaccepted authentication data')
        session = decode_token(token)
        if not session:
            abort(401, message='authentication rejected')
        request.session = session
        return func(*args, **kwargs)
    return wrapper


def generate_token(username):
    secret = current_app.config['SECRET_KEY']
    return jwt.encode({'username': username}, secret, algorithm='HS256')


def decode_token(encoded):
    secret = current_app.config['SECRET_KEY']
    try:
        return jwt.decode(encoded, secret)
    except jwt.exceptions.InvalidTokenError:
        return None
