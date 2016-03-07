from flask_restful import fields


SessionCreationResultSerializer = {
    'token': fields.String
}

SessionDetailSerializer = {
    'username': fields.String,
    'fullname': fields.String,
}
