import toastr from 'toastr';

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

    getMealByTitle(title) {
        return firebase.database().ref().child("meal").orderByChild("title").equalTo(title).once('value')
        .then(function (snapshot) {
            return snapshot.val();
         });
    }

    searchMealByTitle(filter) {
        // const filter = JSON.stringify({
        //     "title": {
        //         "$regex": `^(?i)${title}`
        //     }
        // });
        return firebase.database().ref().child("meal").orderByChild("title").startAt(filter).endAt(filter+'\uf8ff').once('value')
        .then(function (snapshot) {
            return snapshot.val();
         });
    }

    getComments(title) {
        return firebase.database().ref().child("comments").orderByChild("mealTitle").equalTo(title).once('value')
        .then(function (snapshot) {
            return snapshot.val();
         });
    }

    getSidebarComments(){
        return firebase.database().ref('/comments').once('value')
        .then(function(snapshot) {
             return snapshot.val();
         });
    }

    postComment(comment, date, name, mealTitle) {
        const data = {
            comment: comment,
            date: date,
            name: name,
            mealTitle: mealTitle
        }
        return firebase.database().ref().child('comments').push(data);
    }

    postMessage(name, email, subject, text) {
        return firebase.firestore().collection("messages").add({
            name: name,
            email: email,
            subject: subject,
            text: text
        })
    }
}

const appModel = new AppModel();

export {
    appModel
};
