import React, { useState } from "react";
import { 
    View, 
    Button,
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    TextInput,
    ToastAndroid,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute } from '@react-navigation/native';

const TimeSelect = ({navigation}) => {
  const data = useRoute();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePicker,setTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());//data.params.info[2]

  const [year, setYear] = useState('__');
  const [month, setMonth] = useState('__');
  const [day, setDay] = useState('__');
  const [time, setTime] = useState(new Date());//data.params.info[4]
  const [hour, setHour] = useState('_');
  const [minutes, setMinutes] = useState('_');
  const [second, setSecond] = useState('_');
  const [name, setName] = useState(data.params.info[1]);
  const [address, setAddress] = useState(data.params.info[3]);
  const [Pic, setPic] = useState('https://i.stack.imgur.com/l60Hf.png');
  const [Sid, setSid] = useState(data.params.Sid);
  const [state, setStates] = useState(data.params.action);
  const ip = global.ip;
  setToastMessage = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
};
//   const [isSet,setIsSet] = useState(false);

const UpdateEvents = () => {
  var APIURL = "http://"+ip+":80/api/updateEvent.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          };
  var Data ={
    Sid:Sid,
    name:name,
    address:address,
    date:date,
    time:time,
    Pic:Pic,
    id:data.params.info[0]
  };
    fetch(APIURL,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
  .then((Response)=> Response.json())
  .then((Response)=>{
   if(Response=="No Results Found"){console.log("No Result!")}
  else {
    alert(Response);
    // setSelected(1);
  }
   })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })

}

const AddEvents = () => {
  if(state == 0){
    UpdateEvents();
  }
  else {
  var APIURL = "http://"+ip+":80/api/addEvent.php";
        var headers = {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          };
  var Data ={
    Sid:Sid,
    name:name,
    address:address,
    date:date,
    time:time,
    Pic:Pic
  };
    fetch(APIURL,{
    method: 'POST',
    headers: headers,
    body: JSON.stringify(Data)
  })
  .then((Response)=> Response.json())
  .then((Response)=>{
   if(Response=="No Results Found"){console.log("No Result!")}
  else {
    alert(Response);
    // setSelected(1);
  }
   })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })
}
}
const  uploadImage = () => {
        
  let options = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: true,
   };
  launchImageLibrary(options, response => {
     if (response.didCancel) {
      setToastMessage('Cancelled image selection');
     } else if (response.errorCode == 'permission') {
      setToastMessage('Permission not satisfied');
     } else if (response.errorCode == 'others') {
      setToastMessage(response.errorMessage);
     } else if (response.assets[0].fileSize > 2097152) {
      Alert.alert(
         'Maximum image size exceeded',
          'Please choose image under 2 MB',
      [{text: 'OK'}],

      );

    } else {
      
      setPic('data:image/png;base64,' + response.assets[0].base64);
    }

  });

}
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePicker(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const hideTimePicker = () => {
    setTimePicker(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    // setDate(date);
    //alert(data);
    setYear(date.getFullYear());
    setMonth(date.getMonth()+1);
    setDay(date.getDate());
    setDate(year+'/'+month+'/'+day);
    hideDatePicker();
  };
  const handleConfirmTime = (time) => {
    // setTime(time);
    setHour(time.getHours());
    setMinutes(time.getMinutes());
    setSecond(time.getSeconds());
    // alert(time.getHours());
    setTime(hour+':'+minutes);
    hideTimePicker();
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#26a69a' barStyle="light-content"/>
        <View style={styles.header}>
                  <Text style={styles.text}>Add Event!</Text>
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Name:     </Text> */}
          <TextInput style={styles.input} placeholder={name} maxLength={500}  onEndEditing={(e)=>setName(e.nativeEvent.text)}></TextInput>
        </View>
        
          <TouchableOpacity style={styles.button} onPress={() => uploadImage()}>
        <View style={styles.action}>
            <FontAwesome name="image" color="#05375a" size={15} style={{margin:5}}/>
            <Text style={styles.textInput}>Upload Image        </Text>
            </View>
            </TouchableOpacity>
        
        <View style={styles.row}>
          <TextInput style={styles.input} placeholder={address} maxLength={500} onEndEditing={(e)=>setAddress(e.nativeEvent.text)}></TextInput>
        </View>
        {/* <View style={styles.row}>
          <TextInput onPress={showDatePicker} style={styles.input} placeholder='Date' maxLength={10} onChangeText = {(value)=>setDate(value)}></TextInput>
        </View> */}

        <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <View style={styles.action}>
            <FontAwesome name="calendar" color="#05375a" size={15} style={{margin:5}}/>
            <Text style={styles.textInput}>{year} / {month} / {day}</Text>
            </View>
            </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={showTimePicker}>
        <View style={styles.action}>
        <FontAwesome name="clock-o" color="#05375a" size={17} style={{margin:5}}/>
            <Text style={styles.textInput}>{hour}:{minutes}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={()=>AddEvents()}>
        <View style={styles.action}>
        <LinearGradient
                    colors={['#26a69a', '#b2dfdb']}
                    style={styles.button1}
                >
            <Text style={styles.Save}>Save</Text>
            </LinearGradient>
        </View>
        </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        locale="MEd"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <DateTimePickerModal
        mode="time"
        isVisible={isTimePicker}
        // locale="en_GB" // Use "en_GB" here
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
         />
         
    </View>

  );
};

export default TimeSelect;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1, 
        backgroundColor: '#eeeeee',
    },
    header:{
        height: 70,
        width: Math.round(Dimensions.get('window').width),
        marginBottom: 10,
        backgroundColor: '#26a69a',
        fontSize: 32,
     },
     action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: 5,
        paddingLeft: 20,
        color: '#05375a',
    },
    Save: {
      flex: 1,
      // marginTop: 5,
      paddingLeft: 20,
      color: '#05375a',
      fontSize:24,
    },
     button: {
        backgroundColor: '#26a69a',
        width: 300,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
      },
      button1: {
        backgroundColor: '#26a69a',
        width: 300,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 30,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth:1,

      },
     input: {
        width: 300,
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: '#52c7b8',
        backgroundColor: '#e0e0e0',
        //    
        // marginBottom: 30,
        marginTop: 20,
        marginRight:10,
      },
      row: {
       flexDirection: 'row',
       marginBottom: 20,
      },
      text: {
        fontSize: 24,
        margin: 10,
      }
});


