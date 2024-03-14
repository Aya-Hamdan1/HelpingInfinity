import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight
  } from 'react-native';
  import {Avatar,Title,Caption} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import { useRoute } from '@react-navigation/native';
import {UpdateSocietyImage} from '../firebase/StudentFire';
import AsyncStorage from '@react-native-community/async-storage';

const EditProfileScreen = ({navigation}) => {
  const data = useRoute();
  const [id, setId] = useState(data.params.id);
  const [Pic, setPic] = useState(data.params.Pic);
  const [name, setName] = useState(data.params.name);
  const [email, setEmail] = useState(data.params.email);
  const [phone, setPhone] = useState(data.params.phone);
  const [address, setAddress] = useState(data.params.address);
  const [facebook, setFaceBook] = useState(data.params.facebook);
  const ip = global.ip;
  // const [Pic, setPic] = useState("https://i.stack.imgur.com/l60Hf.png");
  // require('../assets/banners/user.png')
  const sodality = email;
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

  const updateProfile =async() => {
    var InsertAPIURL="http://"+ip+":80/api/EditSocityProfile.php";
    var uid=await AsyncStorage.getItem('UID');
         var headers={
         'Accept': 'application/json',
         'Content-Type': 'application/json'
          };

          var Data={
          sodality:id,
           name:name,
           updateEmail:email,
           address:address,
           facebook:facebook,
           phone:phone,
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
    alert(response[0].Message);
    UpdateSocietyImage(Pic, uid);
    navigation.navigate("SocietyProfileScreen",{email:email});
})
.catch((error)=>{
    console.log(error);
    //alert("Error"+error);
})
        }
  const removeImage = () => {
          setPic("https://i.stack.imgur.com/l60Hf.png");
          setToastMessage('Image Removed');
          
      }
 
  return (
   
    <View style={styles.container}>
     
     <View style={styles.header}>
            <View style={styles.headerContent}>
                {/* <Image style={styles.avatar} source={Pic} /> */}
                <Avatar.Image 
                source={{uri: Pic}}
                size={200}/>
                <View style={styles.row}>
                <TouchableHighlight underlayColor={'000'} onPress={()=>uploadImage()}>
                <Text style={styles.name}>
                Change |
                </Text>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'000'} onPress={()=>removeImage()}>
                <Text style={styles.name}>
                Remove
                </Text>
                </TouchableHighlight>
                </View>
            </View>
          </View>

         
     
      
    
        <View style={styles.action}>
          <FontAwesome name="user-o" color='#c94f7c' size={30} />
          <TextInput
            placeholder={name}
            placeholderTextColor="#666666"
            autoCorrect={false}
              //onChangeText = {(value) => setName(value)}
             onEndEditing={(e)=>setName(e.nativeEvent.text)}
            
            
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color='#c94f7c' size={30} />
          <TextInput
            placeholder={phone}
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            onEndEditing={(e)=>setPhone(e.nativeEvent.text)}
            // onChangeText = {(value) => setPhone(value)}
          />
        </View>
        {/* <View style={styles.action}>
          <FontAwesome name="envelope-o" color='#c94f7c' size={30} />
          <TextInput
            placeholder={email}
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            onEndEditing={(e)=>setEmail(e.nativeEvent.text)}
             //onChangeText = {(value) => setEmail(value)}
          />
        </View> */}
        <View style={styles.action}>
        <Feather name="facebook" color='#c94f7c' size={30} />
          <TextInput
            placeholder={facebook}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onEndEditing={(e)=>setFaceBook(e.nativeEvent.text)}
             //onChangeText = {(value) => setFaceBook(value)}
          />
        </View>
        
        <View style={styles.action}>
        <Icon name="map-marker-outline" color='#c94f7c' size={30} />
        <TextInput
            placeholder={address}
            placeholderTextColor="#666666"
            autoCorrect={false}
            onEndEditing={(e)=>setAddress(e.nativeEvent.text)}
            //onChangeText = {(value) => setAddress(value)}
          />
          </View>
        <TouchableOpacity style={styles.commandButton} onPress={() => updateProfile()}>
          <Text style={styles.panelButtonTitle}>Save</Text>
        </TouchableOpacity>
    </View>
  
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   margin:30,
    justifyContent: 'center',
   
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
   },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#c94f7c',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },

  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize:20,
  },
  // 
  header:{
    // backgroundColor: "#f8bbd0",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "black",
    marginBottom:8,
  },
  name:{
    fontSize:20,
    color:"#666666",
    fontWeight:'600',
  },
  profileDetail:{
    alignSelf: 'center',
    marginTop:200,
    alignItems: 'center',
    flexDirection: 'row',
    position:'absolute',
    backgroundColor: "#ffffff"
  },
  detailContent:{
    margin:10,
    alignItems: 'center'
  },
  title:{
    fontSize:20,
  },
  count:{
    fontSize:18,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:40
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#f8bbd0",
  },
  description:{
    fontSize:20,
    marginTop:10,
    textAlign: 'center'
  },
});