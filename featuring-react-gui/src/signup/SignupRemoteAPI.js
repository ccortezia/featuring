import request from 'superagent';
import {api} from 'app/common/services';


export default class SignupRemoteAPI {
  create(data) {
    return new Promise((resolve, reject) => {
      request
        .post(api('/signup'))
        .send(data)
        .end((err, res) => err ? reject({err, body: res.body}) : resolve(res.body));
    });
  }

  get(uid) {
    return new Promise((resolve, reject) => {
      request
        .get(api(`/signup/${uid}`))
        .end((err, res) => err ? reject({err, body: res.body}) : resolve(res.body));
    });
  }

  finish(uid, password) {
    return new Promise((resolve, reject) => {
      request
        .post(api(`/signup/${uid}`))
        .send({password})
        .end((err, res) => err ? reject({err, body: res.body}) : resolve(res.body));
    });
  }
}
