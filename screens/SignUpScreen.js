// import React from 'react';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar
} from 'react-native';
import { SignUpUser } from '../firebase/SignUp';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { Component } from 'react';
import {Users} from '../firebase/Users';
import Firebase from '../firebase/firebaseConfig';
import React from 'react';
import { useAsyncStorage } from '@react-native-community/async-storage'; 
import AsyncStorage from '@react-native-community/async-storage'; 

export default class SignUpScreen extends Component {
    constructor(prpos)
    {
        super(prpos);
        this.state={name:'',email:'',password:'',conf_password:'',ip:global.ip};
    }
    SigntoFirebase = async() => {

        SignUpUser(this.state.email,this.state.password).
        then(async(res) => {
            console.log('aya', res);
            var id = Firebase.auth().currentUser.uid;
            // console.log(id);
            Users(this.state.name, this.state.email, "https://i.stack.imgur.com/l60Hf.png", id).
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
        // alert("Aya");
        // var id = Firebase.auth().currentUser.uid;
        this.SigntoFirebase();
        var name=this.state.name;
        var password=this.state.password;
        var conf_password=this.state.conf_password;
        var email=this.state.email;
        var Pic = "https://i.stack.imgur.com/l60Hf.png";
        var checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);

        if(name.length==0 || password.length==0 || conf_password.length==0 || email==0)
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
var InsertAPIURL="http://"+global.ip+":80/api/insert.php";

var headers={
    'Accept':'application/json',
    'Content-Type':'application/json'
};

var Data={
name:name,
password:password,
email:email,
Pic:Pic,
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
    // console.log((response));
    alert(response[0].Message);
    // SignUpUsers(this.state.email,this.state.password);
    this.SigntoFirebase();
    this.props.navigation.navigate("SignInScreen");
})
.catch((error)=>{
    // console.log(JSON.stringify(error));
    alert("Error"+error);
})
        }
    }
  render() {
  
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#c94f7c' barStyle="light-content"/>
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
                  <Text style={styles.text_footer}>Username</Text>
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
                  <Text style={[styles.text_footer, {marginTop: 30 }]}>Email</Text>
                  <View style={styles.action}>
                      <FontAwesome 
                          name="send-o"
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
      
                  <Text style={[styles.text_footer, {
                      marginTop: 30
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
                          onChangeText={password=>this.setState({password:password})}
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
                      marginTop: 30
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
                          onChangeText={confpassword=>this.setState({conf_password:confpassword})}
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
                        onPress={() => this.InsertRecord()}
                      >
                      <LinearGradient
                          colors={['#c94f7c', '#ff80ab']}
                          style={styles.signIn}
                      >
                          <Text style={[styles.textSign, {
                              color:'#fff'
                          }]}>Sign Up</Text>
                      </LinearGradient>
                      </TouchableOpacity>
      
                      <TouchableOpacity
                          onPress={() =>this.props.navigation.navigate('SignInScreen') }
                          style={[styles.signIn, {
                              borderColor: '#c94f7c',
                              borderWidth: 1,
                              marginTop: 15
                          }]}
                      >
                          <Text style={[styles.textSign, {
                              color: '#c94f7c'
                          }]}>Sign In</Text>
                      </TouchableOpacity>
                  </View>
                  </ScrollView>
              </Animatable.View>
            </View>
          );
      };
      
    
  }




const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#c94f7c'
    },
    logo: {
        width: 100,
        height: 100
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingTop:50,
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
        fontSize: 18
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
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
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
        borderRadius: 10
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