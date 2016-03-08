from flask_restful import fields


UserSerializer = {
    'username': fields.String,
    'fullname': fields.String,
    'is_admin': fields.Boolean
}
