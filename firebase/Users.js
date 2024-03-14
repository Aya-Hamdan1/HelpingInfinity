// import Firebase from './firebaseConfig';
import firebase from 'firebase/compat';
import'firebase/database';

export const Users = async (name, email, image, uid) => {
try{
     return await firebase.database().ref("users/" + uid).
     set({
        name: name,
        email: email,
        image: image,
        uuid: uid,
     });
} catch (error) {
    return error;
}
}

export const UpdateUserImage = async (image, uid) => {
    try{
        
        
         return await firebase.database().ref("users/" + uid).
         update({
            image: image,
            // uuid: uid,
         });
    } catch (error) {
        alert('done');
        return error;
    }
    }