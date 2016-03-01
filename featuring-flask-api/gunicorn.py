import os
import multiprocessing

logdir = os.environ.get("GUNICORN_BASE_LOGDIR")
autoreload = os.environ.get("GUNICORN_AUTO_RELOAD")

proc_name = "featuring-flask-api"
bind = "127.0.0.1:8090"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "sync"
loglevel = "info"
accesslog = os.path.join(logdir, "gunicorn.access.log") if logdir else "-"
errorlog = os.path.join(logdir, "gunicorn.error.log") if logdir else "-"
reload = True if autoreload.lower() in ['true', '1'] else False
