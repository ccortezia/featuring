# featuring

A simple feature request web app _(a.k.a. dev playground)_.

See demo [here](http://167.99.225.192).

## Run it locally

- Follow the instructions inside `./featuring-flask-api`.
- Follow the instructions inside `./featuring-react-gui`.
- Make sure you have both docker and docker-compose properly setup.
- Run ```docker-compose up``` in a terminal.
- Run ```cd featuring-react-gui && npm start``` in another terminal.
- Point your browser to http://localhost:3000 and check it out.

## Deploy to a generic VPS

- Follow the instructions inside `./featuring-deploy`.
- Run ```cd featuring-deploy && fab -H $user@$host```.
