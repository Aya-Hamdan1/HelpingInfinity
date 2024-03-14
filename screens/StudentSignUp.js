import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Image,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert,
    ToastAndroid
} from 'react-native';
import {Users} from '../firebase/Users';
import SelectList from 'react-native-dropdown-select-list';
import {launchImageLibrary} from 'react-native-image-picker';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import React, { setState,Component } from 'react';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SignUpUser } from '../firebase/SignUp';
import Firebase from '../firebase/firebaseConfig';
import AsyncStorage from '@react-native-community/async-storage'; 
import {AddStudent} from '../firebase/StudentFire';


 const data = [{key:1,value:1},
               {key:2,value:2},
               {key:3,value:3},
               {key:4,value:4},
               {key:5,value:5}
            ];

export default class StudentSignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            avatarSource: null ,setSelected:'',Pic:'',profile:"https://i.stack.imgur.com/l60Hf.png",
            name:'',email:'',password:'',Pic:'',name_u:'',college:'',year:'',conf_password:'', sodality:'', society:'', Sid:''};
        setToastMessage = msg => {
            ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
        };
       // alert(society);
    }
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [docs, setDocs] = useState(0);
    // const [name_u, setName_u] = useState('');
    // const [college, setCollege] = useState('');
    // const [year, setYear] = useState(0);
    // const [conf_password, setConf_password] = useState('');
    // const [selected, setSelected] = useState('');
   
    SigntoFirebase = async() => {

        SignUpUser(this.state.email,this.state.password).
        then(async(res) => {
            var id = Firebase.auth().currentUser.uid;
            var uid;
            try {
                await Firebase.database().ref('society').
                on("value", async(dataSnapshot) =>{
               
                  dataSnapshot.forEach((child) => {
                   
                    if(child.val().nameS == this.state.sodality){
                        uid = child.val().suid;
                         
                    }
                  })
                })
                
              } catch (error) {
                alert(error);
              }
            AddStudent(this.state.name, this.state.email, "https://i.stack.imgur.com/l60Hf.png", id, uid).
            then(async() => {
                await AsyncStorage.setItem('UID', id);
              console.log('success');
            //   this.props.navigation.navigate("SignInScreen");
            }).catch((error) =>{
            console.log(error);
            })
            console.log(id);
        }).catch((err)=>{
            console.log('err', err);
        })
    }
    InsertRecord=()=>
    {
        var name=this.state.name;
        var password=this.state.password;
        var conf_password=this.state.conf_password;
        var email=this.state.email;
        var Pic=this.state.Pic;
        var name_u=this.state.name_u;
        var college=this.state.college;
        var year=this.state.year;
        var society=this.state.sodality;
        var profile= this.state.profile;
        var checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

        if(name.length==0 || password.length==0 || conf_password.length==0 || email==0 || college==0 || year==0 || Pic==0 || name_u==0 || society==0)
        {
            alert("Required filed is missing");
        }
        else if (!(checkEmail).test(email)){
            alert("invalid email!!!");
          }
          // Password validations
    else if (password.length<8){
        alert("Minimum 08 characters required!!!");
      }else if (!((/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/).test(password))){
        alert("Use atleast 1 special character!!!");
      }else if (((/[ ]/).test(password))){
        alert("Don't include space in password!!!");
      }else if(password !== conf_password){
        alert("Password doesnot match!!!");
      }
        else
        {
            //localhost:8081
         var InsertAPIURL="http://"+global.ip+":80/api/insertS.php";

         var headers={
         'Accept': 'application/json',
         'Content-Type': 'application/json'
          };

          var Data={
           name:name,
           email:email,
           password:password,
           Pic:Pic,
           name_u:name_u,
           college:college,
           year:year,
           profile:profile,
           society:society,
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
    //alert(response[0].Message);
    if(response == 1){
        alert("Please Enter a Valid Society Name!");
        this.props.navigation.navigate("StudentSignUp");
    }
    else{
        alert("Add Successfully!");
        this.SigntoFirebase();
    this.props.navigation.navigate("SingInStudent");
    }
})
.catch((error)=>{
    console.log(error);
    //alert("Error"+error);
})
        }
    }
    uploadImage = () => {
        
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
                'Please choose a file under 2 MB',
            [{text: 'OK'}],
      
            );
      
          } else {
            let pname = response.assets[0].base64;
            this.setState({Pic:'data:image/png;base64,' + response.assets[0].base64});
            // {password=>this.setState({password:password})}
      // console.log(response.assets[0]);
          }
      
        });
      
      }
    

  render() {
   
  
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#9e00c5' barStyle="light-content"/>
              <View style={styles.header}>
              <Animatable.Image 
                      animation="bounceIn"
                      duraton="1500"
                  source={require('../assets/Logo.png')}
                  style={styles.logo}
                  // resizeMode="stretch"
                  />
                  <Text style={styles.text_header}>Join Now</Text>
              </View>
              <Animatable.View 
                  animation="fadeInUpBig"
                  style={styles.footer}
              >
                  <ScrollView>
                  <Text style={styles.text_footer}>Student Name</Text>
                  <View style={styles.action}>
                      <FontAwesome 
                          name="user-o"
                          color="#05375a"
                          size={20}
                      />
                      <TextInput 
                          placeholder="Your Username"
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={name=>this.setState({name})}
                      />
                      
                      {/* {data.check_textInputChange ? 
                      <Animatable.View
                          animation="bounceIn"
                      >
                          <Feather 
                              name="check-circle"
                              color="green"
                              size={20}
                          />
                      </Animatable.View>
                      : null} */}
                  </View>


                  <Text style={styles.text_footer}>Student Email</Text>
                  <View style={styles.action}>
                      <FontAwesome 
                          name="envelope"
                          color="#05375a"
                          size={20}
                      />
                      <TextInput 
                          placeholder="Your Email"
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={email=>this.setState({email})}
                      />
                      </View>
                      <Text style={styles.text_footer}>Student University</Text>
                  <View style={styles.action}>
                      <FontAwesome 
                          name="university"
                          color="#05375a"
                          size={20}
                      />
                      <TextInput 
                          placeholder="Your University"
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={name_u=>this.setState({name_u})}
                      />
                      </View>
                      <Text style={styles.text_footer}>Student College</Text>
                  <View style={styles.action}>
                      <Icon 
                          name="school-outline"
                          color="#05375a"
                          size={20}
                      />
                      <TextInput 
                          placeholder="Your College"
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={college=>this.setState({college})}
                      />
                      </View>
                      <Text style={styles.text_footer}>Select Society</Text>
                  <View style={styles.action}>
                      <FontAwesome 
                          name="users"
                          color="#05375a"
                          size={20}
                      />
                      <TextInput 
                          placeholder="Your Sodality Name"
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={sodality=>this.setState({sodality})}
                      />
                      </View>
                      <View style={{marginTop:20}}>                      

                      </View>
                      <SelectList  placeholder="Academic year" setSelected={year=>this.setState({year})} data={data}  />
                      
                  {/* <Text style={styles.text_footer} onPress={this.uploadImage()}>Documents</Text>
                  <View style={styles.action}>
                  <FontAwesome 
                    name="files-o"
                    size={20}
                    onPress={this.uploadImage()}
                />
                      <TextInput 
                          placeholder="Enter your docs"
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={docs=>this.setState({docs})}
                      />
                      
                       </View> */}
                        <TouchableOpacity style={styles.docs} onPress={()=>this.uploadImage()}>
                        <FontAwesome 
                          name="image"
                          color="#05375a"
                          size={20}
                      /><Text>    Choose Documents</Text>
                      </TouchableOpacity>
                      {/* <SelectList  placeholder="Choose Society" setSelected={sodality=>this.setState({sodality})} maxHeight={10} defaultOption={{ key:'1', value:'' }} data={this.society} onSelect={() => alert(this.year)} /> */}
                      {/* {data.check_textInputChange ? 
                      <Animatable.View
                          animation="bounceIn"
                      >
                          <Feather 
                              name="check-circle"
                              color="green"
                              size={20}
                          />
                      </Animatable.View>
                      : null} */}
                  
                  {/* <View style={{ flex: 1, paddingVertical: 30, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                       <ComboBox  values={values} onValueSelect={this.year} />
                          <Text>selected value: {values[this.year]}</Text>
                      </View>
                       */}
      
      
                  <Text style={[styles.text_footer, {
                      marginTop: 35
                  }]}>Password</Text>
                  <View style={styles.action}>
                      <Feather 
                          name="lock"
                          color="#05375a"
                          size={20}
                      />
                      <TextInput 
                          placeholder="Your Password"
                        //   secureTextEntry={data.secureTextEntry ? true : false}
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={password=>this.setState({password})}
                      />
                      {/* <TouchableOpacity
                          onPress={updateSecureTextEntry}
                      >
                          {data.secureTextEntry ? 
                          <Feather 
                              name="eye-off"
                              color="grey"
                              size={20}
                          />
                          :
                          <Feather 
                              name="eye"
                              color="grey"
                              size={20}
                          />
                          }
                      </TouchableOpacity> */}
                  </View>
      
                  <Text style={[styles.text_footer, {
                      marginTop: 35
                  }]}>Confirm Password</Text>
                  <View style={styles.action}>
                      <Feather 
                          name="lock"
                          color="#05375a"
                          size={20}
                          
                      />
                      <TextInput 
                          placeholder="Confirm Your Password"
                        //   secureTextEntry={data.confirm_secureTextEntry ? true : false}
                          style={styles.textInput}
                          autoCapitalize="none"
                          onChangeText={conf_password=>this.setState({conf_password})}
                      />
                      {/* <TouchableOpacity
                          onPress={updateConfirmSecureTextEntry}
                      >
                          {data.secureTextEntry ? 
                          <Feather 
                              name="eye-off"
                              color="grey"
                              size={20}
                          />
                          :
                          <Feather 
                              name="eye"
                              color="grey"
                              size={20}
                          />
                          }
                      </TouchableOpacity> */}
                  </View>
                  {/* <View style={styles.textPrivate}>
                      <Text style={styles.color_textPrivate}>
                          By signing up you agree to our
                      </Text>
                      <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                      <Text style={styles.color_textPrivate}>{" "}and</Text>
                      <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                  </View> */}
                  <View style={styles.button}>
                      <TouchableOpacity
                          style={styles.signIn}
                          onPress={() =>this.InsertRecord()}
                      >
                      <LinearGradient
                          colors={['#9e00c5', '#ff5bff']}
                          style={styles.signIn}
                      >
                          <Text style={[styles.textSign, {
                              color:'#fff'
                          }]}>Sign Up</Text>
                      </LinearGradient>
                      </TouchableOpacity>
                      <TouchableOpacity
                          onPress={() =>this.props.navigation.navigate('SingInStudent',{ name: 'aya', college: 'eng'}) }
                          style={[styles.signIn, {
                              borderColor: '#9e00c5',
                              borderWidth: 1,
                              marginTop: 15
                          }]}
                      >
                          <Text style={[styles.textSign, {
                              color: '#9e00c5'
                          }]}>Sign In</Text>
                      </TouchableOpacity>
                  </View>
                  </ScrollView>
              </Animatable.View>
            </View>
          );
                       
        
      };  
  }

