import os
import multiprocessing

os.environ.setdefault("GUNICORN_PROC_NAME", "featuring-flask-api")
os.environ.setdefault("GUNICORN_HOST", "127.0.0.1")
os.environ.setdefault("GUNICORN_PORT", "8090")

logdir = os.environ.get("GUNICORN_BASE_LOGDIR")
reload = os.environ.get("GUNICORN_AUTO_RELOAD", "").lower() in ['true', '1']
proc_name = "{GUNICORN_PROC_NAME}".format(**os.environ)
bind = "{GUNICORN_HOST}:{GUNICORN_PORT}".format(**os.environ)
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
loglevel = "info"
accesslog = os.path.join(logdir, "gunicorn.access.log") if logdir else "-"
errorlog = os.path.join(logdir, "gunicorn.error.log") if logdir else "-"
