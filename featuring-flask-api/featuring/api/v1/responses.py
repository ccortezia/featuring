from dataclasses import dataclass
from .schemas import BaseResponseOutputSchema


@dataclass
class APIResponse:
    payload: str
    http_status: int = 200

    @classmethod
    def error(cls, details, http_status):
        return cls(BaseResponseOutputSchema().dump({
            'success': False,
            'data': None,
            'details': details
        }).data, http_status)

    @classmethod
    def success(cls, data, details=None, http_status=200):
        return cls(BaseResponseOutputSchema().dump({
            'success': True,
            'data': data,
            'details': details
        }).data, http_status)

    @classmethod
    def empty(cls, http_status):
        return cls('', http_status)
