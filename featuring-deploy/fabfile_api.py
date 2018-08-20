import os
from fabric.api import run, task, sudo, env, local, runs_once
from fabric.operations import put
from fabric.contrib.files import upload_template
from fabric.context_managers import cd, quiet
from fabric.utils import abort
from fabtools import require, deb, service, git, python, mysql


PROJNAME = 'featuring'
COMPNAME = 'featuring-flask-api'
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, '..')

SETTINGS = {
    'proj': {
        'name': PROJNAME,
        'remote-root': '/opt/projs/{}'.format(PROJNAME),
        'remote-venv': '/opt/venv/{}'.format(PROJNAME)
    },
    'supervisor': {
        'proj-local': os.path.join(HERE, 'resources/{}.proj.conf.tpl'.format(COMPNAME)),
        'proj-remote': '/etc/supervisor/conf.d/{}.conf'.format(COMPNAME),
    },
    'gunicorn': {
        'proj-local': os.path.join(HERE, 'resources/gunicorn_settings.py'),
        'proj-remote': '/usr/local/etc/{}/gunicorn_setting.py'.format(PROJNAME),
    }
}

COMPROOT = os.path.join(SETTINGS['proj']['remote-root'], COMPNAME)


@task
def checkenv():
    return


@task
def install():
    sudo('rm -rf {}'.format(SETTINGS['proj']['remote-root']))
    sudo('rm -rf {}'.format(SETTINGS['proj']['remote-venv']))

    git.clone('https://github.com/ccortezia/featuring.git',
              path=SETTINGS['proj']['remote-root'],
              use_sudo=False)

    git.checkout(SETTINGS['proj']['remote-root'], branch='api-revamp')

    require.python.virtualenv(SETTINGS['proj']['remote-venv'],
                              venv_python='/usr/bin/python3.7')

    require.python.pip()

    with python.virtualenv(SETTINGS['proj']['remote-venv']):
        python.install_requirements(os.path.join(COMPROOT, 'requirements.txt'))

    upload_template(
        filename=SETTINGS['supervisor']['proj-local'],
        destination=SETTINGS['supervisor']['proj-remote'],
        context={},
        use_sudo=True)

    sudo('mkdir -p {}'.format(os.path.dirname(SETTINGS['gunicorn']['proj-remote'])))
    put(SETTINGS['gunicorn']['proj-local'], SETTINGS['gunicorn']['proj-remote'], use_sudo=True)

    with python.virtualenv(SETTINGS['proj']['remote-venv']):
        require.python.package('gunicorn')


@task
def db_init():
    if not mysql.user_exists('featuring'):
        mysql.create_user('featuring', '123123')
    if not mysql.database_exists('featuring'):
        mysql.create_database('featuring', owner='featuring')


@task
def db_upgrade():
    with python.virtualenv(SETTINGS['proj']['remote-venv']):
        with cd(COMPROOT):
            run('flask db upgrade')


@task
def db_downgrade():
    with python.virtualenv(SETTINGS['proj']['remote-venv']):
        with cd(COMPROOT):
            run('flask db upgrade')


@task
def restart():
    sudo('supervisorctl stop {}'.format(COMPNAME))
    sudo('supervisorctl reread')
    sudo('supervisorctl update')
    sudo('supervisorctl start {}'.format(COMPNAME))


@task
def deploy():
    checkenv()
    install()
    db_init()
    db_upgrade()
    restart()
