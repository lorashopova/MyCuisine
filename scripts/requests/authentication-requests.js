import toastr from 'toastr';
import {
    requester
} from 'requester';

class UserModel {

    changeAuthState(userInfo) {
        return firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                const email = user.email;
                const uid = user.uid;
                localStorage.setItem('email', email);
                localStorage.setItem('id', uid);
                $('#login').addClass('hidden');
                $('#logout').removeClass('hidden');
            } else {
                localStorage.removeItem('email');
                localStorage.removeItem('id');
                $('#logout').addClass('hidden');
                $('#login').removeClass('hidden');
            }
        });
    }

    login(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    register(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    logout() {
        return firebase.auth().signOut();
    }
}

const userModel = new UserModel();

export {
    userModel
};