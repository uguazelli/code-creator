import uuid
import os
from pathlib import Path

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")

ALLOWED_EXTENSIONS = {"xlsx", "xls"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def unique_name(filename):
    unique_name = str(uuid.uuid1())
    unique_name += "."
    unique_name += filename.split(".")[-1].lower()
    filename = os.path.join(PROJECT_ROOT, TEMP_DIR, unique_name)
    return filename


def generate_in_memory(path):
    with open(path) as f:
        yield from f

    os.remove(path)
