featuring-flask-api
====================

### Preparing to run locally

This component has its dependencies listed under requirements.txt.

```
# Create a Python 3 virtualenv and activate it
virtualenv -p $(which python3) /tmp/venv
source /tmp/venv/bin/activate

pip install -r requirements.dev.txt

# Run database migrations.
flask db upgrade
```

### Running in development mode

- Launch a mysql database (see [`../docker-compose.yml`](../docker-compose.yml))
- Activate into the development virtualenv
- Run `flask run`
- The api should be available at http://localhost:5000

### Running the test suite

- Launch a mysql database (see [`../docker-compose.yml`](../docker-compose.yml))
- Activate into the development virtualenv
- Run `pytest`
- Coverage info should be available under $ROOT/htmlcov.
