FROM ubuntu:20.04

WORKDIR /app

RUN apt-get update && \
    apt-get -y install --no-install-recommends \
    python3 \
    python3-pip

EXPOSE 8080

#COPY requirements.txt requirements.txt
COPY . .

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt
#RUN pip install easyocr

#CMD [ "python3", "app.py"]

# docker run -d -p 8080:8080 d025c8a93181 python3 app.py