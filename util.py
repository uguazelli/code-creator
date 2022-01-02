import uuid, os, constants, sqlite3, logging
from functools import wraps
from flask import session, redirect

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


def unique_name_path(filename):
    filename = os.path.join(PROJECT_ROOT, TEMP_DIR, filename)
    return filename


def generate_in_memory(path):
    with open(path) as f:
        yield from f
    os.remove(path)


def query_select(query, values):
    try:
        conn = sqlite3.connect(constants.db)
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(query, values)
        rows = cur.fetchall()
        unpacked = [{k: item[k] for k in item.keys()} for item in rows]
        conn.close()
        return unpacked
    except Exception as e:
        logging.info(f'Fail to Select values {e}')
        return -1


def query_exec(query, values):
    try:
        conn = sqlite3.connect(constants.db)
        cur = conn.cursor()
        cur.execute(query, values)
        conn.commit()
        conn.close()
        return cur.lastrowid
    except Exception as e:
        logging.info(f'Fail to insert into DB {e}')
        return -1


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get('email') is None:
            return redirect('/qr-code/login')
        return f(*args, **kwargs)
    return decorated_function