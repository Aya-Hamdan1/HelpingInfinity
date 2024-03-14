// import Firebase from './firebaseConfig';
import firebase from 'firebase/compat';
import'firebase/database';

export const AddStudent = async (name, email, image, uid, society) => {
try{
     return await firebase.database().ref("student/" + uid).
     set({
        nameS: name,
        emailS: email,
        imageS: image,
        suid: uid,
        society:society
     });
} catch (error) {
    return error;
}
}

export const UpdateStudentImage = async (image, uid) => {
    try{
        
        alert('done');
         return await firebase.database().ref("student/" + uid).
         update({
            imageS: image,
            // uuid: uid,
         });
    } catch (error) {
        return error;
    }
    }

    export const AddSociety = async (name, email, image, uid) => {
        try{
             return await firebase.database().ref("society/" + uid).
             set({
                nameS: name,
                emailS: email,
                imageS: image,
                suid: uid,
             });
        } catch (error) {
            return error;
        }
        }
    

        export const Subscribe = async (user, society, uid) => {
            try{
                 return await firebase.database().ref("subscribe/" + uid).
                 set({
                    user: user,
                    society:society,
                    uid: uid,
                 });
            } catch (error) {
                return error;
            }
            }
            export const UpdateSocietyImage = async (image, uid) => {
                try{
                    
                    
                     return await firebase.database().ref("society" + uid).
                     update({
                        imageS: image,
                        // uuid: uid,
                     });
                } catch (error) {
                    alert('done');
                    return error;
                }
                }