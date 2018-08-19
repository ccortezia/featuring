import click
import featuring
from featuring.entities.user.models import User
from featuring.entities.client.models import Client
from featuring.entities.product.models import Product


@featuring.app.cli.command()
def create_db():
    featuring.db.create_all()


@featuring.app.cli.command()
def drop_db():
    featuring.db.drop_all()
    featuring.db.session.execute('delete from alembic_version')


@featuring.app.cli.command()
@click.option('--username', help='User account username', required=True)
@click.option('--fullname', help='User account real name', required=False)
@click.option('--password', prompt=True, hide_input=True, confirmation_prompt=True)
@click.option('--admin', is_flag=True, default=False)
def create_user(username, fullname, password, admin):
    instance = User(username=username,
                    fullname=fullname or username,
                    password=password,
                    is_admin=admin)
    featuring.db.session.add(instance)
    featuring.db.session.flush()
    featuring.db.session.commit()


@featuring.app.cli.command()
@click.option('--name', 'client_name', help='Client full name', required=True)
def create_client(client_name):
    instance = Client(client_name=client_name)
    featuring.db.session.add(instance)
    featuring.db.session.flush()
    featuring.db.session.commit()


@featuring.app.cli.command()
@click.option('--name', 'product_name', help='Product name', required=True)
def create_product(product_name):
    instance = Product(product_name=product_name)
    featuring.db.session.add(instance)
    featuring.db.session.flush()
    featuring.db.session.commit()
