import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Button,Image,TouchableOpacity ,SectionList, Linking, TextInput, StatusBar, TextField, Alert, ToastAndroid} from 'react-native';
const styles = StyleSheet.create({
      body: {
        //backgroundColor: '#ffffff',
        padding: 0,
        fontFamily: 'sanserf',
        height: 900,
        alignItems: 'center',
        margin: 20,
      },
      text: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
        color: 'black',
      },
      input: {
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ea80fc',
        textAlign: 'center',
        marginBottom: 5,
        marginRight:5,
      },
      row: {
       flexDirection: 'row',
       marginBottom: 20,
      },
      button: {
        backgroundColor: '#9c27b0',
        width: 200,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
      },
      button1: {
        backgroundColor: '#fff',
        width: 200,
        textAlign:'center',
        borderColor:'#ea80fc',
        borderWidth:1,
        // marginTop: 10,
        // marginBottom: 20,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
      },
     
      image: {
        width: 100,
        height: 100,
        marginRight:200,
      },
    });
    const Credit = ({id, name, email, University, collage, year, PicS}) => {
      const [text, setText] = useState('');
      const [nameS, setName] = useState(name);
      const [emailS, setEmail] = useState(email);
      const [universityS, setUniversity] = useState(University);
      const [collageS, setCollage] = useState(collage);
      const [yearS, setYear] = useState(year);
      const [Pic, setPic] = useState(PicS);
      setToastMessage = msg => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
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
      const updateProfile = () => {
        
        var InsertAPIURL="http://"+global.ip+":80/api/updateStudentProfile.php";
    
             var headers={
             'Accept': 'application/json',
             'Content-Type': 'application/json'
              };
    
              var Data={
               user:id,
               name:nameS,
              //  updateEmail:emailS,
               collage:collageS,
               university:universityS,
               year:yearS,
               Pic:Pic
               };
    
    fetch(InsertAPIURL,
    {
        method:'POST',
        headers:headers,
        body:JSON.stringify(Data)
    }
    )
    .then((response)=>response.json())
    .then((response)=>
    {
        alert(response);
        // this.props.navigation.navigate("SingInStudent");
    })
    .catch((error)=>{
        console.log(error);
        //alert("Error"+error);
    })
            }
    //   const {ntext, etext, utext, ytext} = info;

      
    //   const onPressButon = () => {
    //     setSubmitted(!submitted);
    //   };
      // const Stack=createNativeStackNavigator();
      return (
       
        <View style={styles.body}>
      
         {/* <StatusBar backgroundColor='#ff4081' barStyle="light-content"/> */}
         <View style={styles.row}>
          {/* <Text style={styles.text}>Name:     </Text> */}
          <TextInput style={styles.input} placeholder='Student Name' maxLength={500} onChangeText = {(value)=>setName(value)}></TextInput>
          </View>
          {/* <View style={styles.row}> */}
          {/* <Text style={styles.text}>Number:  </Text> */}
          {/* <TextInput style={styles.input} placeholder='Enter Your Email' maxLength={25} onChangeText = {(value)=>setEmail(value)}></TextInput>
          </View> */}
          <View style={styles.row}>
          {/* <Text style={styles.text}>Password </Text> */}
          <TextInput style={[styles.input , { width:150},]} placeholder='Your University' maxLength={500} onChangeText = {(value)=>setUniversity(value)}></TextInput>
          <TextInput style={[styles.input , { width:150},]} placeholder='College Name' onChangeText = {(value)=>setCollage(value)} maxLength={500} ></TextInput>
          </View>
          <View style={styles.row}>
          {/* <Text style={styles.text}>Password </Text> */}
          <TextInput style={[styles.input , { width:150},]} placeholder='Academic year' keyboardType='numeric' maxLength={25} onChangeText = {(value)=>setYear(value)}></TextInput>
          {/* <TouchableOpacity style={[styles.button1 , { width:150},]} editable = {false}  onPress={()=>uploadImage()}> */}
            <FontAwesome 
                      name="image"
                      size={50}
                      style={{width:150}}
                      color={'#ea80fc'}
                      onPress={()=>uploadImage()}
                  />
                  {/* </TouchableOpacity> */}
          </View>
          <TouchableOpacity  onPress={()=>updateProfile() } style={styles.button} activeOpacity={0.9}>
               <Text style={styles.text}>Save</Text>
           </TouchableOpacity>
           

        </View>
        
      );
    };
export default Credit;