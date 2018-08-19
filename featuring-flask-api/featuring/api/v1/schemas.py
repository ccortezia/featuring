from marshmallow import Schema, fields
from featuring.utilities.ext_schema import InputLoaderSchemaMixin
from featuring.utilities.common import iso_today


# --------
# General
# --------

class BaseResponseOutputSchema(Schema):
    success = fields.Bool(required=True, dump_only=True)
    data = fields.Dict(required=True, dump_only=True)
    details = fields.Dict(required=True, default=None)


# -----
# User
# -----

class SelfRegisterInputSchema(Schema, InputLoaderSchemaMixin):
    username = fields.Str(required=True)
    fullname = fields.Str(required=True)
    password = fields.Str(required=True)
    is_admin = fields.Bool(default=False)


class UserCreationInputSchema(Schema, InputLoaderSchemaMixin):
    username = fields.Str(required=True)
    fullname = fields.Str(required=True)
    is_admin = fields.Bool(default=False)


class UserMutationInputSchema(Schema, InputLoaderSchemaMixin):
    username = fields.Str(required=False)
    fullname = fields.Str(required=False)
    password = fields.Str(load_only=True)
    is_admin = fields.Bool(required=False)


class UserRetrievalOutputSchema(Schema):
    username = fields.Str()
    fullname = fields.Str()
    is_admin = fields.Bool()


# --------
# Product
# --------

class ProductRetrievalOutputSchema(Schema):
    product_id = fields.Int()
    product_name = fields.Str()


# --------
# Client
# --------

class ClientRetrievalOutputSchema(Schema):
    client_id = fields.Int()
    client_name = fields.Str()


# --------
# Ticket
# --------

class TicketCreationInputSchema(Schema, InputLoaderSchemaMixin):
    product_id = fields.Int(required=True)
    client_id = fields.Int(required=True)
    title = fields.Str(required=True)
    description = fields.Str(required=False)
    deadline = fields.Date(required=False, missing=iso_today)
    priority = fields.Int(required=False, missing=1)
    url = fields.Url(required=False)


class TicketUpdateInputSchema(Schema, InputLoaderSchemaMixin):
    product_id = fields.Int(required=False)
    client_id = fields.Int(required=False)
    title = fields.Str(required=False)
    description = fields.Str(required=False)
    deadline = fields.Date(required=False)
    priority = fields.Int(required=False)
    url = fields.Url(required=False)


class TicketRetrievalOutputSchema(Schema):
    ticket_id = fields.Int(required=True)
    product_id = fields.Int(required=True)
    client_id = fields.Int(required=True)
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    deadline = fields.Date(required=True)
    priority = fields.Int(required=True)
    url = fields.Url(required=True)


# --------
# Session
# --------

class SessionCreationInputSchema(Schema, InputLoaderSchemaMixin):
    username = fields.Str(required=True)
    password = fields.Str(required=True)


class SessionRetrievalOutputSchema(Schema):
    username = fields.Str()
    fullname = fields.Str()
    is_admin = fields.Bool()


class SessionCreationOutputSchema(Schema):
    token = fields.Str()
