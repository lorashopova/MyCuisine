import toastr from 'toastr';
import {
    requester
} from 'requester';

class AppModel {
    isAuthed() {
        return localStorage.getItem('authtoken') !== null;
    }

    getMealByCategory(category) {
        const filter = JSON.stringify({
            "category": category
        });

        return requester.get('appdata', 'meal/?query=' + filter, 'anonymous');
    }

    getMeal() {
        return requester.get('appdata', 'meal', 'anonymous');
    }

    getMealById(id) {
        return requester.get('appdata', 'meal/' + id, 'anonymous');
    }

    getMealByTitle(title) {
        const filter = JSON.stringify({
            "title": {
                "$regex": `^(?i)${title}`
            }
        });

        return requester.get('appdata', 'meal/?query=' + filter, 'anonymous');
    }

    getComments(id) {
        const filter = JSON.stringify({
            "mealId": id
        });
        return requester.get('appdata', 'comments/?query=' + filter, 'anonymous');
    }

    getAllComments(){
        return requester.get('appdata', 'comments', 'anonymous');
    }

    postMessage(name, email, subject, text) {
        return requester.post('appdata', 'messages', 'anonymous', {
            name,
            email,
            subject,
            text
        });
    }

    postComment(comment, date, name, mealId) {
        return requester.post('appdata', 'comments', '', {
            comment,
            date,
            name,
            mealId
        });
    }
}

const appModel = new AppModel();

export {
    appModel
};
