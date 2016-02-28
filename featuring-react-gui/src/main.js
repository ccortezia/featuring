import './main.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Modal from 'react-modal';
import store from 'app/root/store';
import router from 'app/root/router';

const root = document.getElementById('root');

Modal.setAppElement(root);

ReactDOM.render(
  <Provider store={store}>
    <div>{router}</div>
  </Provider>,
  root
);
