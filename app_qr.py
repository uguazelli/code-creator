
import qrcode
import uuid, os
from flask import send_file, request, Blueprint, render_template
from PIL import Image
<<<<<<< HEAD
from amzqr import amzqr
from util import unique_name_path
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer, GappedSquareModuleDrawer, HorizontalBarsDrawer, RoundedModuleDrawer, SquareModuleDrawer, VerticalBarsDrawer
from qrcode.image.styles.colormasks import RadialGradiantColorMask
=======
from util import unique_name_path
>>>>>>> add6da9d6158a5fb046e16b4aebbef9cf2a2d0c1

app_qr = Blueprint('app_qr','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

<<<<<<< HEAD

@app_qr.route("/qr-code", methods=["GET","POST"])
def qr():
    if request.method == "GET":
        return render_template('qr.html', title="QR Code Generator")
    else:
        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".png")

        # taking color name from user
        QRcolor = request.values["frontcolor"]
        QRbackgroundcolor = request.values["backgroudcolor"]

        if len(request.files) != 0:
            QRcode = qrcode.QRCode( version=None, error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=30, border=2 )

            txt = request.values["text"]
            file = request.files["file"]
            logo = Image.open(file)


            # taking base width
            basewidth = 100
            # adjust image size
            wpercent = (basewidth/float(logo.size[0]))
            hsize = int((float(logo.size[1])*float(wpercent)))
            logo = logo.resize((basewidth, hsize), Image.ANTIALIAS)
            # addingg URL or text to QRcode
            QRcode.add_data(txt)
            # generating QR code
            QRcode.make(fit=True)
            # adding color to QR code
            QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor).convert('RGB')
            # set size of QR code
            pos = ((QRimg.size[0] - logo.size[0]) // 2,
                (QRimg.size[1] - logo.size[1]) // 2)
            QRimg.paste(logo, pos)


        else:
            txt = request.values["text"]
            module = request.values["module"]
            QRcode = qrcode.QRCode( version=None, error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=30, border=2 )
            QRcode.add_data(txt)
            QRcode.make(fit=True)

            #IMAGE
            #QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, embeded_image_path="i.png").convert('RGB')

            if module == "squaremodule":
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=SquareModuleDrawer()).convert('RGB')
            elif module == "gappedmodule":
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=GappedSquareModuleDrawer()).convert('RGB')
            elif module == "circlemodule":
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=CircleModuleDrawer()).convert('RGB')
            elif module == "roundedmodule":
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=RoundedModuleDrawer()).convert('RGB')
            elif module == "verticalbarmodule":
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=VerticalBarsDrawer()).convert('RGB')
            elif module == "horizontalbarmodule":
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=HorizontalBarsDrawer()).convert('RGB')
            else:
                QRimg = QRcode.make_image(fill_color=QRcolor, back_color=QRbackgroundcolor, image_factory=StyledPilImage, module_drawer=SquareModuleDrawer()).convert('RGB')


        QRimg.save(result_path)
        return send_file(result_path, as_attachment=True)


@app_qr.route("/qr-code", methods=["GET","POST"])
def qr_code():
    if request.method == "GET":
        return render_template('qr-code.html', title="QR Code Generator")
    else:
        text = request.values['text']
        f = request.files["file"]
        path = unique_name_path(f.filename)
        f.save(path)

        version, level, qr_name = amzqr.run(
        text,
        version=1,
        level='H',
        picture=path,
        colorized=True,
        contrast=1.0,
        brightness=1.0,
        save_name="result.png",
        save_dir=os.getcwd()
    )
=======
@app_qr.route("/qr-generator", methods=["GET","POST"])
def image_to_text_conversion():
    if request.method == "GET":
        return render_template('qr-generator.html', title="QR Code Generator", js_param='qrGenerator', js_file='js/Controller.js', multiple='')
    else:
        txt = request.values["text"]
        file = request.files["file0"]
        logo = Image.open(file)
        # taking base width
        basewidth = 100
        # adjust image size
        wpercent = (basewidth/float(logo.size[0]))
        hsize = int((float(logo.size[1])*float(wpercent)))
        logo = logo.resize((basewidth, hsize), Image.ANTIALIAS)
        QRcode = qrcode.QRCode(
            error_correction=qrcode.constants.ERROR_CORRECT_H
        )
        # addingg URL or text to QRcode
        QRcode.add_data(txt)
        # generating QR code
        QRcode.make()
        # taking color name from user
        QRcolor = 'Green'
        # adding color to QR code
        QRimg = QRcode.make_image(fill_color=QRcolor, back_color="white").convert('RGB')
        # set size of QR code
        pos = ((QRimg.size[0] - logo.size[0]) // 2,
            (QRimg.size[1] - logo.size[1]) // 2)
        QRimg.paste(logo, pos)
        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".png")
        QRimg.save(result_path)
        return send_file(result_path, as_attachment=True)
>>>>>>> add6da9d6158a5fb046e16b4aebbef9cf2a2d0c1
