import 'jquery';
import { kinveyUrls } from 'constants';

function makeAuth(type) {
    if (type === 'basic') {
        return 'Basic ' + btoa(kinveyUrls.appKey + ':' + kinveyUrls.appSecret);
    } else if (type === 'anonymous') {
        return 'Basic ' + btoa(kinveyUrls.appKey + ':' + kinveyUrls.masterKey);
    } else {
        return 'Kinvey ' + localStorage.getItem('authtoken');
    }
        
}

function makeRequest(method, module, endpoint, auth) {
    const request = {
        method,
        url: kinveyUrls.baseUrl + module + '/' + kinveyUrls.appKey + '/' + endpoint,
        headers: {
            'Authorization': makeAuth(auth),
            'Content-Type': 'application/json'
        }
    };

    return request;
}

class Requester {
    get(module, endpoint, auth) {
        return $.ajax(makeRequest('GET', module, endpoint, auth));
    }

    post(module, endpoint, auth, data) {
        const req = makeRequest('POST', module, endpoint, auth);
        req.data = JSON.stringify(data);
        return $.ajax(req);
    }

    update(module, endpoint, auth, data) {
        const req = makeRequest('PUT', module, endpoint, auth);
        req.data = JSON.stringify(data);
        return $.ajax(req);
    }

    remove(module, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', module, endpoint, auth));
    }
}

const requester = new Requester();

export {
    requester
};
