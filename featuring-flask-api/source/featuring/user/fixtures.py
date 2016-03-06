from .models import User


def create_users():
    User.create(username='root', password='123123', fullname='SuperRoot')
    User.create(username='jetson', password='111111', fullname='Samy Jetson')
