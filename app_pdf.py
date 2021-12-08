import uuid, os
from flask import Blueprint, request, render_template
from flask.helpers import send_file
from util import unique_name_path
from PyPDF2 import PdfFileWriter, PdfFileReader, PdfFileMerger
from zipfile import ZipFile
from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

app_pdf = Blueprint('app_pdf','__name__')

PROJECT_ROOT = os.path.dirname(__file__)
TEMP_DIR = os.path.join(PROJECT_ROOT, "tmp")


@app_pdf.route("/pdf-split", methods=["GET","POST"])
def split_pdf_helper():
    if request.method == "GET":
        return render_template('convert.html', title="Split PDF", js_param='pdfSplit', js_file='js/Controller.js', multiple='')
    else:
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


@app_pdf.route("/pdf-join", methods=["GET","POST"])
def join_pdf_helper():
    if request.method == "GET":
        return render_template('convert.html', title="Join PDF", js_param='pdfJoin', js_file='js/Controller.js', multiple='multiple')
    else:
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


@app_pdf.route("/pdf-to-text", methods=["GET","POST"])
def pdf_to_text_helper():
    if request.method == "GET":
        return render_template('convert.html', title="Join PDF", js_param='pdfToText', js_file='js/Controller.js', multiple='')
    else:
        output_string = StringIO()
        f = request.files["file0"]
        path = unique_name_path(f.filename)
        f.save(path)
        with open(path, 'rb') as in_file:
            parser = PDFParser(in_file)
            doc = PDFDocument(parser)
            rsrcmgr = PDFResourceManager()
            device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
            interpreter = PDFPageInterpreter(rsrcmgr, device)
            for page in PDFPage.create_pages(doc):
                interpreter.process_page(page)

        result_path = os.path.join(TEMP_DIR, str(uuid.uuid1()) + ".txt")
        result_file = open(result_path, "w")
        result_file.write(output_string.getvalue())
        result_file.close()

        return send_file(result_path, as_attachment=True)
