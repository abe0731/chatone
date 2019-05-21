from os import urandom
SECRET_KEY                     = urandom(24)
SQLALCHEMY_TRACK_MODIFICATIONS = True
SQLALCHEMY_DATABASE_URI        = 'postgresql://postgres:admin@192.168.0.7:5432/chatone'
DEBUG                          = False

