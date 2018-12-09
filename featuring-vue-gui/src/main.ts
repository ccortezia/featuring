import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// Bootstrap -------------------------------------------------------

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);

// Font-Awesome ----------------------------------------------------

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
/* tslint:disable:no-var-requires */
const fontawesome = require('@fortawesome/vue-fontawesome');

library.add(faSpinner);

Vue.component('font-awesome-icon', fontawesome.FontAwesomeIcon);

// -----------------------------------------------------------------

Vue.config.productionTip = false;

window.vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
