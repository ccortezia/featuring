from featuring.common.utils import tomorrow
from flask_restful import Resource, reqparse, abort, inputs, fields, marshal_with


def dt(iso8601):
    return inputs.datetime_from_iso8601(iso8601)


def find(items, rid):
    try:
        return next((item for item in items if item["id"] == rid), None)
    except KeyError, TypeError:
        return None


def find_or_abort(items, rid):
    ret = find(items, rid)
    if not ret:
        abort(404, message="no feature request with id {} could be found".format(rid))
    return ret


def iso8601(datetime_s):
    try:
        return inputs.datetime_from_iso8601(datetime_s)
    except ValueError as e:
        raise ValueError("{} is not ISO-8601 compliant".format(datetime_s))


# XXX: temporary dataset
DATASET = [
    {"id": 1,  "client": 1, "title": 'Title 01' * 5, "description": 'desc-01' * 100,  "priority": 1,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/1'},
    {"id": 2,  "client": 1, "title": 'Title 02' * 5, "description": 'desc-02' * 100,  "priority": 2,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 2, "ticket_url": 'http://local.trac/2'},
    {"id": 3,  "client": 1, "title": 'Title 03' * 5, "description": 'desc-03' * 100,  "priority": 3,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/3'},
    {"id": 4,  "client": 1, "title": 'Title 04' * 5, "description": 'desc-04' * 100,  "priority": 4,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 3, "ticket_url": 'http://local.trac/4'},
    {"id": 5,  "client": 1, "title": 'Title 05' * 5, "description": 'desc-05' * 100,  "priority": 5,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/5'},
    {"id": 6,  "client": 1, "title": 'Title 06' * 5, "description": 'desc-06' * 100,  "priority": 6,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 4, "ticket_url": 'http://local.trac/6'},
    {"id": 7,  "client": 1, "title": 'Title 07' * 5, "description": 'desc-07' * 100,  "priority": 7,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/7'},
    {"id": 8,  "client": 1, "title": 'Title 08' * 5, "description": 'desc-08' * 100,  "priority": 8,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/8'},
    {"id": 9,  "client": 1, "title": 'Title 09' * 5, "description": 'desc-09' * 100,  "priority": 9,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/9'},

    {"id": 10, "client": 2, "title": 'Title 10' * 5, "description": 'desc-10 ' * 100, "priority": 1,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 3, "ticket_url": 'http://local.trac/10'},
    {"id": 11, "client": 2, "title": 'Title 11' * 5, "description": 'desc-11 ' * 100, "priority": 2,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 4, "ticket_url": 'http://local.trac/11'},
    {"id": 12, "client": 2, "title": 'Title 12' * 5, "description": 'desc-12 ' * 100, "priority": 3,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 2, "ticket_url": 'http://local.trac/12'},

    {"id": 13, "client": 3, "title": 'Title 13' * 5, "description": 'desc-13 ' * 100, "priority": 1,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/13'},
    {"id": 14, "client": 3, "title": 'Title 14' * 5, "description": 'desc-14 ' * 100, "priority": 2,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 2, "ticket_url": 'http://local.trac/14'},
    {"id": 15, "client": 3, "title": 'Title 15' * 5, "description": 'desc-15 ' * 100, "priority": 3,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/15'},
    {"id": 16, "client": 3, "title": 'Title 16' * 5, "description": 'desc-16 ' * 100, "priority": 4,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 3, "ticket_url": 'http://local.trac/16'},
    {"id": 17, "client": 3, "title": 'Title 17' * 5, "description": 'desc-17 ' * 100, "priority": 5,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/17'},
    {"id": 18, "client": 3, "title": 'Title 18' * 5, "description": 'desc-18 ' * 100, "priority": 6,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/18'},
    {"id": 19, "client": 3, "title": 'Title 19' * 5, "description": 'desc-19 ' * 100, "priority": 7,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 2, "ticket_url": 'http://local.trac/19'},
    {"id": 20, "client": 3, "title": 'Title 20' * 5, "description": 'desc-20 ' * 100, "priority": 8,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 4, "ticket_url": 'http://local.trac/20'},
    {"id": 21, "client": 3, "title": 'Title 21' * 5, "description": 'desc-21 ' * 100, "priority": 9,  "deadline": dt('2010-05-02T00:00.000Z'), "area": 3, "ticket_url": 'http://local.trac/21'},
    {"id": 22, "client": 3, "title": 'Title 22' * 5, "description": 'desc-22 ' * 100, "priority": 10, "deadline": dt('2010-05-02T00:00.000Z'), "area": 1, "ticket_url": 'http://local.trac/22'},
    {"id": 23, "client": 3, "title": 'Title 23' * 5, "description": 'desc-23 ' * 100, "priority": 11, "deadline": dt('2010-05-02T00:00.000Z'), "area": 4, "ticket_url": 'http://local.trac/23'},
]


create_parser = reqparse.RequestParser(bundle_errors=True)
create_parser.add_argument('title', required=True)
create_parser.add_argument('description', default="")
create_parser.add_argument('client', type=int, required=True)
create_parser.add_argument('priority', type=int, required=True)
create_parser.add_argument('deadline', type=iso8601, default=tomorrow)
create_parser.add_argument('ticket_url', type=str, required=True)

update_parser = reqparse.RequestParser(bundle_errors=True)
update_parser.add_argument('title', store_missing=False)
update_parser.add_argument('description', store_missing=False)
update_parser.add_argument('client', type=int, store_missing=False)
update_parser.add_argument('priority', type=int, store_missing=False)
update_parser.add_argument('deadline', type=iso8601, store_missing=False)
update_parser.add_argument('ticket_url', type=str, store_missing=False)


fields = {
    'id': fields.Integer,
    'title': fields.String,
    'description': fields.String,
    'client': fields.Integer,
    'priority': fields.Integer,
    'deadline': fields.DateTime(dt_format='iso8601'),
    'ticket_url': fields.String,
}


class FeatureRequest(Resource):

    @marshal_with(fields)
    def get(self, rid):
        obj = find_or_abort(DATASET, rid)
        return obj

    def delete(self, rid):
        obj = find_or_abort(DATASET, rid)
        DATASET.remove(obj)
        return '', 204

    @marshal_with(fields)
    def patch(self, rid):
        args = update_parser.parse_args()
        obj = find_or_abort(DATASET, rid)
        obj.update(args)
        return obj, 201


class FeatureRequestList(Resource):

    @marshal_with(fields)
    def get(self):
        import operator
        return sorted(DATASET, key=operator.itemgetter("priority"), reverse=True)

    @marshal_with(fields)
    def post(self):
        args = create_parser.parse_args()
        obj = args
        DATASET.append(obj)
        return obj, 201
