from flask import request


def IsAdmin(request):
    return request.session['is_admin']
