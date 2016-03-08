import functools
from flask import request
from .exceptions import AuthorizationFailure


def AbortOnFirstFailure(rule, request, items):
    """Applies rule to the itemset and raises upon the first failure"""
    results = []
    for item in items:
        if not rule(request, item):
            raise AuthorizationFailure()
        results.append(item)
    return results


def authorize(rule, data=None, strategy=AbortOnFirstFailure):
    """
    @rule - mapping function, should return boolean positive to express success
    @strategy - determines what to do in case data holds multiple objects
    """
    if not data:
        if not rule(request):
            raise AuthorizationFailure()
        return data
    else:
        if not isinstance(data, list):
            if not rule(request, data):
                raise AuthenticationError()
            return data
        return strategy(rule, request, data)
