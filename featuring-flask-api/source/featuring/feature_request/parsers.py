from flask_restful import reqparse, inputs
from featuring.common.utils import tomorrow
from .models import Client


def ISO8601FieldParser(datetime_s):
    try:
        return inputs.datetime_from_iso8601(datetime_s).isoformat()
    except ValueError as e:
        raise ValueError("{} is not ISO-8601 compliant".format(datetime_s))


def ClientRefFieldParser(id):
    try:
        return Client.get(Client.id == id)
    except Client.DoesNotExist:
        raise ValueError("client with id {} does not exist".format(id))


FeatureRequestCreateParser = reqparse.RequestParser(bundle_errors=True)
FeatureRequestCreateParser.add_argument('title', required=True)
FeatureRequestCreateParser.add_argument('description', default="")
FeatureRequestCreateParser.add_argument('client', type=ClientRefFieldParser, required=True)
FeatureRequestCreateParser.add_argument('priority', type=int, required=True)
FeatureRequestCreateParser.add_argument('deadline', type=ISO8601FieldParser, default=tomorrow)
FeatureRequestCreateParser.add_argument('ticket_url', type=str, required=True)
FeatureRequestCreateParser.add_argument('product_area', type=int, required=True)

FeatureRequestPatchParser = reqparse.RequestParser(bundle_errors=True)
FeatureRequestPatchParser.add_argument('title', store_missing=False)
FeatureRequestPatchParser.add_argument('description', store_missing=False)
FeatureRequestPatchParser.add_argument('client', type=ClientRefFieldParser, store_missing=False)
FeatureRequestPatchParser.add_argument('priority', type=int, store_missing=False)
FeatureRequestPatchParser.add_argument('deadline', type=ISO8601FieldParser, store_missing=False)
FeatureRequestPatchParser.add_argument('ticket_url', type=str, store_missing=False)
FeatureRequestPatchParser.add_argument('product_area', type=int, store_missing=False)
