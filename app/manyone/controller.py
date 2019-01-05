from flask import *
from sqlalchemy import and_
from datetime import datetime
from manyone import *
from manyone.classes import *
from manyone.functions import *

@APP.before_request
def before_request():
    return

@APP.route('/')
def index():
    _create_access_log('/index')
    return render_template('index.html')

@APP.route('/chat')
def chat():
    _create_access_log('/chat')
    return render_template('chat.html')

@APP.route('/rule')
def rule():
    _create_access_log('/rule')
    return render_template('rule.html')

@APP.route('/form', methods=['GET', 'POST'])
def form():
    _create_access_log('/form')
    name  = request.form.get('form-name')
    mail  = request.form.get('form-mail')
    value = request.form.get('form-value')
    if name is not None:
        form_ins = t_form(name=name
                         ,mail=mail
                         ,value=value
                         )
        DB.session.add(form_ins)
        DB.session.commit()
        return render_template('index.html'
                              ,end_flg=1
                              )
    else:
        return render_template('form.html')






