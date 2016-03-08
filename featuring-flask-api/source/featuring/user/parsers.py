from flask_restful import reqparse, inputs
from featuring.common.utils import tomorrow


UserCreateParser = reqparse.RequestParser(bundle_errors=True)
UserCreateParser.add_argument('username', required=True)
UserCreateParser.add_argument('fullname', required=True)
UserCreateParser.add_argument('password', required=False, store_missing=False)

UserPatchParser = reqparse.RequestParser(bundle_errors=True)
UserPatchParser.add_argument('fullname', store_missing=False)
UserPatchParser.add_argument('password', store_missing=False)
