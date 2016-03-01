import os
from fabric.api import run, task, sudo, env, local, runs_once
from fabric.operations import put
from fabric.context_managers import lcd, cd, quiet
from fabric.utils import abort
from fabtools import require, deb, service

PROJNAME = "featuring"
COMPNAME = "featuring-react-gui"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))

SETTINGS = {
    "proj": {
        "name": PROJNAME,
        "package": os.path.join(ROOT, COMPNAME, "dist/{}.tar.gz".format(COMPNAME))
    },
    "supervisor": {
        "proj-conf": os.path.join(ROOT, "resources/{}.proj.conf".format(COMPNAME)),
    }
}


@task
def checkenv():
    with quiet():
        if not local('which npm').succeeded:
            abort('npm is unavailable at $PATH')


@task
def build():
    with lcd(os.path.join(ROOT, COMPNAME)):
        local("rm -rf build")
        local("npm run dist")
        local("rm build/test*")


@task
def install():
    with lcd(os.path.join(ROOT, COMPNAME)):
        sudo("mkdir -p /var/www/{}".format(COMPNAME))
        put("build/*", "/var/www/{}/".format(COMPNAME), use_sudo=True)
    sudo("ln -sf /var/www/{} /var/www/{}".format(PROJNAME, COMPNAME))


@task
def deploy():
    checkenv()
    build()
    install()
