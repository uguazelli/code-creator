import uuid, os
from flask import send_file, request, Blueprint, render_template
from util import unique_name_path
import easyocr

app_ocr = Blueprint('app_ocr','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

@app_ocr.route("/image-to-text", methods=["GET","POST"])
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
            #pytesseract.pytesseract.tesseract_cmd = (r"C:\Program Files\Tesseract-OCR\tesseract")
            #image = Image.open(path)
            #text = pytesseract.image_to_string(image, timeout=20)
#
            reader = easyocr.Reader(['en'])
            text = reader.readtext(path)

            result = ''
            for (bbox, text, prob) in text:
                result = result + text + '\n'


            result_file.write(result)
            result_file.close()
        except RuntimeError as timeout_error:
            result_file.write("error")
            result_file.close()

        return send_file(result_path, as_attachment=True)
