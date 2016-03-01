import logging
import json
from fixtures import *


def test_ping(client):
    logging.getLogger('featuring').info("123")
    resp = client.get("/api/v1/ping")
    assert json.loads(resp.data) == "pong"
