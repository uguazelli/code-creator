from flask import Flask, request, send_file
from flask_cors import CORS, cross_origin
from spreadsheet import (
    csv_to_excel_conversion,
    excel_to_csv_conversion,
    excel_to_json_conversion,
    json_to_spreadsheet,
)
import json

app = Flask(__name__)

cors = CORS(app)


@app.route("/excel-to-json", methods=["POST"])
def excel_to_json():
    return excel_to_json_conversion(request.files["file"])


@app.route("/excel-to-csv", methods=["POST"])
def excel_to_csv():
    return excel_to_csv_conversion(request)


@app.route("/csv-to-excel", methods=["POST"])
def csv_to_excel():
    return csv_to_excel_conversion(request)


# TODO imrprove result
@app.route("/json-to-excel", methods=["POST"])
def json_to_excel():
    req = request.get_json()
    obj = json.loads(req)
    return send_file(
        json_to_spreadsheet(obj),
        attachment_filename="result.xlsx",
        as_attachment=True,
    )


if __name__ == "__main__":
    app.run(threaded=True)
