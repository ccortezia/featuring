import json
from fixtures import *


def test_ping(client):
    resp = client.get("/api/v1/ping")
    assert json.loads(resp.data) == "pong"
