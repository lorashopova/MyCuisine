import toastr from 'toastr';
import {
    requester
} from 'requester';
const URL = firebaseConfig.databaseURL;

class AppModel {
    isAuthed() {
        return localStorage.getItem('id') !== null;
    }
//https://my-cuisine-63b0f.firebaseio.com/meal.json?orderBy="category"&equalTo="Salads"
// const query = events.orderByChild('status').equalTo('ok').limitToFirst(2);
    getMealByCategory(category) {
        return firebase.database().ref().child("meal").orderByChild("category").equalTo(category).once('value')
        .then(function (snapshot) {
            return snapshot.val();
         });
    }

    getMeal() {
        return firebase.database().ref('/meal').once('value')
       .then(function(snapshot) {
            return snapshot.val();
        });
    }

    // getMealById(id) {
    //     return requester.get('appdata', 'meal/' + id);
    // }

    // getMealByTitle(title) {
    //     const filter = JSON.stringify({
    //         "title": {
    //             "$regex": `^(?i)${title}`
    //         }
    //     });

    //     return requester.get('appdata', 'meal/?query=' + filter);
    // }

    // getComments(id) {
    //     const filter = JSON.stringify({
    //         "mealId": id
    //     });
    //     return requester.get('appdata', 'comments/?query=' + filter);
    // }

    // getAllComments(){
    //     return requester.get('appdata', 'comments');
    // }

    // postMessage(name, email, subject, text) {
    //     return requester.post('appdata', 'messages', {
    //         name,
    //         email,
    //         subject,
    //         text
    //     });
    // }

    // postComment(comment, date, name, mealId) {
    //     return requester.post('appdata', 'comments', '', {
    //         comment,
    //         date,
    //         name,
    //         mealId
    //     });
    // }
}

const appModel = new AppModel();

export {
    appModel
};
