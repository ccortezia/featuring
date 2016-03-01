import os
from fabric.api import run, task, sudo, env, local, runs_once
from fabric.operations import put
from fabric.context_managers import cd
from fabric.utils import abort
from fabtools import require, deb, service

PROJNAME = "featuring"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(HERE)

SETTINGS = {
    "proj": {
        "name": PROJNAME,
    },
    "nginx": {
        "conf": os.path.join(ROOT, 'resources/{}.nginx.conf'.format(PROJNAME)),
    },
    "supervisor": {
        "conf": os.path.join(ROOT, "resources/supervisord.conf")
    }
}


@task
def debs():
    require.deb.uptodate_index(max_age={'hour': 1})
    deb.upgrade()
    require.deb.nopackage('apache2')


@task
def nginx():
    require.deb.package("nginx")
    projname = SETTINGS["proj"]["name"]
    put(SETTINGS["nginx"]["conf"], "/etc/nginx/sites-available/{}.conf".format(projname), use_sudo=True)
    sudo("ln -sf /etc/nginx/sites-available/{0}.conf /etc/nginx/sites-enabled/{0}.conf".format(projname))
    sudo("rm -f /etc/nginx/sites-enabled/default")
    service.restart("nginx")


@task
def supervisord():
    require.deb.package("supervisor")
    put(SETTINGS["supervisor"]["conf"], '/etc/supervisor/supervisord.conf', use_sudo=True)


def deploy():
    debs()
    nginx()
    supervisord()
