import constants, logging, util
from passlib.hash import sha256_crypt
from flask import request, Blueprint, render_template, jsonify, session, redirect

app_login = Blueprint('app_login','__name__')

@app_login.route('/qr-code/logout',
    methods=["GET","POST"])
def logout():
    session.clear()
    return render_template('login/login.html')

@app_login.route('/qr-code/login',
    methods=["GET","POST"])
def login():
    if request.method == "GET":
        return render_template('login/login.html')
    else:
        req = request.get_json()
        query, values = constants.sql_login, (req["email"],)
        result = util.query_select(query, values)
        pswd, db_pswd = req["password"], result[0]["password"]
        valid_pass =  sha256_crypt.verify(pswd, db_pswd)

        if len(result) > 0 and valid_pass:
            session['email'] = req["email"]
            response = {"Success": True}
        else:
            response = {"Success": False}
        return jsonify(response)



@app_login.route('/qr-code/register', methods=["GET","POST"])
def register():
    if request.method == "GET":
        return render_template('login/register.html')
    else:
        req = request.get_json()
        values = ( req["firstName"], req["lastName"], req["email"], sha256_crypt.encrypt(req["password"]) )
        query = constants.sql_register
        result = util.query_exec(query, values)
        if result > 0:
            response = {"Success": True}
            session['email'] = req["email"]
        else:
            response = {"Success": False}
        return jsonify(response)


