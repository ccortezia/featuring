import pytest
from featuring.entities.user.models import User
from featuring.entities.client.models import Client
from featuring.entities.product.models import Product
from featuring.entities.ticket.models import Ticket
from featuring.controllers.crud_ticket import create_one_ticket


@pytest.fixture
def some_users(db):
    db.session.add(User(username='user1', fullname='User 1'))
    db.session.add(User(username='user2', fullname='User 2'))
    db.session.add(User(username='user3', fullname='User 3'))
    db.session.add(User(username='user4', fullname='User 4'))
    db.session.flush()
    return User.query


@pytest.fixture
def some_clients(db):
    db.session.add(Client(client_name='Client 1'))
    db.session.add(Client(client_name='Client 2'))
    db.session.add(Client(client_name='Client 3'))
    db.session.add(Client(client_name='Client 4'))
    db.session.flush()
    return Client.query


@pytest.fixture
def some_products(db):
    db.session.add(Product(product_name='Product 1'))
    db.session.add(Product(product_name='Product 2'))
    db.session.add(Product(product_name='Product 3'))
    db.session.add(Product(product_name='Product 4'))
    db.session.flush()
    return Product.query


@pytest.fixture
def some_tickets(db, some_clients, some_products):
    products = some_products.all()
    clients = some_clients.all()
    create_one_ticket(title='Ticket 1',
                      product_id=products[0].product_id,
                      client_id=clients[0].client_id),
    create_one_ticket(title='Ticket 2',
                      product_id=products[1].product_id,
                      client_id=clients[1].client_id)
    create_one_ticket(title='Ticket 3',
                      product_id=products[2].product_id,
                      client_id=clients[2].client_id)
    create_one_ticket(title='Ticket 4',
                      product_id=products[3].product_id,
                      client_id=clients[3].client_id)
    db.session.flush()
    return Ticket.query