// const options={
//     title: 'Select Image',
//     type: 'library',
//     options: {
//       selectionLimit: 1,
//       mediaType: 'photo',
//       includeBase64: true,
//     },
// }
// const option={
//     title: 'my pic app',
//     takePhotoButtonTitle: 'Take photo with your camera',
//     chooseFromLibraryButtonTitle: 'Choose photo from Library',
// }
// const myfun=()=>{
//     //alert('clicked');
//     ImagePicker.showImagePicker
//   ImagePicker.showImagePicker(options, (response) => {
//       console.log('Response = ', response);
  
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       }
//       else if (response.error) {
//         console.log('Image Picker Error: ', response.error);
//       }
//     //   else if (response.customButton) {
//     //     console.log('User tapped custom button: ', response.customButton);
//     //   }
//       else {
//         let source = { uri: response.uri };
  
//         // You can also display the image using data:
//         // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
//         this.setState({
//           avatarSource: source,
//         //   pic:response.data
//         });
//       }
//     });
// }

// const openGallery=async()=>{
//     const images = await launchImageLibrary(options);
//    // image=>this.setState({images.assets[0].uri});
//     console.log(images.assets[0].fileName);
// }
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#d500f9'
    },
    logo: {
        width: 100,
        height: 100
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingTop:40,
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop:10,
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        marginBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 20,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    docs: {
        width: '99%',
        height: 50,
        marginTop:15,
        margin:2,
         justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth:1,
        borderColor:'gray',
        backgroundColor:'#d500f9'
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    // color_textPrivate: {
    //     color: '#388E3C'
    // }
  });

