import os
from fabric.api import run, task, sudo, env, local, runs_once
from fabric.operations import put
from fabric.context_managers import cd, quiet
from fabric.utils import abort
from fabtools import require, deb, service

PROJNAME = "featuring"
COMPNAME = "featuring-flask-api"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")

SETTINGS = {
    "proj": {
        "name": PROJNAME,
        "builder": os.path.join(ROOT, COMPNAME, "scripts/build-deb"),
        "package": os.path.join(ROOT, COMPNAME, "packaging/*.deb")
    },
    "supervisor": {
        "proj-local": os.path.join(HERE, "resources/{}.proj.conf".format(COMPNAME)),
        "proj-remote": "/etc/supervisor/conf.d/{}.conf".format(COMPNAME),
    }
}


@task
def checkenv():
    pass


@task
def build():
    local(SETTINGS["proj"]["builder"])


@task
def install():
    put(SETTINGS["proj"]["package"], '/tmp/{}.deb'.format(COMPNAME))
    sudo("dpkg -P {}".format(COMPNAME))
    sudo("dpkg -i /tmp/{}.deb".format(COMPNAME))
    put(SETTINGS["supervisor"]["proj-local"], SETTINGS["supervisor"]["proj-remote"], use_sudo=True)
    sudo("rm -f /tmp/{}.deb".format(COMPNAME))


@task
def restart():
    sudo("supervisorctl stop {}".format(COMPNAME))
    sudo("supervisorctl reread")
    sudo("supervisorctl update")
    sudo("supervisorctl start {}".format(COMPNAME))


@task
def create_db():
    sudo("mkdir -p /var/lib/featuring/")
    sudo("SETTINGS_ENVIRON=featuring.settings.production "
         "LOGCONFIG_ENVIRON=featuring.settings.logconfig.production "
         "DB_PATH=/var/lib/featuring/app.db "
         "/usr/share/python/{}/bin/create_db".format(COMPNAME))


@task
def deploy():
    checkenv()
    build()
    install()
    restart()
