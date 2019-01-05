from flask import *
from sqlalchemy import and_
from manyone import *
from manyone.classes import *

__all__ = ['_app_start_ini','_create_access_log','_create_user_property','_is_org_valid','_is_user_valid','_is_admin_valid']

def _app_start_ini():
    """
    # 処理： アプリケーションサーバ起動時初期化処理
    # 概要：
    # 備考：
    """
    DB.session.query(t_user).delete()
    DB.session.commit()

def _create_access_log(url):
    """
    # 処理： アクセスログ作成処理
    # 概要：
    # 備考：
    """
    ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
    log = t_sys_access_log(org_id=session.get('orgid')
                          ,user_id=session.get('userid')
                          ,ip=ip
                          ,url=url
                          )
    DB.session.add(log)
    DB.session.commit()


def _create_user_property(req_url):
    import requests
    response = requests.get(req_url).json()
    chk1  = DB.session.query(m_ipaddr
                     ).filter(m_ipaddr.ip == session.get('ip_addr')
                     ).first()
    if chk1 is None:
        ipaddr = m_ipaddr(ip=session.get('ip_addr')
                         ,place              = response['geoplugin_place']
                         ,countryCode        = response['geoplugin_countryCode']
                         ,region             = response['geoplugin_region']
                         ,regionAbbreviated  = response['geoplugin_regionAbbreviated']
                         ,latitude           = response['geoplugin_latitude']
                         ,longitude          = response['geoplugin_longitude']
                         ,distanceMiles      = response['geoplugin_distanceMiles']
                         ,distanceKilometers = response['geoplugin_distanceKilometers']
                         )
        DB.session.add(ipaddr)
        DB.session.commit()
    chk2  = DB.session.query(m_region
                     ).filter(m_region.region == response['geoplugin_region']
                     ).first()
    if chk2 is None:
        region = m_region(region=response['geoplugin_region'])
        DB.session.add(region)
        DB.session.commit()

    user_ins  = DB.session.query(t_user
                        ).filter(t_user.socket_id == session.get('socket_id')
                        ).first()
    if user_ins is not None:
        user_ins.region = response['geoplugin_region']
        DB.session.commit()

def _is_org_valid():
    orgid    = request.form.get('orgid')
    org_rst  = DB.session.query(m_org
                    ).filter(
                        and_(m_org.org_id == orgid
                            ,m_org.stop_flg == 0
                            ,m_org.del_flg == 0
                            )
                    ).first()
    if org_rst is not None:
        session['orgid']   = orgid
        session['orgnm']   = org_rst.org_nm
        session['orgimg']  = org_rst.profile_img_file
        return True
    else:
        return False

def _is_user_valid():
    """
    # 処理： ログイン認証処理
    # 概要：
    # 備考：
    """
    # todo: passにID+固定文字列結合 + 一方向暗号化

    import bcrypt
    salt     = bcrypt.gensalt(rounds=10, prefix=b'2a')
    userid   = request.form.get('userid')
    password = request.form.get('password')
    password = password.encode('utf-8')

    user_rst = DB.session.query(m_user
                    ).filter(
                        and_(m_user.org_id == session.get('orgid')
                            ,m_user.user_id == userid
                            ,m_user.stop_flg == 0
                            )
                    ).first()
    if user_rst is not None:
        # 初回以外
        if user_rst.user_pass_bcrypt is not None:
            if bcrypt.checkpw(password, user_rst.user_pass_bcrypt) == True:
                session['userid'] = user_rst.user_id
                session['usernm'] = user_rst.user_nm
                return True
            else:
                return False
        # 初期設定の場合(NULLはDB登録意外ありえない)
        else:
            # 入力パスワードがユーザーIDと一致
            if userid == user_rst.user_id:
                userid_utf8               = userid.encode('utf-8')
                bcrypt_password           = bcrypt.hashpw(userid_utf8, salt)
                user_rst.user_pass_bcrypt = bcrypt_password
                DB.session.commit()
                session['userid'] = user_rst.user_id
                session['usernm'] = user_rst.user_nm
                return True
            else:
                return False
    else:
        return False

def _is_admin_valid():
    # todo
    user_rst = DB.session.query(m_user
                    ).filter(
                        and_(m_user.org_id == session.get('orgid')
                            ,m_user.user_id == session.get('userid')
                            )
                    ).first()
    user_auth_rst = DB.session.query(m_user_auth
                    ).filter(m_user_auth.user_auth_cd == user_rst.user_auth_cd
                    ).first()
    if user_auth_rst.sysadm_access_flg == 1:
        return True
    else:
        return False
