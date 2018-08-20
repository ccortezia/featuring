import os
from fabric.api import task, sudo, local
from fabric.operations import put
from fabric.context_managers import lcd, quiet
from fabric.utils import abort

PROJNAME = 'featuring'
COMPNAME = 'featuring-react-gui'
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, '..'))

SETTINGS = {
    'proj': {
        'name': PROJNAME,
        'package': os.path.join(ROOT, COMPNAME, 'dist/{}.tar.gz'.format(COMPNAME)),
        'remote-path': os.path.join('/var/www/', COMPNAME),
        'remote-path-generic': os.path.join('/var/www/', PROJNAME),
    },
    'supervisor': {
        'proj-conf': os.path.join(ROOT, 'resources/{}.proj.conf'.format(COMPNAME)),
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
        local('rm -rf build')
        local('npm run build')


@task
def install():
    sudo('mkdir -p {s[proj][remote-path]}'.format(s=SETTINGS))
    with lcd(os.path.join(ROOT, COMPNAME)):
        put('build/*', SETTINGS['proj']['remote-path'], use_sudo=True)
    sudo('ln -sf {s[proj][remote-path]} {s[proj][remote-path-generic]}'.format(s=SETTINGS))


@task
def deploy():
    checkenv()
    build()
    install()
