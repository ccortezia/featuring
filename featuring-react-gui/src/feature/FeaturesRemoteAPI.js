import moment from 'moment';
import request from 'superagent';
import {api} from 'app/common/services';


export default class FeaturesRemoteAPI {

  create(obj) {
    return new Promise((resolve, reject) => {
      return request
        .post(api('/features'))
        .send(adaptOut(obj))
        .end((err, res) => err ? reject(err) : resolve((res.body && adaptIn(res.body))));
    });
  }

  list() {
    return new Promise((resolve, reject) => {
      return request
        .get(api('/features'))
        .end((err, res) => err ? reject(err) : resolve((res.body && res.body.map(adaptIn)) || []));
    });
  }

  update(id, nobj) {
    return new Promise((resolve, reject) => {
      return request
        .patch(api(`/features/${id}`))
        .send(adaptOut(nobj))
        .end((err, res) => err ? reject(err) : resolve((res.body && adaptIn(res.body))));
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
      return request
        .delete(api(`/features/${id}`))
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
    deadline: moment(item.deadline).toISOString(),
    ticket_url: item.ticketUrl,
    product_area: item.area
  }, _.negate(_.isUndefined));
}
