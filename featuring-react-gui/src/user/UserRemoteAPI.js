import moment from 'moment';
import request from 'superagent';
import {api} from 'app/common/services';
import {authHeader} from 'app/session/services';


export default class UsersRemoteAPI {

  create(obj) {
    return new Promise((resolve, reject) => {
      return reject('not-implemented');
    });
  }

  get(username) {
    return new Promise((resolve, reject) => {
      return request
        .get(api(`/users/${username}`))
        .set('Authorization', authHeader())
        .end((err, res) => err ? reject(err) : resolve(res.body && adaptIn(res.body)));
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      return reject('not-implemented');
    });
  }

  update(id, nobj) {
    return new Promise((resolve, reject) => {
      return request
        .patch(api(`/users/${id}`))
        .set('Authorization', authHeader())
        .send(adaptOut(nobj))
        .end((err, res) => err ? reject(err) : resolve((res.body && adaptIn(res.body))));
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
      return reject('not-implemented');
    });
  }
}


function adaptIn(item) {
  return {
    username: item.username,
    fullname: item.fullname,
  };
}


function adaptOut(item) {
  return _.pickBy({
    username: item.username,
    fullname: item.fullname,
    password: item.password,
  }, _.negate(_.isUndefined));
}
