import toastr from 'toastr';
import { requester } from 'requester';

class UserModel {
    isAuthed() {
        return localStorage.getItem('authtoken') !== null;
    }

    saveSession(data) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('name', data.name);
        localStorage.setItem('id', data._id);
        localStorage.setItem('authtoken', data._kmd.authtoken);
    }

    login(username, password) {
        return requester.post('user', 'login', 'basic', { username, password });
    }

    register(name, username, email, password) {
        return requester.post('user', '', 'basic', { name, username, email, password });
    }

    logout() {
        const logoutData = {
            authtoken: localStorage.getItem('authtoken')
        };
        return requester.post('user', '_logout', logoutData);
    }
}

const userModel = new UserModel();

export { userModel };
