import featuring
from .models import FeatureRequest, Client


def create_clients():
    return [
        Client.create(label='Client A'),
        Client.create(label='Client B'),
        Client.create(label='Client C')
    ]


def mkdesc(text):
    import random
    return text * int(random.random() * 100)


def mkurl(n):
    return 'http://local.trac/issues/{}'.format(n)


def create_demo_feature_requests(clients):
    items = [
        dict(client=clients[0], title='Feature request number 01', description=mkdesc('desc-01'),  priority=1,  product_area=1, ticket_url=mkurl(1)),
        dict(client=clients[0], title='Feature request number 02', description=mkdesc('desc-02'),  priority=2,  product_area=2, ticket_url=mkurl(2)),
        dict(client=clients[0], title='Feature request number 03', description=mkdesc('desc-03'),  priority=3,  product_area=1, ticket_url=mkurl(3)),
        dict(client=clients[0], title='Feature request number 04', description=mkdesc('desc-04'),  priority=4,  product_area=3, ticket_url=mkurl(4)),
        dict(client=clients[0], title='Feature request number 05', description=mkdesc('desc-05'),  priority=5,  product_area=1, ticket_url=mkurl(5)),
        dict(client=clients[0], title='Feature request number 06', description=mkdesc('desc-06'),  priority=6,  product_area=4, ticket_url=mkurl(6)),
        dict(client=clients[0], title='Feature request number 07', description=mkdesc('desc-07'),  priority=7,  product_area=1, ticket_url=mkurl(7)),
        dict(client=clients[0], title='Feature request number 08', description=mkdesc('desc-08'),  priority=8,  product_area=1, ticket_url=mkurl(8)),
        dict(client=clients[0], title='Feature request number 09', description=mkdesc('desc-09'),  priority=9,  product_area=1, ticket_url=mkurl(9)),
        dict(client=clients[1], title='Feature request number 10', description=mkdesc('desc-10 '), priority=1,  product_area=3, ticket_url=mkurl(10)),
        dict(client=clients[1], title='Feature request number 11', description=mkdesc('desc-11 '), priority=2,  product_area=4, ticket_url=mkurl(11)),
        dict(client=clients[1], title='Feature request number 12', description=mkdesc('desc-12 '), priority=3,  product_area=2, ticket_url=mkurl(12)),
        dict(client=clients[2], title='Feature request number 13', description=mkdesc('desc-13 '), priority=1,  product_area=1, ticket_url=mkurl(13)),
        dict(client=clients[2], title='Feature request number 14', description=mkdesc('desc-14 '), priority=2,  product_area=2, ticket_url=mkurl(14)),
        dict(client=clients[2], title='Feature request number 15', description=mkdesc('desc-15 '), priority=3,  product_area=1, ticket_url=mkurl(15)),
        dict(client=clients[2], title='Feature request number 16', description=mkdesc('desc-16 '), priority=4,  product_area=3, ticket_url=mkurl(16)),
        dict(client=clients[2], title='Feature request number 17', description=mkdesc('desc-17 '), priority=5,  product_area=1, ticket_url=mkurl(17)),
        dict(client=clients[2], title='Feature request number 18', description=mkdesc('desc-18 '), priority=6,  product_area=1, ticket_url=mkurl(18)),
        dict(client=clients[2], title='Feature request number 19', description=mkdesc('desc-19 '), priority=7,  product_area=2, ticket_url=mkurl(19)),
        dict(client=clients[2], title='Feature request number 20', description=mkdesc('desc-20 '), priority=8,  product_area=4, ticket_url=mkurl(20)),
        dict(client=clients[2], title='Feature request number 21', description=mkdesc('desc-21 '), priority=9,  product_area=3, ticket_url=mkurl(21)),
        dict(client=clients[2], title='Feature request number 22', description=mkdesc('desc-22 '), priority=10, product_area=1, ticket_url=mkurl(22)),
        dict(client=clients[2], title='Feature request number 23', description=mkdesc('desc-23 '), priority=11, product_area=4, ticket_url=mkurl(23))
    ]
    with featuring.app.db.atomic():
        return [FeatureRequest.create(**kwargs) for kwargs in items]
