import Firebase from './firebaseConfig';
import moment from 'moment';
export const SendMessage = async (currentUid, guestUid, message, image) => {
    // alert(currentUid+ "  "+ guestUid+"  "+ message);
    var todayDate = moment();
try{
     return await Firebase.database().ref("messages/" + currentUid).
     child(guestUid).
     push({
        message: {
        sender:currentUid,
        reciever:guestUid,
        msg:message,
        image:image,
        date:todayDate.format('YYYY-MM-DD'),
        time:todayDate.format('hh:mm A')
        },
     });
} catch (error) {
    return error;
}
}

export const RecieveMessage = async (currentUid, guestUid, message, image) => {
   
    try{
        var todayDate = moment();
         return await Firebase.database().ref("messages/" + guestUid).
         child(currentUid).
         push({
            message: {
            sender:currentUid,
            reciever:guestUid,
            msg:message,
            image:image,
            date:todayDate.format('YYYY-MM-DD'),
            time:todayDate.format('hh:mm A')
            }
         });
    } catch (error) {
        return error;
    }
    }