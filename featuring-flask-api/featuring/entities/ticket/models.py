from featuring import db
from featuring.utilities.common import iso_tomorrow
from featuring.entities.client.models import Client
from featuring.entities.product.models import Product


class Ticket(db.Model):
    __tablename__ = 'tickets'

    ticket_id = db.Column(db.Integer, primary_key=True, autoincrement=True)

    client_id = db.Column(db.Integer, db.ForeignKey(Client.client_id), nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey(Product.product_id), nullable=False)

    title = db.Column(db.String(60),
                      db.CheckConstraint('length(title) > 5'),
                      unique=True,
                      nullable=False)

    description = db.Column(db.String(1000), default="", nullable=False)

    deadline = db.Column(db.Date, default=iso_tomorrow)

    priority = db.Column(db.Integer,
                         db.CheckConstraint('priority > 0'),
                         unique=True,
                         nullable=False)

    url = db.Column(db.String(300), nullable=False, default="")
