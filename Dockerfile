FROM ubuntu:20.04

RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    python3 \
    python3-pip \
    tesseract-ocr \
    tesseract-ocr-all

RUN pip install pillow

RUN pip install pytesseract

COPY . /app
WORKDIR /app

RUN pip --disable-pip-version-check \
    --no-cache-dir \
    install -r requirements.txt



CMD [ "python3", "app.py"]