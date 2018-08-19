import functools
import flask
from featuring.utilities.ext_schema import InputValidationError
from featuring.controllers.exceptions import UniqueViolation, NotFound, AuthenticationFailure
from featuring.controllers.authentication import extract_jwt_payload
from .responses import APIResponse


def endpoint(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        resp_obj = fn(*args, **kwargs)
        http_content = flask.jsonify(resp_obj.payload) if resp_obj.payload else ''
        return http_content, resp_obj.http_status
    return wrapped


def handle_invalid_input(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except InputValidationError as e:
            return APIResponse.error(e.messages, 400)
    return wrapped


def handle_unique_violation(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except UniqueViolation:
            return APIResponse.error({'*': ['Unique key violation.']}, 400)
    return wrapped


def handle_not_found(fn):
    @functools.wraps(fn)
    def wrapped(*args, **kwargs):
        try:
            return fn(*args, **kwargs)
        except NotFound:
            return APIResponse.empty(404)
    return wrapped


def protected(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if 'Authorization' not in flask.request.headers:
            return APIResponse.empty(401)
        try:
            jwt_payload = extract_jwt_payload(flask.request.headers['Authorization'])
        except AuthenticationFailure:
            return APIResponse.empty(401)
        flask.request.session = jwt_payload
        return func(*args, **kwargs)
    return wrapper


def handle_auth_error(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except AuthenticationFailure:
            return APIResponse.empty(401)
    return wrapper
