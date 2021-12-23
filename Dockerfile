FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    python3 \
    python3-pip

EXPOSE 8080

<<<<<<< HEAD
=======

>>>>>>> add6da9d6158a5fb046e16b4aebbef9cf2a2d0c1
COPY . .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
#RUN pip install easyocr

CMD [ "python3", "app.py"]