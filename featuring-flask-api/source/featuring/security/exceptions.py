
class AuthenticationFailure(Exception):
    """Raised when an attempt to authenticate a request fails"""


class AuthorizationFailure(Exception):
    """Raised when a request credentials doesn't have enough privileges to finish"""
