from manyone import *
from sqlalchemy import *

__all__ = ['t_user'
          ,'t_chat'
          ,'t_form'
          ,'t_sys_access_log'
          ,'m_region','m_ipaddr'
          ]

class t_user(DB.Model):
    __tablename__    = 't_user'
    __table_args__   = {'extend_existing': True}
    key              = DB.Column(DB.BigInteger, Sequence('t_user_seq'), primary_key=True)
    socket_id        = DB.Column(DB.Text)
    peer_id          = DB.Column(DB.Text)
    name             = DB.Column(DB.Text)
    img              = DB.Column(DB.Text)
    msg              = DB.Column(DB.Text)
    ip_addr          = DB.Column(DB.Text)
    region           = DB.Column(DB.Text)
    msg              = DB.Column(DB.Text)
    upd_dtm          = DB.Column(DB.TIMESTAMP, default=func.now())

class t_chat(DB.Model):
    __tablename__  = 't_chat'
    __table_args__ = {'extend_existing': True}
    chat_id        = DB.Column(DB.BigInteger, Sequence('t_chat_seq'), primary_key=True)
    chat           = DB.Column(DB.Text)
    send_socket_id = DB.Column(DB.Text)
    resv_socket_id = DB.Column(DB.Text)
    upd_dtm        = DB.Column(DB.TIMESTAMP, default=func.now())

class t_form(DB.Model):
    __tablename__  = 't_form'
    __table_args__ = {'extend_existing': True}
    from_id        = DB.Column(DB.BigInteger, Sequence('t_from_seq'), primary_key=True)
    name           = DB.Column(DB.Text)
    mail           = DB.Column(DB.Text)
    value          = DB.Column(DB.Text)
    upd_dtm        = DB.Column(DB.TIMESTAMP, default=func.now())
class t_sys_access_log(DB.Model):
    __tablename__  = 't_sys_access_log'
    __table_args__ = {'extend_existing': True}
    seq            = DB.Column(DB.BigInteger, Sequence('t_sys_access_log_seq'), primary_key=True)
    ip             = DB.Column(DB.Text)
    url            = DB.Column(DB.Text)
    org_id         = DB.Column(DB.Text)
    user_id        = DB.Column(DB.Text)
    access_dtm     = DB.Column(DB.TIMESTAMP, default=func.now())

class m_ipaddr(DB.Model):
    __tablename__      = 'm_ipaddr'
    __table_args__     = {'extend_existing': True}
    ip                 = DB.Column(DB.Text, primary_key=True)
    place              = DB.Column(DB.Text)
    countryCode        = DB.Column(DB.Text)
    region             = DB.Column(DB.Text)
    regionAbbreviated  = DB.Column(DB.Text)
    latitude           = DB.Column(DB.Text)
    longitude          = DB.Column(DB.Text)
    distanceMiles      = DB.Column(DB.Text)
    distanceKilometers = DB.Column(DB.Text)

class m_region(DB.Model):
    __tablename__  = 'm_region'
    __table_args__ = {'extend_existing': True}
    region         = DB.Column(DB.Text, primary_key=True)
    alias1         = DB.Column(DB.Text)
    alias2         = DB.Column(DB.Text)
    alias3         = DB.Column(DB.Text)

