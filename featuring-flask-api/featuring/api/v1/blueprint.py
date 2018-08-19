# flake8: noqa
from flask import Blueprint
import featuring.api.v1.endpoints


def create_api_blueprint():
    v1 = Blueprint('v1', 'v1')
    v1.add_url_rule('/ping', 'ping', featuring.api.v1.endpoints.ping, methods=['GET', 'POST'])
    v1.add_url_rule('/session', 'create_session', featuring.api.v1.endpoints.create_session, methods=['POST'])
    v1.add_url_rule('/session', 'retrieve_session', featuring.api.v1.endpoints.retrieve_session, methods=['GET'])
    v1.add_url_rule('/register', 'register_user', featuring.api.v1.endpoints.register_user, methods=['POST'])
    v1.add_url_rule('/users', 'retrieve_user_list', featuring.api.v1.endpoints.retrieve_user_list)
    v1.add_url_rule('/users', 'create_user', featuring.api.v1.endpoints.create_user, methods=['POST'])
    v1.add_url_rule('/users/<string:username>', 'retrieve_user', featuring.api.v1.endpoints.retrieve_user)
    v1.add_url_rule('/users/<string:username>', 'delete_user', featuring.api.v1.endpoints.delete_user, methods=['DELETE'])
    v1.add_url_rule('/tickets', 'retrieve_ticket_list', featuring.api.v1.endpoints.retrieve_ticket_list)
    v1.add_url_rule('/tickets', 'create_ticket', featuring.api.v1.endpoints.create_ticket, methods=['POST'])
    v1.add_url_rule('/tickets/<int:ticket_id>', 'retrieve_ticket', featuring.api.v1.endpoints.retrieve_ticket)
    v1.add_url_rule('/tickets/<int:ticket_id>', 'update_ticket', featuring.api.v1.endpoints.update_ticket, methods=['PUT'])
    v1.add_url_rule('/tickets/<int:ticket_id>', 'delete_ticket', featuring.api.v1.endpoints.delete_ticket, methods=['DELETE'])
    v1.add_url_rule('/clients', 'retrieve_client_list', featuring.api.v1.endpoints.retrieve_client_list)
    v1.add_url_rule('/products', 'retrieve_product_list', featuring.api.v1.endpoints.retrieve_product_list)
    return v1
