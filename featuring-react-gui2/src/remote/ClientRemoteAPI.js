import {apiRequest} from './common';


export default class ClientRemoteAPI {
    list() {
        return apiRequest('get', '/clients').then(data => data.map(inboundAdapter));
    }
}

function inboundAdapter(obj) {
    return {
        clientId: obj.client_id,
        clientName: obj.client_name,
    }
}
