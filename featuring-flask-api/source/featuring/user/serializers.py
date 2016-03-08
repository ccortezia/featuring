from flask_restful import fields


UserSerializer = {
    'username': fields.String,
    'fullname': fields.String,
}
