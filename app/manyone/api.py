from flask import *
from flask_socketio import *
# from flask import url_for, session, render_template, request, redirect
# from flask_socketio import emit
from sqlalchemy import and_
from datetime import datetime
from manyone import *
from manyone.functions import *
from manyone.classes import *
import json
import requests

@SOK.on('sok_cli_send_chat', namespace='/sok')
def sok_cli_send_chat(message):

    import urllib.parse
    w_text         = message['w_text']
    resv_socket_id = message['resv_socket_id']

    w_text = urllib.parse.unquote(w_text)

    chat_ins = t_chat(chat=w_text
                     ,send_socket_id=session.get('socket_id')
                     ,resv_socket_id=resv_socket_id
                     )
    DB.session.add(chat_ins)
    DB.session.commit()

    rst_send_user = DB.session.query(t_user
                ).filter(t_user.socket_id == session.get('socket_id')
                ).first()
    rst_resv_user = DB.session.query(t_user
                ).filter(t_user.socket_id == resv_socket_id
                ).first()
    rst_region = DB.session.query(m_region
                ).filter(m_region.alias1 == rst_send_user.region
                ).first()
    if rst_region != None :
        w_region = rst_region.region
    else :
        w_region = rst_send_user.region

    if rst_resv_user != None :
        emit('sok_srv_send_chat'
            , {
                 'chat'            : w_text
                ,'send_socket_id'  : session.get('socket_id')
                ,'send_name'       : rst_send_user.name
                ,'send_msg'        : rst_send_user.msg
                ,'send_img'        : rst_send_user.img
                ,'send_region'     : w_region
              }
              ,room=rst_resv_user.socket_id
          )
    else :
        emit('sok_srv_send_chat_ng'
            , {
                 'resv_socket_id'  : resv_socket_id
              }
              ,room=session.get('socket_id')
          )

@SOK.on('sok_cli_search_auto', namespace='/sok')
def sok_cli_search_auto(message):

    sql = """
        select socket_id
              ,case when name is null then socket_id else name end as name
              ,(select case
                         when alias1 is not null then alias1
                         else region
                       end
                  from m_region where region = a.region) region
              ,msg
          from t_user a
         where socket_id != '@MYID@'
           and socket_id is not null
         order by key desc
         limit 10
    """
    sql = sql.replace("@MYID@" ,session.get('socket_id'))
    rst_sql = DB.session.execute(sql)

    for r in rst_sql:
        emit('sok_srv_search_auto'
            , {
                 'socket_id' : r.socket_id
                ,'name'      : r.name
                ,'region'    : r.region
                ,'msg'       : r.msg
                ,'rst_cnt'   : rst_sql.rowcount
              }
              ,room=session.get('socket_id')
          )

@SOK.on('sok_cli_search_id', namespace='/sok')
def sok_cli_search_id(message):

    import urllib.parse
    w_text = message['w_text']
    w_text = urllib.parse.unquote(w_text)


    sql = """
        select socket_id
              ,case when name is null then socket_id else name end as name
              ,(select case
                         when alias1 is not null then alias1
                         else region
                       end
                  from m_region where region = a.region) region
              ,msg
          from t_user a
         where socket_id like '%@TEXT@%'
           and socket_id != '@MYID@'
           and socket_id is not null
         order by key desc
         limit 10
    """
    sql = sql.replace("@TEXT@" ,w_text)
    sql = sql.replace("@MYID@" ,session.get('socket_id'))
    rst_sql = DB.session.execute(sql)

    for r in rst_sql:
        emit('sok_srv_search_id'
            , {
                 'socket_id' : r.socket_id
                ,'name'      : r.name
                ,'region'    : r.region
                ,'msg'       : r.msg
                ,'rst_cnt'   : rst_sql.rowcount
              }
              ,room=session.get('socket_id')
          )

@SOK.on('sok_cli_search_name', namespace='/sok')
def sok_cli_search_name(message):

    import urllib.parse
    w_text = message['w_text']
    w_text = urllib.parse.unquote(w_text)

    sql = """
        select socket_id
              ,case when name is null then socket_id else name end as name
              ,(select case
                         when alias1 is not null then alias1
                         else region
                       end
                  from m_region where region = a.region) region
              ,msg
          from t_user a
         where name like '%@TEXT@%'
           and socket_id != '@MYID@'
           and socket_id is not null
         order by key desc
         limit 10
    """
    sql = sql.replace("@TEXT@" ,w_text)
    sql = sql.replace("@MYID@" ,session.get('socket_id'))
    rst_sql = DB.session.execute(sql)

    for r in rst_sql:
        emit('sok_srv_search_name'
            , {
                 'socket_id' : r.socket_id
                ,'name'      : r.name
                ,'region'    : r.region
                ,'msg'       : r.msg
                ,'rst_cnt'   : rst_sql.rowcount
              }
              ,room=session.get('socket_id')
          )

