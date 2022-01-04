from io import BytesIO
import uuid, os, qrcode
from django.http import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from . util import TEMP_DIR, color_qr_code
from qrcode.image.styledpil import StyledPilImage
from qrcode.image.styles.moduledrawers import CircleModuleDrawer, GappedSquareModuleDrawer, HorizontalBarsDrawer, RoundedModuleDrawer, SquareModuleDrawer, VerticalBarsDrawer
from PIL import Image
from django.core.files.storage import FileSystemStorage

# Create your views here.

@csrf_exempt
def generate_qr_code(request):

    if request.method == "GET":
        context = {"title": "QR TRON"}
        return render(request, 'qrcode.html', context)
    else:
        # POST Values
        if len(request.FILES) != 0:
            file = request.FILES["file"]
            #logo = Image.open(file)
            fs = FileSystemStorage()
            filename = fs.save(file.name, file)
            logo = fs.url(filename)
        else:
            logo = None
        txt = request.POST["text"]
        QRcolor = request.POST["frontcolor"]
        QRbackgroundcolor = request.POST["backgroudcolor"]

        image_data = color_qr_code(txt, logo, QRcolor, QRbackgroundcolor)
        return HttpResponse(image_data, content_type="image/png")







@csrf_exempt
def generate_qr_code2(request):

    if request.method == "GET":
        context = {"title": "QR TRON"}
        return render(request, 'qrcode.html', context)
    else:
        # POST Values
        if len(request.FILES) != 0:
            file = request.FILES["file"]
            logo = Image.open(file)
        else:
            logo = None

        txt = request.POST["text"]
        module = request.POST["module"]
        QRcolor = request.POST["frontcolor"]
        QRbackgroundcolor = request.POST["backgroudcolor"]

        # QRCODE SETTINGS
        QRcode = qrcode.QRCode(
            version=None,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=100,
            border=2
            )
        QRcode.add_data(txt)
        QRcode.make(fit=True)

        # QR DOTS STYLE
        if module == "squaremodule":
            md = SquareModuleDrawer()
        elif module == "gappedmodule":
            md = GappedSquareModuleDrawer()
        elif module == "circlemodule":
            md = CircleModuleDrawer()
        elif module == "roundedmodule":
            md = RoundedModuleDrawer()
        elif module == "verticalbarmodule":
            md = VerticalBarsDrawer()
        elif module == "horizontalbarmodule":
            md = HorizontalBarsDrawer()
        else:
            md = SquareModuleDrawer()

        # COLORS ONLY WORK WITH squaremodule
        if (module != "squaremodule"):
            image_factory = StyledPilImage
        else:
            image_factory = None


        i =  os.path.join(os.path.dirname(os.path.dirname(__file__)),'qb_code_generator','i.png')
        logo = Image.open(i)

        # CREATE IMAGE
        QRimg = QRcode.make_image(
            fill_color=QRcolor,
            back_color=QRbackgroundcolor,
            image_factory=image_factory,
            embeded_image_path=logo,
            module_drawer=md
            ).convert('RGB')

        # CREATE IN MEMORY FILE
        temp = BytesIO()
        QRimg.save(temp, format="png")
        image_data = temp.getvalue()

        return HttpResponse(image_data, content_type="image/png")













