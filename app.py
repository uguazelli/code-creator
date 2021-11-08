import os, time, json
from flask import Flask, request, send_file
from flask_cors import CORS, cross_origin
from pdf import *
from tesseract import image_to_text_conversion
from spreadsheet import *

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

app = Flask(__name__)

cors = CORS(app)


@app.before_request
def clean_temp():
    now = time.time()
    for filename in os.listdir(TEMP_DIR):
        filestamp = os.stat(os.path.join(TEMP_DIR, filename)).st_mtime
        filecompare = now - 60
        if filestamp < filecompare:
            os.remove(os.path.join(TEMP_DIR, filename))


@app.route("/excel-to-json", methods=["POST"])
def excel_to_json():
    return excel_to_json_conversion(request)


@app.route("/excel-to-csv", methods=["POST"])
def excel_to_csv():
    return excel_to_csv_conversion(request)


@app.route("/csv-to-excel", methods=["POST"])
def csv_to_excel():
    return csv_to_excel_conversion(request)


@app.route("/image-to-text", methods=["POST"])
def image_to_text():
    return image_to_text_conversion(request)


@app.route("/pdf-split", methods=["POST"])
def pdf_split():
    return split_pdf_helper(request)


@app.route("/pdf-join", methods=["POST"])
def pdf_join():
    return join_pdf_helper(request)


# TODO imrprove result
@app.route("/json-to-excel", methods=["POST"])
def json_to_excel():
    return json_to_excel_conversion(request)


if __name__ == "__main__":
    app.run(threaded=True)
