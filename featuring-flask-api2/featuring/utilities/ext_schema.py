from marshmallow import ValidationError


class InputValidationError(ValidationError):
    """Raised when loading fails on an input-specialized schema"""


class InputLoaderSchemaMixin(object):
    def load_strict(self, data):
        loaded = self.load(data)
        if loaded.errors:
            raise InputValidationError(loaded.errors)
        return loaded
