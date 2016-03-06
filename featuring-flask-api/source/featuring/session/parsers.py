from flask_restful import reqparse, inputs


SessionCreateParser = reqparse.RequestParser(bundle_errors=True)
SessionCreateParser.add_argument('username', required=True)
SessionCreateParser.add_argument('password', required=True)
