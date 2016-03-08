import request from 'superagent';
import {api} from 'app/common/services';
import {authHeader} from './services';


export default class SessionRemoteAPI {
  create(username, password) {
    return new Promise((resolve, reject) => {
      request
        .post(api('/session'))
        .send({username, password})
        .end((err, res) => err ? reject(err) : resolve(res.body));
    });
  }

  get() {
    return new Promise((resolve, reject) => {
      request
        .get(api('/session'))
        .set('Authorization', authHeader())
        .end((err, res) => err ?
          (console.error(err) || reject(err)) : resolve(res.body));
    });
  }
}
