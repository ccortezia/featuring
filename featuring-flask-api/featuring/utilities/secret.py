import functools
import secrets
import string


def generate_secret_key(length):
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.SystemRandom().choice(alphabet) for i in range(length))


def secret_key_generator(length=50):
    return functools.partial(generate_secret_key, length)
