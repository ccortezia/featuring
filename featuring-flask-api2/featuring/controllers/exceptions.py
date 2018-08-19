
class AuthenticationFailure(Exception):
    """Raised when an attempt to authenticate a request fails"""


class AuthorizationFailure(Exception):
    """Raised when a request credentials doesn't have enough privileges to finish"""


class PersistenceError(Exception):
    pass


class PersistenceWriteError(Exception):
    pass


class PersistenceReadError(Exception):
    pass


class UniqueViolation(PersistenceWriteError):
    pass


class NotFound(PersistenceReadError):
    pass
