import uuid

from flask.helpers import send_file
from util import unique_name_path
from PyPDF2 import PdfFileWriter, PdfFileReader, PdfFileMerger
import os
from zipfile import ZipFile

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


def split_pdf_helper(request):
    f = request.files["file0"]
    path = unique_name_path(f.filename)
    f.save(path)

    input_pdf = PdfFileReader(path)

    number_of_pages = int(input_pdf.getNumPages())
    files = []
    # PDFs
    for index in range(number_of_pages):
        output = PdfFileWriter()
        output.addPage(input_pdf.getPage(index))
        file_name = os.path.join(TEMP_DIR, "page_" + str(index) + ".pdf")
        with open(file_name, "wb") as output_stream:
            output.write(output_stream)
        files.append(file_name)
    # Create ZIP
    zip_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".zip")
    zipObj = ZipFile(zip_path, "w")
    for index, pdf_path in enumerate(files):
        zipObj.write(pdf_path, "page_" + str(index) + ".pdf")
        os.remove(pdf_path)

    zipObj.close()

    return send_file(zip_path, as_attachment=True)


def join_pdf_helper(request):
    output = PdfFileMerger()
    number_of_pages = len(request.files)
    for index in range(number_of_pages):
        f = request.files["file" + str(index)]
        path = unique_name_path(f.filename)
        f.save(path)
        input_pdf = PdfFileReader(path)
        output.append(input_pdf)

    joined_pdf = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".pdf")
    with open(joined_pdf, "wb") as output_stream:
        output.write(output_stream)

    return send_file(joined_pdf, as_attachment=True)
