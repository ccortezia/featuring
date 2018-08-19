import {apiRequest} from './common';


export default class SessionRemoteAPI {
  create(username, password) {
    return apiRequest('post', '/session', {username, password});
  }

  get() {
    return apiRequest('get', '/session');
  }
}
