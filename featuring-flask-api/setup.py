import os
import json
from setuptools import setup, find_packages
HERE = os.path.dirname(os.path.abspath(__file__))


def get_version():
    with open(os.path.join(HERE, "source/featuring/version.py")) as fp:
        version = fp.read().split('=')[-1]
        version = version.strip(' ')
        version = version.strip('\n')
        version = json.loads(version)


setup(
    name="featuring-flask-api",
    version=get_version(),
    package_dir={'': 'source'},
    packages=find_packages('source'),
    include_package_data=True,
    author="Cristiano Cortezia",
    author_email="cristiano.cortezia@gmail.com",
    description="",
)
