from io import BytesIO
import uuid, os
import qrcode
from qrcode.image.styles.moduledrawers import SquareModuleDrawer

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


def unique_png_path():
    filename = os.path.join(PROJECT_ROOT, TEMP_DIR, str(uuid.uuid1()) + ".png")
    return filename


def generate_in_memory(path):
    with open(path) as f:
        yield from f
    os.remove(path)


def color_qr_code(txt, logo, fill_color, back_color):
    # QRCODE SETTINGS
    QRcode = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=100,
        border=2
        )
    QRcode.add_data(txt)
    QRcode.make(fit=True)

    # CREATE IMAGE
    QRimg = QRcode.make_image(
        fill_color=fill_color,
        back_color=back_color,
        image_factory=None,
        embeded_image_path="img.png",
        module_drawer=SquareModuleDrawer()
        ).convert('RGB')

    # CREATE IN MEMORY FILE
    temp = BytesIO()
    QRimg.save(temp, format="png")
    return temp.getvalue()
