import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/app';
import 'firebase/database';
import 'firebase/app';
import 'firebase/firestore/lite';
class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }
    init = () => {
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyBDJl3tmouqLYZE2OeC9uz3svrtKxslCy4",
                authDomain: "appchat-41294.firebaseapp.com",
                databaseURL:"https://appchat-41294-default-rtdb.firebaseio.com/",
                projectId: "appchat-41294",
               storageBucket: "appchat-41294.appspot.com",
               messagingSenderId: "124656889516",
                appId: "1:124656889516:web:62d9f2509f772902657909"
            });
        }
    };
    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };
    send = messages => {
    messages.forEach(item => {
        const message = {
            text:Item.text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: item.user
        };
        this.db.push(message);
    });
};

parse = message => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
        _id,
        createdAt,
        text,
        user
    };

};

get = callback => {
    this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
};

off() {
    this.db.off();
};
get db() {
    return firebase.database().ref('messages');
};

get uid() {
    return (firebase.auth().currentUser || {}).uid;
}

}
export default new Fire();
