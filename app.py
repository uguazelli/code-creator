import os, time
from waitress import serve
from flask import Flask, render_template
from flask_cors import CORS
from app_pdf import app_pdf
#from app_ocr import app_ocr
from app_excel import app_excel
from app_qr import app_qr


PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

app = Flask(__name__)
app.register_blueprint(app_excel)
app.register_blueprint(app_pdf)
#app.register_blueprint(app_ocr)
app.register_blueprint(app_qr)

cors = CORS(app)

@app.before_request
def clean_temp():
    now = time.time()
    for filename in os.listdir(TEMP_DIR):
        filestamp = os.stat(os.path.join(TEMP_DIR, filename)).st_mtime
        filecompare = now - 60
        if filestamp < filecompare:
            os.remove(os.path.join(TEMP_DIR, filename))

@app.route("/")
def test():
    return render_template('index.html')


if __name__ == "__main__":
    #app.run(host='0.0.0.0', port=8080, debug=True)
    serve(app, host='0.0.0.0', port=8080)
