/*eslint no-unused-vars:0*/
import _ from 'lodash';
import request from 'superagent';
import {api} from 'app/common/services';
import {authHeader} from 'app/session/services';


export default class FeaturesRemoteAPI {

  create(obj) {
    return new Promise((resolve, reject) => {
      return request
        .post(api('/features'))
        .set('Authorization', authHeader())
        .send(adaptOut(obj))
        .end((err, res) => err ? reject(err) : resolve((res.body && adaptIn(res.body))));
    });
  }

  get(id) {
    return new Promise((resolve, reject) => {
      return request
        .get(api(`/features/${id}`))
        .set('Authorization', authHeader())
        .end((err, res) => err ? reject(err) : resolve(adaptIn(res.body)));
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      return request
        .get(api('/features'))
        .set('Authorization', authHeader())
        .end((err, res) => err ? reject(err) : resolve((res.body && res.body.map(adaptIn)) || []));
    });
  }

  update(id, nobj) {
    return new Promise((resolve, reject) => {
      return request
        .patch(api(`/features/${id}`))
        .set('Authorization', authHeader())
        .send(adaptOut(nobj))
        .end((err, res) => err ? reject(err) : resolve((res.body && adaptIn(res.body))));
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
      return request
        .delete(api(`/features/${id}`))
        .set('Authorization', authHeader())
        .end((err, res) => err ? reject(err) : resolve());
    });
  }
}


function adaptIn(item) {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    clientId: item.client,
    priority: item.priority,
    deadline: item.deadline,
    ticketUrl: item.ticket_url,
    area: item.product_area
  };
}


function adaptOut(item) {
  return _.pickBy({
    id: item.id,
    title: item.title,
    description: item.description,
    client: item.clientId,
    priority: item.priority,
    deadline: item.deadline,
    ticket_url: item.ticketUrl,
    product_area: item.area
  }, _.negate(_.isUndefined));
}
