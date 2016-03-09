from flask_restful import reqparse, inputs


SignupCreateParser = reqparse.RequestParser(bundle_errors=True)
SignupCreateParser.add_argument('username', required=True)
SignupCreateParser.add_argument('email', required=True)
SignupCreateParser.add_argument('fullname', required=True)

SignupFinishParser = reqparse.RequestParser(bundle_errors=True)
SignupFinishParser.add_argument('password', required=True)
