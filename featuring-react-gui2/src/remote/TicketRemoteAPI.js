import moment from 'moment';
import {
    apiRequest
} from './common';


export default class TicketRemoteAPI {
    create({title, description, clientId, productId, deadline}) {
        return apiRequest('post', `/tickets`, outboundAdapter({title, description, clientId, productId, deadline}))
            .then(inboundAdapter);
    }

    list() {
        return apiRequest('get', '/tickets')
            .then(data => data.map(inboundAdapter));
    }

    get(ticketId) {
        return apiRequest('get', `/tickets/${ticketId}`);
    }

    update(ticketId, {title, description, clientId, productId, deadline}) {
        return apiRequest('put', `/tickets/${ticketId}`, outboundAdapter({ticketId, title, description, clientId, productId, deadline}))
            .then(inboundAdapter);
    }

    delete(ticketId) {
        return apiRequest('delete', `/tickets/${ticketId}`);
    }
}


function outboundAdapter(obj) {
    return {
        ticket_id: obj.ticketId,
        title: obj.title,
        description: obj.description,
        client_id: obj.clientId,
        product_id: obj.productId,
        deadline: obj.deadline.format('YYYY-MM-DD')
    }
}

function inboundAdapter(obj) {
    return {
        ticketId: obj.ticket_id,
        title: obj.title,
        description: obj.description,
        clientId: obj.client_id,
        productId: obj.product_id,
        deadline: moment(obj.deadline, 'YYYY-MM-DD')
    }
}
