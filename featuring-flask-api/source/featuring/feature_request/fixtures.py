import featuring
from .models import FeatureRequest, Client


def create_clients():
    return [
        Client.create(label='Client A'),
        Client.create(label='Client B'),
        Client.create(label='Client C')
    ]


def create_demo_feature_requests(clients):
    items = [
        dict(client=clients[0], title='Title 01' * 5, description='desc-01' * 100,  priority=1,  product_area=1, ticket_url='http://local.trac/1'),
        dict(client=clients[0], title='Title 02' * 5, description='desc-02' * 100,  priority=2,  product_area=2, ticket_url='http://local.trac/2'),
        dict(client=clients[0], title='Title 03' * 5, description='desc-03' * 100,  priority=3,  product_area=1, ticket_url='http://local.trac/3'),
        dict(client=clients[0], title='Title 04' * 5, description='desc-04' * 100,  priority=4,  product_area=3, ticket_url='http://local.trac/4'),
        dict(client=clients[0], title='Title 05' * 5, description='desc-05' * 100,  priority=5,  product_area=1, ticket_url='http://local.trac/5'),
        dict(client=clients[0], title='Title 06' * 5, description='desc-06' * 100,  priority=6,  product_area=4, ticket_url='http://local.trac/6'),
        dict(client=clients[0], title='Title 07' * 5, description='desc-07' * 100,  priority=7,  product_area=1, ticket_url='http://local.trac/7'),
        dict(client=clients[0], title='Title 08' * 5, description='desc-08' * 100,  priority=8,  product_area=1, ticket_url='http://local.trac/8'),
        dict(client=clients[0], title='Title 09' * 5, description='desc-09' * 100,  priority=9,  product_area=1, ticket_url='http://local.trac/9'),
        dict(client=clients[1], title='Title 10' * 5, description='desc-10 ' * 100, priority=1,  product_area=3, ticket_url='http://local.trac/10'),
        dict(client=clients[1], title='Title 11' * 5, description='desc-11 ' * 100, priority=2,  product_area=4, ticket_url='http://local.trac/11'),
        dict(client=clients[1], title='Title 12' * 5, description='desc-12 ' * 100, priority=3,  product_area=2, ticket_url='http://local.trac/12'),
        dict(client=clients[2], title='Title 13' * 5, description='desc-13 ' * 100, priority=1,  product_area=1, ticket_url='http://local.trac/13'),
        dict(client=clients[2], title='Title 14' * 5, description='desc-14 ' * 100, priority=2,  product_area=2, ticket_url='http://local.trac/14'),
        dict(client=clients[2], title='Title 15' * 5, description='desc-15 ' * 100, priority=3,  product_area=1, ticket_url='http://local.trac/15'),
        dict(client=clients[2], title='Title 16' * 5, description='desc-16 ' * 100, priority=4,  product_area=3, ticket_url='http://local.trac/16'),
        dict(client=clients[2], title='Title 17' * 5, description='desc-17 ' * 100, priority=5,  product_area=1, ticket_url='http://local.trac/17'),
        dict(client=clients[2], title='Title 18' * 5, description='desc-18 ' * 100, priority=6,  product_area=1, ticket_url='http://local.trac/18'),
        dict(client=clients[2], title='Title 19' * 5, description='desc-19 ' * 100, priority=7,  product_area=2, ticket_url='http://local.trac/19'),
        dict(client=clients[2], title='Title 20' * 5, description='desc-20 ' * 100, priority=8,  product_area=4, ticket_url='http://local.trac/20'),
        dict(client=clients[2], title='Title 21' * 5, description='desc-21 ' * 100, priority=9,  product_area=3, ticket_url='http://local.trac/21'),
        dict(client=clients[2], title='Title 22' * 5, description='desc-22 ' * 100, priority=10, product_area=1, ticket_url='http://local.trac/22'),
        dict(client=clients[2], title='Title 23' * 5, description='desc-23 ' * 100, priority=11, product_area=4, ticket_url='http://local.trac/23')
    ]
    with featuring.app.db.atomic():
        return [FeatureRequest.create(**kwargs) for kwargs in items]
