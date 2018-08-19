import pytz
import datetime


def iso_today():
    return datetime.date.today().isoformat()


def iso_tomorrow():
    return (datetime.date.today() + datetime.timedelta(days=1)).isoformat()


def now():
    return datetime.datetime.now(pytz.utc)


def dt_from_ts(ts):
    return datetime.datetime.fromtimestamp(ts, pytz.utc)


def attr_not_none(obj, attr_name, attr_value):
    return attr_value is not None


def maybe_update(obj, attr, value, cond=attr_not_none):
    prior_value = getattr(obj, attr)
    if cond(obj, attr, value):
        setattr(obj, attr, value)
    return (getattr(obj, attr), prior_value)
