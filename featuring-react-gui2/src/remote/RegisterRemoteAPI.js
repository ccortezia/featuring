import {apiRequest} from './common';


export default class RegisterRemoteAPI {
  register(username, fullname, password) {
    return apiRequest('post', '/register', {username, fullname, password});
  }
}
