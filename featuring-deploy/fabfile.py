import os
from fabric.api import run, task, sudo, env, local, runs_once
from fabric.operations import put
from fabric.context_managers import cd, quiet
from fabric.utils import abort
from fabtools import require, deb, service

PROJNAME = "featuring"
REACT_GUI = "featuring-react-gui"
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))

SETTINGS = {
    "proj": {
        "name": PROJNAME,
        "builder": os.path.join(HERE, "build.sh"),
    },
    "react-gui": {
        "dist-js": os.path.join(ROOT, REACT_GUI, "build/app.js"),
        "dist-html": os.path.join(ROOT, REACT_GUI, "build/index.html")
    },
    "nginx": {
        "conf": os.path.join(HERE, 'nginx.conf'),
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
    service.reload("nginx")


@task
def install_react_gui():
    local(SETTINGS["proj"]["builder"])
    sudo("mkdir -p /var/www/featuring")
    put(SETTINGS["react-gui"]["dist-html"], '/var/www/featuring/index.html')
    put(SETTINGS["react-gui"]["dist-js"], '/var/www/featuring/app.js')


@task
def restart():
    sudo("service nginx reload")


@task
def checkenv():
    with quiet():
        if not local('which npm').succeeded:
            abort('npm is unavailable at $PATH')


@task(default=True)
def deploy():
    checkenv()
    debs()
    nginx()
    install_react_gui()
    restart()
