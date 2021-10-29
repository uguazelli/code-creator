from flask import Flask, request
from flask_cors import CORS
from spreadsheet import spreadsheet_to_json


ALLOWED_EXTENSIONS = {"xlsx", "xls"}

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/", methods=["GET", "POST"])
def upload_file():
    if request.method == "POST":
        print(request.files["file"])
        f = request.files["file"]
        if allowed_file(f.filename):
            try:
                return spreadsheet_to_json(f)
            except:
                return "unknow error, verify your file and try again"
        else:
            return "invalid file"


@app.route("/export", methods=["GET"])
def export_records():
    return


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


if __name__ == "__main__":
    app.run(threaded=True)
