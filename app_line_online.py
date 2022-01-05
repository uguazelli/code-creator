import uuid, os, qrcode, logging, constants, util
from util import TEMP_DIR, login_required
from passlib.hash import sha256_crypt
from flask import request, Blueprint, send_file, render_template, session, redirect, jsonify

app_line_online = Blueprint('app_line_online','__name__')

def get_rooms():
    values = ( session.get('email'), )
    query = constants.sql_rooms
    result = util.query_select(query, values)
    return result



@app_line_online.route('/qr-code/admin',
    methods=["GET","POST"])
@login_required
def admin():
    return render_template('admin/admin.html', data = get_rooms())



@app_line_online.route('/qr-code/admin/room',
    methods=["GET","POST"])
@login_required
def rooms():
    if request.method == "GET":
        rooms = get_rooms()
        return jsonify(rooms)
    else:
        req = request.get_json()
        values = ( req["id"], req["actual_number"] )
        query = constants.sql_register
        result = util.query_exec(query, values)


@app_line_online.route('/qr-code/admin/change-password',
    methods=["GET","POST"])
@login_required
def admin_change_password():
    if request.method == "GET":
        return render_template('admin/change-password.html')
    else:
        req = request.get_json()
        email = session.get('email')
        password = sha256_crypt.encrypt(req["password"])
        values = ( password,  email )
        query = constants.sql_update_password
        result = util.query_exec(query, values)
        return jsonify(result)



@app_line_online.route('/qr-code/admin/room/<int:id>/number/<string:number>',
    methods=["GET","POST"])
def number_room(id, number):
    if request.method == "POST":
        values = (number, id )
        query = constants.sql_update_number_room
        result = util.query_exec(query, values)
        return jsonify(result)



@app_line_online.route('/qr-code/admin/room/<int:id>',
    methods=["GET","POST"])
@login_required
def admin_room(id):
    return render_template('admin-room.html')



@app_line_online.route("/qr-client/room/<int:id>",
    methods=["GET","POST"])
def qr_client(id):
    if request.method == "GET":
        values = ( id, )
        query = constants.sql_room_by_id
        room = util.query_select(query, values)[0]
        last_number = int(room["last_number"])
        actual_number =  int(room["actual_number"])
        if last_number >= actual_number:
            last_number += 1
        else:
            last_number = actual_number + 1

        values = ( last_number, id )
        query = constants.sql_update_last_number_room
        result = util.query_exec(query, values)
        print(result)

        actual_number = room["prefix"] + str(actual_number)
        last_number = room["prefix"] + str(last_number)


        return render_template('qr-client.html', admin_number=actual_number,  client_number=last_number)


