featuring-flask-api
====================

### Preparing to run locally

This component has its dependencies listed under requirements.txt.

```
virtualenv featuring $ENVS/featuring
source $ENV_ROOT/featuring/bin/activate
pip install -r requirements.dev.txt
$ROOT/scripts/create_db
```

Where $ROOT is the root path of this component.  

Where $ENV_ROOT is the root path of some place you usally store virtualens.  

### Running in devel mode

The simplest way to run this project.

- Activate into the development environment
- Run ```python cli-runner --port 8090```.
- The api should be available under http://localhost:8090

Try ```python cli-runner.py --help``` for more info.

### Running with gunicorn

In order to prepare against production deployment issues, try running with gunicorn locally.  

- Activate into the development environment prepared
- Run ```scripts/gunicorn-runner```.
- The api should be available under http://localhost:8090

To fully simulate a production deployment, try exporting the following variables before running the above commands:
```
export SETTINGS_ENVIRON=featuring.settings.production
export LOGCONFIG_ENVIRON=featuring.settings.logconfig.production
```

### Packaging for distribution

This component is packaged into a .deb for easier and more robust distribution and installation.

- Make sure you have dh_virtualenv available in your $PATH.
- Run ```$ROOT/scripts/build-deb```.
- Results should be available under $ROOT/packaging.

*NOTE: production configuration is not packaged within the generated deb file. If you want to start the application through supervisord, for example, you should setup it on the target server by yourself.*

### Running the test suite

This component is armed with some test automation targeting both models and the HTTP API.

- Activate into the development environment
- Run ```scripts/runtest``` *(cli arguments are passed straight to py.test)*
- Coverage info should be available under $ROOT/htmlcov.
