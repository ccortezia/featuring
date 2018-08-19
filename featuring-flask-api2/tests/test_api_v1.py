from .fixtures import *  # noqa


# --------------------------------------------------------------------------------------------------
# Local API V1 Test Utilities
# --------------------------------------------------------------------------------------------------

def get_credential_headers(client):
    response = client.post('/api/v1/session', json={'username': 'root', 'password': 'root'})
    assert(response.status_code == 200)
    return {f'Authorization': f"Bearer {response.json['data']['token']}"}


# --------------------------------------------------------------------------------------------------
# Test General Endpoints
# --------------------------------------------------------------------------------------------------

def test_ping(client):
    response = client.get('/api/v1/ping')
    assert(not response.json)


def test_retrieve_session(client):
    credentials = get_credential_headers(client)
    response = client.get('/api/v1/session', headers=credentials)
    assert(response.status_code == 200)
    assert(response.json['data']['username'] == 'root')
    assert(response.json['data']['fullname'] == 'root')
    assert(response.json['data']['is_admin'])


def test_retrieve_session_noauth_should_fail(client):
    response = client.get('/api/v1/session')
    assert(response.status_code == 401)


# --------------------------------------------------------------------------------------------------
# Test User Endpoints
# --------------------------------------------------------------------------------------------------

def test_create_user(client, db):
    credentials = get_credential_headers(client)
    data = {'username': 'hiker', 'fullname': 'Stacey'}
    response = client.post('/api/v1/users', json=data, headers=credentials)
    assert(response.status_code == 200)


def test_create_user_repeated_should_fail(client, db, some_users, committed):
    credentials = get_credential_headers(client)
    data = {'username': some_users[0].username, 'fullname': 'new name'}
    response = client.post('/api/v1/users', json=data, headers=credentials)
    assert(response.status_code == 400)
    assert(not response.json['data'])
    assert(response.json['details']['*'] == ['Unique key violation.'])


def test_create_user_bad_params_should_fail(client, db):
    credentials = get_credential_headers(client)
    data = {'username': 'hiker'}
    response = client.post('/api/v1/users', json=data, headers=credentials)
    assert(response.status_code == 400)
    assert(not response.json['data'])
    assert(response.json['details']['fullname'] == ['Missing data for required field.'])


def test_retrieve_user_list(client, db, some_users):
    credentials = get_credential_headers(client)
    response = client.get('/api/v1/users', headers=credentials)
    assert(response.status_code == 200)
    assert(not response.json['details'])
    assert(response.json['data'] == [
        {'fullname': 'root', 'is_admin': True, 'username': 'root'},
        {'fullname': 'User 1', 'is_admin': False, 'username': 'user1'},
        {'fullname': 'User 2', 'is_admin': False, 'username': 'user2'},
        {'fullname': 'User 3', 'is_admin': False, 'username': 'user3'},
        {'fullname': 'User 4', 'is_admin': False, 'username': 'user4'}
    ])


def test_retrieve_user(client, db, some_users):
    credentials = get_credential_headers(client)
    response = client.get(f'/api/v1/users/{some_users[1].username}', headers=credentials)
    assert(response.status_code == 200)
    assert(not response.json['details'])
    assert(response.json['data'] == {'fullname': 'User 1', 'is_admin': False, 'username': 'user1'})


def test_retrieve_user_non_existent_should_fail(client, db):
    credentials = get_credential_headers(client)
    response = client.get(f'/api/v1/users/user-a', headers=credentials)
    assert(response.status_code == 404)
    assert(not response.json)


def test_delete_user(client, db, some_users):
    credentials = get_credential_headers(client)
    response = client.delete(f'/api/v1/users/{some_users[0].username}', headers=credentials)
    assert(response.status_code == 204)
    assert(not response.json)


def test_delete_user_non_existent_should_fail(client, db):
    credentials = get_credential_headers(client)
    response = client.delete(f'/api/v1/users/user-a', headers=credentials)
    assert(response.status_code == 404)
    assert(not response.json)


# --------------------------------------------------------------------------------------------------
# Test Ticket Endpoints
# --------------------------------------------------------------------------------------------------

def test_create_ticket(client, db, some_products, some_clients):
    credentials = get_credential_headers(client)
    product_id = some_products.all()[0].product_id
    client_id = some_clients.all()[0].client_id
    data = {'title': 'Ticket A', 'product_id': product_id, 'client_id': client_id}
    response = client.post('/api/v1/tickets', json=data, headers=credentials)
    assert(response.status_code == 200)


def test_create_ticket_bad_params_should_fail(client, db, some_products, some_clients):
    credentials = get_credential_headers(client)
    product_id = some_products.all()[0].product_id
    data = {'product_id': product_id}
    response = client.post('/api/v1/tickets', json=data, headers=credentials)
    assert(response.status_code == 400)
    assert(not response.json['data'])
    assert(response.json['details']['client_id'] == ['Missing data for required field.'])
    assert(response.json['details']['title'] == ['Missing data for required field.'])


def test_retrieve_ticket_list(client, db, some_tickets):
    credentials = get_credential_headers(client)
    response = client.get('/api/v1/tickets', headers=credentials)
    assert(response.status_code == 200)
    assert(not response.json['details'])
    assert(response.json['data'][0]['client_id'] == 1)
    assert(response.json['data'][0]['priority'] == 1)
    assert(response.json['data'][1]['client_id'] == 2)
    assert(response.json['data'][1]['priority'] == 2)
    assert(response.json['data'][2]['client_id'] == 3)
    assert(response.json['data'][2]['priority'] == 3)
    assert(response.json['data'][3]['client_id'] == 4)
    assert(response.json['data'][3]['priority'] == 4)


def test_retrieve_ticket(client, db, some_tickets):
    credentials = get_credential_headers(client)
    response = client.get(f'/api/v1/tickets/{some_tickets[0].ticket_id}', headers=credentials)
    assert(response.status_code == 200)
    assert(not response.json['details'])
    assert(response.json['data']['client_id'] == 1)
    assert(response.json['data']['priority'] == 1)


def test_retrieve_ticket_non_existent_should_fail(client, db):
    credentials = get_credential_headers(client)
    response = client.get(f'/api/v1/tickets/ticket-a', headers=credentials)
    assert(response.status_code == 404)
    assert(not response.json)


def test_delete_ticket(client, db, some_tickets):
    credentials = get_credential_headers(client)
    response = client.delete(f'/api/v1/tickets/{some_tickets[0].ticket_id}', headers=credentials)
    assert(response.status_code == 204)
    assert(not response.json)


def test_delete_ticket_non_existent_should_fail(client, db):
    credentials = get_credential_headers(client)
    response = client.delete(f'/api/v1/tickets/ticket-a', headers=credentials)
    assert(response.status_code == 404)
    assert(not response.json)
