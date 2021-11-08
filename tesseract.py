from PIL import Image
import pytesseract
from flask import send_file
from util import unique_name_path


def image_to_text_conversion(request):

    f = request.files["file0"]
    path = unique_name_path(f.filename)
    f.save(path)
    result_file = open("result.txt", "w")
    try:
        pytesseract.pytesseract.tesseract_cmd = (
            r"C:\Program Files\Tesseract-OCR\tesseract"
        )
        img = Image.open(path)
        txt = pytesseract.image_to_string(img, timeout=2)
        result_file.write(txt)
        result_file.close()
    except RuntimeError as timeout_error:
        result_file.write("error")
        result_file.close()

    return send_file(
        "result.txt",
        as_attachment=True,
    )
