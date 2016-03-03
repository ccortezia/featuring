import pytz
import datetime


def now():
    return datetime.datetime.now(pytz.utc)


def tomorrow():
    _now = now()
    return datetime.datetime(
        year=_now.year, month=_now.month,
        day=_now.day + 1, hour=17)