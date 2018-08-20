import os
from fabric.api import task, sudo
from fabric.operations import put
from fabric.context_managers import settings
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
    require.deb.package('mysql-server')
    require.deb.package('git')


@task
def python():
    require.deb.package('software-properties-common')
    require.deb.key('BA6932366A755776', keyserver='keyserver.ubuntu.com')
    require.deb.source('deadsnakes-ppa-bionic', 'http://ppa.launchpad.net/deadsnakes/ppa/ubuntu', 'bionic', 'main')
    require.deb.ppa('ppa:deadsnakes/ppa', keyserver='keyserver.ubuntu.com')
    require.deb.package('python3.7')
    require.deb.package('python3-distutils')


@task
def mysqld():
    prompts = {
        'Press y|Y for Yes, any other key for No: ': 'n',
        'New password: ': 'root',
        'Re-enter new password: ': 'root',
        'Remove anonymous users? (Press y|Y for Yes, any other key for No) : ': 'n',
        'Disallow root login remotely? (Press y|Y for Yes, any other key for No) : ': 'y',
        'Remove test database and access to it? (Press y|Y for Yes, any other key for No) : ': 'n',
        'Reload privilege tables now? (Press y|Y for Yes, any other key for No) : ': 'y',
    }
    with settings(prompts=prompts):
        sudo('mysql_secure_installation')


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
    mysqld()
    nginx()
    supervisord()
