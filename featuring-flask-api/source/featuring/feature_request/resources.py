import featuring
from peewee import IntegrityError
from flask_restful import Resource, abort, marshal_with
from .models import FeatureRequest
from .serializers import FeatureRequestSerializer as serializer
from .parsers import FeatureRequestCreateParser, FeatureRequestPatchParser


def find_or_abort(rid):
    try:
        return FeatureRequest.get(FeatureRequest.id == rid)
    except FeatureRequest.DoesNotExist:
        abort(404, message="no feature request with id {} could be found".format(rid))


class FeatureRequestResource(Resource):

    @marshal_with(serializer)
    def get(self, rid):
        obj = find_or_abort(rid)
        return obj, 200

    def delete(self, rid):
        obj = find_or_abort(rid)
        obj.delete_instance()
        return '', 204

    @marshal_with(serializer)
    def patch(self, rid):
        args = FeatureRequestPatchParser.parse_args()
        obj = find_or_abort(rid)
        for key, value in args.items():
            setattr(obj, key, value)
        obj.save()
        return obj, 201


class FeatureRequestListResource(Resource):

    @marshal_with(serializer)
    def get(self):
        return list(FeatureRequest.select()
            .order_by(FeatureRequest.priority.asc()))

    @marshal_with(serializer)
    def post(self):
        args = FeatureRequestCreateParser.parse_args()
        created = FeatureRequest.create(**args)
        return created, 201
