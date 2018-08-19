from featuring.entities.client.models import Client


# --------------------------------------------------------------------------------------------------
# Client CRUD
# --------------------------------------------------------------------------------------------------

def retrieve_all_clients():
    return Client.query.order_by(Client.client_name)
