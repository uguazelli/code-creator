

import uuid, os, qrcode, logging
from flask import request, Blueprint, send_file, render_template
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer, GappedSquareModuleDrawer, HorizontalBarsDrawer, RoundedModuleDrawer, SquareModuleDrawer, VerticalBarsDrawer

app_qr = Blueprint('app_qr','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


@app_qr.route('/qr-code/admin/room/<string:room>')
def index(room):
    return render_template('admin.html')

@app_qr.route("/qr-client/room/<string:room>", methods=["GET","POST"])
def qr_client(room):
    if request.method == "GET":
        return render_template('qr-client.html')


@app_qr.route("/qr-code", methods=["GET","POST"])
def qr():
    if request.method == "GET":
        logging.info(f'IP: {request.remote_addr} GET /qr-code page')

        return render_template('qr.html', title="QR Code Generator")
    else:
        logging.info(f'IP: {request.remote_addr} POST /qr-code page')

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

        #color mask
        #if modulemask == "solidfill":
        #    mdmask = SolidFillColorMask()
        #elif modulemask == "radialgradiant":
        #    mdmask = RadialGradiantColorMask()
        #elif modulemask == "squaregradiant":
        #    mdmask = SquareGradiantColorMask()
        #elif modulemask == "horizontalgradiant":
        #    mdmask = HorizontalGradiantColorMask()
        #elif modulemask == "verticalgradiant":
        #    mdmask = VerticalGradiantColorMask()
        #elif modulemask == "imagecolor":
        #    mdmask = ImageColorMask()
        #else:
        #    mdmask = SolidFillColorMask()


        if (module != "squaremodule"):
            image_factory = StyledPilImage
        else:
            image_factory = None

        QRimg = QRcode.make_image(
            fill_color=QRcolor,
            back_color=QRbackgroundcolor,
            image_factory=image_factory,
            embeded_image_path=logo,
            module_drawer=md,
            #color_mask=mdmask
            ).convert('RGB')

        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".png")
        QRimg.save(result_path)

        return send_file(result_path, as_attachment=True)


