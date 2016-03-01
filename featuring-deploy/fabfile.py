from fabric.api import run, task, sudo, env, local, runs_once
import featuring_base as base
import featuring_flask_api as api
import featuring_react_gui as gui


@task(default=True)
def deploy():
    api.checkenv()
    gui.checkenv()
    base.debs()
    base.nginx()
    base.supervisord()
    api.build()
    api.install()
    api.restart()
    gui.build()
    gui.install()
