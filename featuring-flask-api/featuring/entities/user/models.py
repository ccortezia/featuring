from sqlalchemy.ext.hybrid import hybrid_property, Comparator
from featuring import db, bcrypt
from featuring.utilities.secret import secret_key_generator


class User(db.Model):
    __tablename__ = 'users'

    username = db.Column(db.String(25), primary_key=True)
    password = db.Column(db.String(256), default=secret_key_generator(50), nullable=False)
    fullname = db.Column(db.String(120))
    is_admin = db.Column(db.Boolean, default=False)

    @hybrid_property
    def decrypted_password(self):
        raise NotImplementedError('password cannot be read directly')

    @decrypted_password.comparator
    def decrypted_password(cls):
        return User.CryptComparator(cls.password_hashed)

    @decrypted_password.setter
    def decrypted_password(self, value):
        self.password_encrypted = bcrypt.generate_password_hash(value).decode('utf-8')

    class CryptComparator(Comparator):
        def __init__(self, password_hashed):
            self.password_hashed = password_hashed

        def __eq__(self, other):
            return bcrypt.check_password_hash(self.password_encrypted, other)
