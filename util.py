import uuid
import os
from pathlib import Path

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


def unique_name_path(filename):
    filename = os.path.join(PROJECT_ROOT, TEMP_DIR, filename)
    return filename


def generate_in_memory(path):
    with open(path) as f:
        yield from f
    os.remove(path)
