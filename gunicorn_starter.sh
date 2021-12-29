#!/bin/sh
gunicorn --pid gunicorn.pid --access-logfile logs.log --workers=2 --threads 2 -b 0.0.0.0:8080 --reload app:app