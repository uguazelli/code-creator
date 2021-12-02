import os, time
from flask import Flask
from flask_cors import CORS
from pdf import pdf
from tesseract import tesseract
from excel import excel

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

app = Flask(__name__)
app.register_blueprint(excel)
app.register_blueprint(pdf)
app.register_blueprint(tesseract)

cors = CORS(app)


@app.before_request
def clean_temp():
    now = time.time()
    for filename in os.listdir(TEMP_DIR):
        filestamp = os.stat(os.path.join(TEMP_DIR, filename)).st_mtime
        filecompare = now - 60
        if filestamp < filecompare:
            os.remove(os.path.join(TEMP_DIR, filename))


if __name__ == "__main__":
    app.run(threaded=True)
