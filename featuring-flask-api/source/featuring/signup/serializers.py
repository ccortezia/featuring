from flask_restful import fields


SignupCreateSerializer = {
    'uid': fields.String,
    'pending': fields.Boolean,
}

SignupSerializer = {
    'pending': fields.Boolean,
}
