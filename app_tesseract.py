import uuid, os
from PIL import Image
import pytesseract
from flask import send_file, request, Blueprint, render_template
from util import unique_name_path

app_tesseract = Blueprint('app_tesseract','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

@app_tesseract.route("/image-to-text", methods=["GET","POST"])
def image_to_text_conversion():
    if request.method == "GET":
        return render_template('convert.html', title="Image to Text", js_param='imgToText', js_file='js/Controller.js', multiple='')
    else:
        f = request.files["file0"]
        path = unique_name_path(f.filename)
        f.save(path)
        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".txt")
        result_file = open(result_path, "w")
        try:
            #pytesseract.pytesseract.tesseract_cmd = (
            #    r"C:\Program Files\Tesseract-OCR\tesseract"
            #)
            img = Image.open(path)
            txt = pytesseract.image_to_string(img, timeout=20)
            result_file.write(txt)
            result_file.close()
        except RuntimeError as timeout_error:
            result_file.write("error")
            result_file.close()

        return send_file(result_path, as_attachment=True)
