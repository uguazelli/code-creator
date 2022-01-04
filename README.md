# QR 2 GO

docker rmi qr-code gcr.io/uplifted-valor-334401/qr-code
docker build -t qr-code .
docker tag qr-code gcr.io/uplifted-valor-334401/qr-code
docker push gcr.io/uplifted-valor-334401/qr-code