
import constants, sqlite3
from passlib.hash import sha256_crypt
from flask import request, Blueprint, render_template, jsonify, session, redirect

app_login = Blueprint('app_login','__name__')

@app_login.route('/qr-code/logout', methods=["GET","POST"])
def logout():
    session.clear()
    return render_template('login/login.html')

@app_login.route('/qr-code/login', methods=["GET","POST"])
def login():
    if request.method == "GET":
        return render_template('login/login.html')
    else:
        req = request.get_json()
        query, values = constants.sql_login, (req["email"],)
        result = query_select(query, values)
        if len(result) > 0 and sha256_crypt.verify(req["password"], result[0][0]):
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
        values = ( req["companyName"], req["firstName"], req["lastName"], req["email"], sha256_crypt.encrypt(req["password"]) )
        query = constants.sql_register
        result = query_insert(query, values)
        if result > 0:
            response = {"Success": True}
        else:
            response = {"Success": False}
        return jsonify(response)


def query_select(query, values):
    try:
        conn = sqlite3.connect(constants.db)
        cur = conn.cursor()
        cur.execute(query, values)
        rows = cur.fetchall()
        conn.close()
        return rows
    except:
        return -1


def query_insert(query, values):
    try:
        conn = sqlite3.connect(constants.db)
        cur = conn.cursor()
        cur.execute(query, values)
        conn.commit()
        conn.close()
        return cur.lastrowid
    except:
        return -1
