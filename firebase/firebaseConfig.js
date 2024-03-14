
import Firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/app';
import 'firebase/database';
import 'firebase/app';
import 'firebase/firestore/lite';
const firebaseConfig={
    apiKey:"AIzaSyCwd7cz16b0gCjKrJTkq5ymhLXHQ6jDTZA",
    databaseURL:"https://chatingaya-ac44d-default-rtdb.firebaseio.com/",
    projectId:"chatingaya-ac44d",
    appId:"1:630208782689:android:cefdc311d49a7d4e876520",
};
export default Firebase.initializeApp(firebaseConfig);