featuring-flask-api
====================

### Running in devel mode

The simplest way to run this project is through the cli-runner:

```
virtualenv featuring ~/featuring-env
source ~/featuring-env/bin/activate
pip install -r requirements.dev.txt
cd $ROOT/source
python cli-runner.py
```

Where $ROOT is the root path of this component.  
Try ```python cli-runner.py --help``` for more info.

### Running the tests

Make sure you have the development environment prepared as mentioned above and do as following:

```
py.test $ROOT/source/tests
```

Coverage info is available under the directory htmlcov