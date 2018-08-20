featuring-deploy
=================

This component is resposible to deploy its sibblings. Currently it statically deploy the flask api and the react gui, but it should be flexible enough in the future to deploy different combinations of backend and fronted components as they are created.

## Requirements

- Make sure you have [fab (1.x)](http://www.fabfile.org/) available in your $PATH.
- Make sure you have [npm](https://www.npmjs.com/) available in your $PATH.
- Make sure your target server has Ubuntu 14.x LTS properly installed.

## Note

This component hasn't been upgraded to work with Python 3.x, so at least for now make sure you work out of a Python 2.7 virtualenv.
