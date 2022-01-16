import uuid, os, qrcode, logging, constants, util
from util import TEMP_DIR, login_required
from passlib.hash import sha256_crypt
from flask import request, Blueprint, send_file, render_template, session, redirect, jsonify
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer, GappedSquareModuleDrawer, HorizontalBarsDrawer, RoundedModuleDrawer, SquareModuleDrawer, VerticalBarsDrawer



app_qr = Blueprint('app_qr','__name__')

def get_rooms():
    values = ( session.get('email'), )
    query = constants.sql_rooms
    result = util.query_select(query, values)
    return result



@app_qr.route('/qr-code/admin',
    methods=["GET","POST"])
@login_required
def admin():
    return render_template('admin/admin.html', data = get_rooms())



@app_qr.route('/qr-code/admin/room',
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


@app_qr.route('/qr-code/admin/change-password',
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



@app_qr.route('/qr-code/admin/room/<int:id>/number/<string:number>',
    methods=["GET","POST"])
def number_room(id, number):
    if request.method == "POST":
        values = (number, id )
        query = constants.sql_update_number_room
        result = util.query_exec(query, values)
        return jsonify(result)



@app_qr.route('/qr-code/admin/room/<int:id>',
    methods=["GET","POST"])
@login_required
def admin_room(id):
    return render_template('admin-room.html')



@app_qr.route("/qr-client/room/<int:id>",
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




@app_qr.route("/",
    methods=["GET","POST"])
def qr():
    if request.method == "GET":
        logging.info(f'IP: {request.remote_addr} GET / page')
        return render_template('qr.html', title="QR Code Generator")

    else:
        logging.info(f'IP: {request.remote_addr} POST / page')

        txt = request.values["text"]
        module = request.values["module"]
        modulemask = request.values["modulemask"]
        QRcolor = request.values["frontcolor"]
        QRbackgroundcolor = request.values["backgroudcolor"]

        logo = None
        if len(request.files) != 0:
            file = request.files["file"]
            logo = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".png")
            file.save(logo)

        QRcode = qrcode.QRCode(
            version=None,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=100,
            border=2
            )
        QRcode.add_data(txt)
        QRcode.make(fit=True)


        if module == "squaremodule":
            md = SquareModuleDrawer()
        elif module == "gappedmodule":
            md = GappedSquareModuleDrawer()
        elif module == "circlemodule":
            md = CircleModuleDrawer()
        elif module == "roundedmodule":
            md = RoundedModuleDrawer()
        elif module == "verticalbarmodule":
            md = VerticalBarsDrawer()
        elif module == "horizontalbarmodule":
            md = HorizontalBarsDrawer()
        else:
            md = SquareModuleDrawer()


        if (module != "squaremodule"):
            image_factory = StyledPilImage
        else:
            image_factory = None

        QRimg = QRcode.make_image(
            fill_color=QRcolor,
            back_color=QRbackgroundcolor,
            image_factory=image_factory,
            embeded_image_path=logo,
            module_drawer=md
            ).convert('RGB')

        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".png")
        QRimg.save(result_path)

        return send_file(result_path, as_attachment=True)
