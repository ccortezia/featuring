from featuring import db
from featuring.entities.user.models import User
from featuring.entities.client.models import Client
from featuring.entities.product.models import Product
from featuring.entities.ticket.models import Ticket


def insert_mandatory_data():
    db.session.add(User(username='root', password='root', fullname='root', is_admin=True))
    db.session.flush()


def insert_optional_data():
    db.session.add(User(username='user1', fullname='User 1'))
    db.session.add(User(username='user2', fullname='User 2'))
    db.session.add(User(username='user3', fullname='User 3'))
    db.session.add(User(username='user4', fullname='User 4'))

    client_1 = Client(client_name='Client 1')
    client_2 = Client(client_name='Client 2')
    client_3 = Client(client_name='Client 3')
    client_4 = Client(client_name='Client 4')
    db.session.add(client_1)
    db.session.add(client_2)
    db.session.add(client_3)
    db.session.add(client_4)

    product_1 = Product(product_name='Product 1')
    product_2 = Product(product_name='Product 2')
    product_3 = Product(product_name='Product 3')
    product_4 = Product(product_name='Product 4')
    db.session.add(product_1)
    db.session.add(product_2)
    db.session.add(product_3)
    db.session.add(product_4)

    db.session.flush()

    db.session.add_all([
        Ticket(title='Ticket 1',
               product_id=product_1.product_id,
               client_id=client_1.client_id,
               priority=1),
        Ticket(title='Ticket 2',
               product_id=product_2.product_id,
               client_id=client_2.client_id,
               priority=2),
        Ticket(title='Ticket 3',
               product_id=product_3.product_id,
               client_id=client_3.client_id,
               priority=3),
        Ticket(title='Ticket 4',
               product_id=product_4.product_id,
               client_id=client_4.client_id,
               priority=4),
    ])
    db.session.flush()
