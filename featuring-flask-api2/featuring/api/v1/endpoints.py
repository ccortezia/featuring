import flask


from featuring.controllers.crud_user import (
    retrieve_user_by_username,
    delete_user_by_username,
    retrieve_all_users,
    create_one_user,
)

from featuring.controllers.crud_ticket import (
    create_one_ticket,
    retrieve_all_tickets,
    retrieve_ticket_by_ticket_id,
    update_ticket_by_ticket_id,
    delete_ticket_by_ticket_id,
)

from featuring.controllers.crud_client import retrieve_all_clients
from featuring.controllers.crud_product import retrieve_all_products
from featuring.controllers.authentication import create_session_token

from .responses import APIResponse

from .schemas import (
    SessionCreationInputSchema,
    SessionCreationOutputSchema,
    SessionRetrievalOutputSchema,
    SelfRegisterInputSchema,
    UserCreationInputSchema,
    UserRetrievalOutputSchema,
    TicketCreationInputSchema,
    TicketUpdateInputSchema,
    TicketRetrievalOutputSchema,
    ClientRetrievalOutputSchema,
    ProductRetrievalOutputSchema)

from .decorators import (
    endpoint,
    protected,
    handle_auth_error,
    handle_invalid_input,
    handle_unique_violation,
    handle_not_found
)


# --------------------------------------------------------------------------------------------------
# General Endpoints
# --------------------------------------------------------------------------------------------------

@endpoint
def ping():
    return APIResponse.empty(200)


@endpoint
@handle_auth_error
@handle_invalid_input
def create_session():
    input_data = SessionCreationInputSchema().load_strict(flask.request.json or {})
    created = create_session_token(**input_data.data)
    output = SessionCreationOutputSchema().dump({'token': created}).data
    return APIResponse.success(output)


@endpoint
@protected
@handle_invalid_input
@handle_not_found
def retrieve_session():
    output = SessionRetrievalOutputSchema().dump(flask.request.session).data
    return APIResponse.success(output)
    return APIResponse.empty(200)


# --------------------------------------------------------------------------------------------------
# User Endpoints
# --------------------------------------------------------------------------------------------------


@endpoint
@handle_unique_violation
@handle_invalid_input
def register_user():
    input_data = SelfRegisterInputSchema().load_strict(flask.request.json or {})
    created = create_one_user(**input_data.data)
    output = UserRetrievalOutputSchema().dump(created).data
    return APIResponse.success(output)


@endpoint
@protected
@handle_unique_violation
@handle_invalid_input
def create_user():
    input_data = UserCreationInputSchema().load_strict(flask.request.json or {})
    created = create_one_user(**input_data.data)
    output = UserRetrievalOutputSchema().dump(created).data
    return APIResponse.success(output)


@endpoint
@protected
def retrieve_user_list():
    output = [UserRetrievalOutputSchema().dump(obj).data for obj in retrieve_all_users()]
    return APIResponse.success(output)


@endpoint
@protected
@handle_invalid_input
@handle_not_found
def retrieve_user(username):
    obj = retrieve_user_by_username(username)
    output = UserRetrievalOutputSchema().dump(obj).data
    return APIResponse.success(output)


@endpoint
@protected
@handle_invalid_input
@handle_not_found
def delete_user(username):
    count = delete_user_by_username(username)
    return APIResponse.empty(204) if count else APIResponse.empty(404)


# --------------------------------------------------------------------------------------------------
# Ticket Endpoints
# --------------------------------------------------------------------------------------------------

@endpoint
@protected
@handle_unique_violation
@handle_invalid_input
def create_ticket():
    input_data = TicketCreationInputSchema().load_strict(flask.request.json or {})
    created = create_one_ticket(**input_data.data)
    output = TicketRetrievalOutputSchema().dump(created).data
    return APIResponse.success(output)


@endpoint
@protected
def retrieve_ticket_list():
    output = [TicketRetrievalOutputSchema().dump(obj).data for obj in retrieve_all_tickets()]
    return APIResponse.success(output)


@endpoint
@protected
@handle_invalid_input
@handle_not_found
def retrieve_ticket(ticket_id):
    obj = retrieve_ticket_by_ticket_id(ticket_id)
    output = TicketRetrievalOutputSchema().dump(obj).data
    return APIResponse.success(output)


@endpoint
@protected
@handle_invalid_input
@handle_not_found
def update_ticket(ticket_id):
    input_data = TicketUpdateInputSchema().load_strict(flask.request.json or {})
    obj = update_ticket_by_ticket_id(ticket_id, **input_data.data)
    output = TicketRetrievalOutputSchema().dump(obj).data
    return APIResponse.success(output)


@endpoint
@protected
@handle_invalid_input
@handle_not_found
def delete_ticket(ticket_id):
    count = delete_ticket_by_ticket_id(ticket_id)
    return APIResponse.empty(204) if count else APIResponse.empty(404)


# --------------------------------------------------------------------------------------------------
# Client Endpoints
# --------------------------------------------------------------------------------------------------

@endpoint
@protected
def retrieve_client_list():
    output = [ClientRetrievalOutputSchema().dump(obj).data for obj in retrieve_all_clients()]
    return APIResponse.success(output)


# --------------------------------------------------------------------------------------------------
# Product Endpoints
# --------------------------------------------------------------------------------------------------

@endpoint
@protected
def retrieve_product_list():
    output = [ProductRetrievalOutputSchema().dump(obj).data for obj in retrieve_all_products()]
    return APIResponse.success(output)
