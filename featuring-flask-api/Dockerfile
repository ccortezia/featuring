FROM python:2.7
ENV PYTHONUNBUFFERED 1
RUN mkdir -p /code
WORKDIR /code
ADD requirements.txt requirements.txt
ADD requirements.dev.txt requirements.dev.txt
RUN pip install -r requirements.dev.txt
EXPOSE 8090
CMD scripts/gunicorn-runner
