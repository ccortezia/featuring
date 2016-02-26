import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from 'app/root/store';
import router from 'app/root/router';


ReactDOM.render(
  <Provider store={store}>
    <div>{router}</div>
  </Provider>,
  document.getElementById('root')
);
