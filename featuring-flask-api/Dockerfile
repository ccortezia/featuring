FROM python:3.7
ENV PYTHONUNBUFFERED 1
ADD requirements.txt requirements.txt
RUN pip3 install -r requirements.txt && rm requirements.txt
EXPOSE 8090
RUN mkdir -p /code
WORKDIR /code
CMD flask run --host=0.0.0.0
