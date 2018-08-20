from fabric.api import task
import fabfile_base as base
import fabfile_api as api
import fabfile_gui as gui


@task(default=True)
def deploy():
    api.checkenv()
    gui.checkenv()
    base.debs()
    base.python()
    base.mysqld()
    base.nginx()
    base.supervisord()
    api.install()
    api.db_init()
    api.db_upgrade()
    api.restart()
    gui.build()
    gui.install()
