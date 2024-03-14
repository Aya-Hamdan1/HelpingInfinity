import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, ToastAndroid,View, Button,Image,TouchableOpacity ,SectionList, Linking, TextInput, StatusBar, TextField, Alert} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const styles = StyleSheet.create({
      body: {
        //backgroundColor: '#ffffff',
        padding: 5,
        fontFamily: 'sanserf',
        height: 900,
        alignItems: 'center',
        margin: 20,
      },
      text: {
        fontSize: 22,
        marginBottom:20,
        fontStyle: 'italic',
        margin: 10,
        color: 'black',
      },
      text0: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
        color: 'black',
      },
      input: {
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#bdbdbd',
        // textAlign: 'center',
        // marginBottom: 10,
        // marginRight:10,
      },
      row: {
       flexDirection: 'row',
       marginBottom: 20,
      },
      action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
        marginLeft:15,
    },
      button: {
        backgroundColor: '#ffb2ff',
        width: 300,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
      },
      button1: {
        backgroundColor: '#d05ce3',
        width: 300,
        // marginTop: 20,
        // marginBottom: 20,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
      },
      textInput: {
        flex: 1,
        width: 100,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 30,
        color: '#05375a',
    },
     
      image: {
        width: 100,
        height: 100,
        marginRight:200,
      },
    });
    const Credit = ({navigation,id,sodality}) => {
      const [text, setText] = useState('');
      const [name, setName] = useState('');
      const [des, setDes] = useState('');
      const [doc, setDoc] = useState('');
      const [submitted, setSubmitted] = useState(false);
      const [money, setMoney] = useState('');
      const [Pic,setPic] = useState('');
      setToastMessage = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    };
      const onPressButon = () => {
        setSubmitted(!submitted);
      };
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
      const AddCase = () => {
        
        var APIURL = "http://"+global.ip+":80/api/AddCase.php";
              var headers = {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
                };
        var Data ={
          Sid:id,
          money:money,
          des:des,
          Pic:Pic,
          sodality:sodality
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
      // const Stack=createNativeStackNavigator();
      return (
       
        <View style={styles.body}>
        <Text style={styles.text}>Add Case                                         </Text>
      
         {/* <StatusBar backgroundColor='#ff4081' barStyle="light-content"/> */}
         <View style={styles.row}>
          {/* <Text style={styles.text}>Mony:        </Text> */}
          <TextInput style={styles.input} placeholder='Amount' maxLength={10} onChangeText = {(value)=>setMoney(value)}></TextInput>
          </View>
          <View style={styles.row}>
          {/* <Text style={styles.text}>Number:     </Text> */}
          <TextInput style={[styles.input,{height:50},]} placeholder='Description' maxLength={800} onChangeText = {(value)=>setDes(value)}></TextInput>
          </View>
          {/* <Text style={styles.text} onPress={openGallery}>Documents:         </Text> */}
       
        <TouchableOpacity  onPress={()=>uploadImage() } style={styles.button1} activeOpacity={0.9}>
               <Text style={styles.text0}>Your Documents</Text>
           </TouchableOpacity>
                      {/* <TextInput 
                          placeholder="your docs"
                          style={styles.input}
                          editable = {false}
                          autoCapitalize="none"
                          onChangeText={()=>uploadImage()}
                      ><FontAwesome 
                      name="files-o"
                      size={20}
                      onPress={()=>uploadImage()}
                  /><Text>  your docs</Text></TextInput> */}
         
          
          <TouchableOpacity  onPress={()=>AddCase() } style={styles.button} activeOpacity={0.9}>
               <Text style={styles.text0}>Save</Text>
           </TouchableOpacity>
           

        </View>
        
      );
    };
export default Credit;
// const options={
//     title: 'Select Image',
//     type: 'library',
//     options: {
//       selectionLimit: 1,
//       mediaType: 'photo',
//       includeBase64: false,
//       includeBase64: false,
//     },
// }
// const openGallery=async()=>{
//     const images = await launchImageLibrary(options);
//     console.log(images.assets[0].fileName);
// }
