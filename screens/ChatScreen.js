import React, {useState, Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight,
  FlatList,
  Dimensions
  } from 'react-native';
  import AsyncStorage, { useAsyncStorage}  from '@react-native-community/async-storage';
  import {Avatar,Title,Caption} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {SendMessage, RecieveMessage} from '../firebase/Message';
import { useRoute } from '@react-navigation/native';
import firebase from '../firebase/firebaseConfig';
import moment from 'moment';
 class ChatScreen extends Component {
  state = {
    message: "",
    guestUid:'',
    currentUid:'',
    allMessages:[],
    Pic:'',
   
  }
  async componentDidMount() {
    // this.setState({allMessages:null});
    const currentUid= await AsyncStorage.getItem('UID');
 
  const guestUid= global.gui1;
// alert(currentUid);
    this.setState({currentUid:currentUid, guestUid:guestUid});

    try{
       firebase.database().ref('messages').
       child(currentUid).
       child(guestUid).on("value",(dataSnapshot) => {
        let message = [];
        dataSnapshot.forEach((data)=>{
          message.push({
            sendBy:data.val().message.sender,
            recieveBy:data.val().message.reciever,
            msg:data.val().message.msg,
            image:data.val().message.image,
            date:data.val().message.date,
            time:data.val().message.time
          });
        })
        this.setState({allMessages:message.reverse()});
        console.log('allMessages', this.state.allMessages);
       })
    }catch(error) {
      console.log(error);
    }
  }
  setToastMessage = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
}
   uploadImage = () => {
    // var id=await AsyncStorage.getItem('UID');
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
     };
    launchImageLibrary(options, response => {
       if (response.didCancel) {
        this.setToastMessage('Cancelled image selection');
       } else if (response.errorCode == 'permission') {
        this.setToastMessage('Permission not satisfied');
       } else if (response.errorCode == 'others') {
        this.setToastMessage(response.errorMessage);
       } else if (response.assets[0].fileSize > 2097152) {
        Alert.alert(
           'Maximum image size exceeded',
            'Please choose image under 2 MB',
        [{text: 'OK'}],
  
        );
  
      } else {
        
        this.setState({Pic:'data:image/png;base64,' + response.assets[0].base64});
        
          
            SendMessage(this.state.currentUid, this.state.guestUid,"",this.state.Pic).
            then((res)=>{
              console.log(res);
              // alert('ok');
              //  this.setState({message: ''})
            }).catch((err) => {
              alert(err);
            })
      
            RecieveMessage(this.state.currentUid, this.state.guestUid,"",this.state.Pic).
            then((res)=>{
              //  this.setState({message: ''})
              console.log(res);
              // alert('ok');
            }).catch((err) => {
              alert(err);
            })
          
         
        // UpdateUserImage(Pic, id);
      }
  
    });
  
  }
  
   sendMessage = async()=>{
    // alert('aya');
    if(this.state.message ){
      this.setState({message: ''});
      SendMessage(this.state.currentUid, this.state.guestUid, this.state.message, '').
      then(()=>{
         this.setState({message: ''});
      }).catch((err) => {
        alert(err);
      })

      RecieveMessage(this.state.currentUid, this.state.guestUid, this.state.message, '').
      then(()=>{
         this.setState({message: ''});
      }).catch((err) => {
        alert(err);
      })
    }
   }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', margin:10,
      // justifyContent:'center', alignItems:'center'
      }} >
         {/* <Text></Text> */}
         <FlatList
         inverted
         style={{marginBottom:60}}
         data={this.state.allMessages}
         keyExtractor={(_,index)=> index.toString()}
         renderItem={({item}) => (
          <View style={{marginVertical:5,maxWidth:Dimensions.get('window').width/ 2+10 , alignSelf:this.state.currentUid===item.sendBy?'flex-end':'flex-start'}}>
            <View style={{borderRadius:20,backgroundColor:this.state.currentUid === item.sendBy ? '#ff4081' : '#ccc'}}>
                {item.image===""? <Text style={{padding:10, fontSize:16, fontWeight:'bold'}}>
                  {item.msg} {" "} <Text style={{fontSize:12 }}>{item.time} </Text>
                </Text>:<View>
                <Image source={{ uri:item.image }} style={{width:Dimensions.get('window').width/ 2+10, height:150, resizeMode:'stretch', borderRadius:30}} />
                        <Text style={{fontSize:12, position:'absolute',bottom:5, right:5 }}>{item.time} </Text>
                        </View>
                }
            </View>
          </View>
    )}
         />
         <View style={{ bottom:0, height:50, width: '100%',position:'absolute', flexDirection:'row'}}>
          <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems:'center',marginRight:5}} onPress={()=> this.uploadImage()}>
            <Icon name='camera' size={30} color='#000' />
          </TouchableOpacity>
          <View style={{ width: '75%',justifyContent: 'center'}}>
          {/* <View style={{ bottom:0, height: 50, width: '100%', position:'absolute', flexDirection:'row'}}> */}
          <TextInput onChangeText={(text)=>this.setState({message: text})}
           placeholder='Enter Message' placeholderTextColor='#000' style={{height: 40, width: '70%', borderRadius: 20, backgroundColor:'#ccc'}}>{this.state.message}</TextInput>
         </View>
         <TouchableOpacity style={{ width: '10%', marginLeft: 5, justifyContent: 'center', alignItems:'center'}} onPress={()=>this.sendMessage()}>
         <Icon name='send' size={30} color='#000' />
         </TouchableOpacity>
         </View>


      </View>
    )
  }
 }
 export default ChatScreen;