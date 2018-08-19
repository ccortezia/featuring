"""Initial

Revision ID: 439cd49acf47
Revises:
Create Date: 2018-08-12 11:14:01.445028

"""
from featuring import db
from featuring.initdata import insert_mandatory_data, insert_optional_data


# revision identifiers, used by Alembic.
revision = '439cd49acf47'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    db.create_all()
    insert_mandatory_data()
    insert_optional_data()
    db.session.commit()


def downgrade():
    db.drop_all()
