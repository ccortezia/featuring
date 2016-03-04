featuring-react-gui
====================

A react implementation of the frontend for the feature request web app.


## Development

### Preparing to run locally

- Make sure you have node 4.x available in your $PATH
- Make sure you have npm 3.x available in your $PATH
- Run ```cd $ROOT && npm install```

Where $ROOT is the root directory of this component.

### Running in devel mode

```
cd $ROOT
npm start
```

A static content server should be availble under http://localhost:8080.

### Contributing

Make sure you send related tests along with any improvement submited.

To run the tests:

```
cd $ROOT

# only once
npm test

# continuous mode
npm run test:live
```