@SOK.on('sok_cli_search_region', namespace='/sok')
def sok_cli_search_region(message):

    import urllib.parse
    w_text = message['w_text']
    w_text = urllib.parse.unquote(w_text)

    sql = """
        select socket_id
              ,case when name is null then socket_id else name end as name
              ,(select case
                         when alias1 is not null then alias1
                         else region
                       end
                  from m_region where region = a.region) region
              ,msg
          from t_user a
         where region = (select region
                           from m_region
                          where region like '%@TEXT@%'
                             or alias1 like '%@TEXT@%'
                             or alias2 like '%@TEXT@%'
                             or alias3 like '%@TEXT@%'
                        )
           and socket_id != '@MYID@'
           and socket_id is not null
         order by key desc
         limit 10
    """
    sql = sql.replace("@TEXT@" ,w_text)
    sql = sql.replace("@MYID@" ,session.get('socket_id'))
    rst_sql = DB.session.execute(sql)

    for r in rst_sql:
        emit('sok_srv_search_region'
            , {
                 'socket_id' : r.socket_id
                ,'name'      : r.name
                ,'region'    : r.region
                ,'msg'       : r.msg
                ,'rst_cnt'   : rst_sql.rowcount
              }
              ,room=session.get('socket_id')
          )

@SOK.on('sok_cli_search_network', namespace='/sok')
def sok_cli_search_network(message):

    sql = """
        select socket_id
              ,case when name is null then socket_id else name end as name
              ,(select case
                         when alias1 is not null then alias1
                         else region
                       end
                  from m_region where region = a.region) region
              ,msg
          from t_user a
         where ip_addr = (select ip_addr from t_user where socket_id = '@MYID@')
           and socket_id != '@MYID@'
           and socket_id is not null
         order by key desc
         limit 10
    """
    sql = sql.replace("@MYID@" ,session.get('socket_id'))
    rst_sql = DB.session.execute(sql)

    for r in rst_sql:
        emit('sok_srv_search_network'
            , {
                 'socket_id' : r.socket_id
                ,'name'      : r.name
                ,'region'    : r.region
                ,'msg'       : r.msg
                ,'rst_cnt'   : rst_sql.rowcount
              }
              ,room=session.get('socket_id')
          )

@SOK.on('sok_cli_upd_name', namespace='/sok')
def sok_cli_upd_name(message):

    import urllib.parse
    w_text = message['w_text']
    w_text = urllib.parse.unquote(w_text)

    user_ins = DB.session.query(t_user
                               ).filter(t_user.socket_id == session.get('socket_id')
                               ).first()
    user_ins.name = w_text
    DB.session.commit()

@SOK.on('sok_cli_upd_msg', namespace='/sok')
def sok_cli_upd_msg(message):

    import urllib.parse
    w_text = message['w_text']
    w_text = urllib.parse.unquote(w_text)

    user_ins = DB.session.query(t_user
                               ).filter(t_user.socket_id == session.get('socket_id')
                               ).first()
    user_ins.msg = w_text
    DB.session.commit()

@SOK.on('sok_cli_upd_img', namespace='/sok')
def sok_cli_upd_img(message):

    import urllib.parse
    w_text = message['w_text']
    w_text = urllib.parse.unquote(w_text)

    user_ins = DB.session.query(t_user
                               ).filter(t_user.socket_id == session.get('socket_id')
                               ).first()
    user_ins.img = w_text
    DB.session.commit()


@SOK.on('connect', namespace='/sok')
def sok_connect():

    _create_access_log('/sok_connect')

    session['socket_id'] = request.sid
    session['ip_addr']   = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)

    user_ins = t_user(socket_id=session.get('socket_id')
                     ,ip_addr=session.get('ip_addr')
                     #,region=response['geoplugin_region']
                     )
    DB.session.add(user_ins)
    DB.session.commit()

    # 遅い場合があるので別スレッドで処理
    req_url = 'http://www.geoplugin.net/extras/location.gp?ip=' + session.get('ip_addr') + '&format=json'
    import threading
    threading.Thread(target=_create_user_property(req_url))

    emit('sok_srv_push_socket_id'
        , {'socket_id' : session.get('socket_id')}
        , room=session.get('socket_id')
      )

@SOK.on('disconnect', namespace='/sok')
def sok_disconnect():

    _create_access_log('/sok_disconnect')

    DB.session.query(t_user
            ).filter(t_user.socket_id == session.get('socket_id')
            ).delete()
    DB.session.commit()

    session.pop('socket_id', None)
    session.pop('ip_addr', None)


