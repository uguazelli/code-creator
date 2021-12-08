
import qrcode
import uuid, os
from flask import send_file, request, Blueprint, render_template
from PIL import Image
from util import unique_name_path

app_qr = Blueprint('app_qr','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

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
