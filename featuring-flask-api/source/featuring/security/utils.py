import random
import string


def generate_secret_key(length):
    choices = string.ascii_letters + string.digits + string.punctuation
    return ''.join([random.SystemRandom().choice(choices) for _ in range(length)])
