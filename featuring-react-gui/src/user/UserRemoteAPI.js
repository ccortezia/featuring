import moment from 'moment';
import request from 'superagent';
import {api} from 'app/common/services';
import {authHeader} from 'app/session/services';


export default class UsersRemoteAPI {

  create(obj) {
    return new Promise((resolve, reject) => {
      return resolve({});
      // TODO: enable real request.
      // return request
      //   .post(api('/users'))
      //   .set('Authorization', authHeader())
      //   .send(adaptOut(obj))
      //   .end((err, res) => err ? reject(err) : resolve((res.body && adaptIn(res.body))));
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
      // TODO: enable real request.
      // return request
      //   .get(api('/users'))
      //   .set('Authorization', authHeader())
      //   .end((err, res) => err ? reject(err) : resolve((res.body && res.body.map(adaptIn)) || []));
      return resolve([]);
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
      // TODO: enable real request.
      // return request
      //   .delete(api(`/users/${id}`))
      //   .set('Authorization', authHeader())
      //   .end((err, res) => err ? reject(err) : resolve());
      return resolve();
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
