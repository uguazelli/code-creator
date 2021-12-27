import os, time, logging
from waitress import serve
from flask import Flask, render_template
from flask_cors import CORS
from app_qr import app_qr
from flask_socketio import SocketIO, send, emit, join_room, leave_room

#from app_pdf import app_pdf
#from app_ocr import app_ocr
#from app_excel import app_excel

logging.basicConfig(
                    level = logging.INFO,
                    format = '%(asctime)s (%(levelname)s) %(filename)s:%(funcName)s => %(message)s',
                    handlers=[
                        logging.FileHandler("logs.log"),
                        logging.StreamHandler()
                        ]
                    )

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

app = Flask(__name__)
#app.register_blueprint(app_excel)
#app.register_blueprint(app_pdf)
#app.register_blueprint(app_ocr)
app.register_blueprint(app_qr)

cors = CORS(app)

@app.before_request
def clean_temp():
    now = time.time()
    for filename in os.listdir(TEMP_DIR):
        filestamp = os.stat(os.path.join(TEMP_DIR, filename)).st_mtime
        filecompare = now - 10
        if filestamp < filecompare:
            os.remove(os.path.join(TEMP_DIR, filename))


## Socket IO

socketio = SocketIO(app)

@socketio.on('notify')
def notify(msg, room):
    logging.info(f'Sendinf number {msg} to room {room}')
    emit('notify', msg, to=room)


@socketio.on('join')
def on_join(data):
    room = data['room']
    logging.info(f'Joining room {room}')
    join_room(room)


@socketio.on('leave')
def on_leave(data):
    room = data['room']
    logging.info(f'Leaving room {room}')
    leave_room(room)



if __name__ == "__main__":
    #app.run(host='0.0.0.0', port=8080, debug=True)
    #serve(app, host='0.0.0.0', port=8080, threads= 8)
    socketio.run(app, port=8080)