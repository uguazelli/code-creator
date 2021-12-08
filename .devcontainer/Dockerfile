FROM ubuntu:20.04

RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    python3 \
    python3-pip \
    tesseract-ocr \
    tesseract-ocr-all

RUN pip install pillow

RUN pip install pytesseract

COPY requirements.txt /tmp/

RUN pip --disable-pip-version-check \
    --no-cache-dir \
    install -r /tmp/requirements.txt

RUN rm -r -f /tmp/*

