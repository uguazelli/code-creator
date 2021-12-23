
import qrcode
import uuid, os
from flask import send_file, request, Blueprint, render_template
from PIL import Image
from amzqr import amzqr
from util import unique_name_path
import logging
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer, GappedSquareModuleDrawer, HorizontalBarsDrawer, RoundedModuleDrawer, SquareModuleDrawer, VerticalBarsDrawer
from qrcode.image.styles.colormasks import HorizontalGradiantColorMask, ImageColorMask, RadialGradiantColorMask, SolidFillColorMask, SquareGradiantColorMask, VerticalGradiantColorMask

app_qr = Blueprint('app_qr','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


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


        QRcode = qrcode.QRCode( version=None, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=100, border=2 )
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

        if modulemask == "solidfill":
            mdmask = SolidFillColorMask()
        elif modulemask == "radialgradiant":
            mdmask = RadialGradiantColorMask()
        elif modulemask == "squaregradiant":
            mdmask = SquareGradiantColorMask()
        elif modulemask == "horizontalgradiant":
            mdmask = HorizontalGradiantColorMask()
        elif modulemask == "verticalgradiant":
            mdmask = VerticalGradiantColorMask()
        elif modulemask == "imagecolor":
            mdmask = ImageColorMask()
        else:
            mdmask = SolidFillColorMask()


        QRimg = QRcode.make_image(
            fill_color=QRcolor,
            back_color=QRbackgroundcolor,
            image_factory=StyledPilImage,
            embeded_image_path=logo,
            module_drawer=md,
            color_mask=mdmask
            ).convert('RGB')

        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".png")
        QRimg.save(result_path)
        return send_file(result_path, as_attachment=True)


#@app_qr.route("/qr-code", methods=["GET","POST"])
#def qr_code():
#    if request.method == "GET":
#        return render_template('qr-code.html', title="QR Code Generator")
#    else:
#        text = request.values['text']
#        f = request.files["file"]
#        path = unique_name_path(f.filename)
#        f.save(path)
#
#        version, level, qr_name = amzqr.run(
#        text,
#        version=1,
#        level='H',
#        picture=path,
#        colorized=True,
#        contrast=1.0,
#        brightness=1.0,
#        save_name="result.png",
#        save_dir=os.getcwd()
#    )
#