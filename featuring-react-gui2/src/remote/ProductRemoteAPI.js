import {apiRequest} from './common';


export default class ProductRemoteAPI {
    list() {
        return apiRequest('get', '/products').then(data => data.map(inboundAdapter));
    }
}

function inboundAdapter(obj) {
    return {
        productId: obj.product_id,
        productName: obj.product_name,
    }
}
