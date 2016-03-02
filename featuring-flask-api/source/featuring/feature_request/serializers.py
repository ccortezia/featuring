from flask_restful import fields


class ClientIdField(fields.Raw):
    def format(self, value):
        return value.id


FeatureRequestSerializer = {
    'id': fields.Integer,
    'title': fields.String,
    'description': fields.String,
    'client': ClientIdField,
    'priority': fields.Integer,
    'deadline': fields.String,
    'ticket_url': fields.String,
}
