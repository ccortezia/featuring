from flask import request


def IsAdminOrSelf(request, obj=None):
    if request.session.get('is_admin', False):
        return True
    username = request.session.get('username')
    if username and username == obj.username:
        return True
    return False
