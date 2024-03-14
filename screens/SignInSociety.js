import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from '../components/context';
import SocietyProfileScreen from './SocietyProfileScreen';
import Firebase from '../firebase/firebaseConfig';
import { LoginUser } from '../firebase/LoginUser';
import { SignUpUser } from '../firebase/SignUp';
import { AddSociety } from '../firebase/StudentFire';
import AsyncStorage, { useAsyncStorage}  from '@react-native-community/async-storage';

// import Users from '../model/users';

const SignInSociety = ({navigation}) => {
    global.ref = false;
    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });
    const ip = global.ip;
    const [emailS, setEmailS] = React.useState('');
    var checkEmail = RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i);
    const { colors } = useTheme();
    const textInputChange = (val) => {
        if( val.trim().length >= 4 && (checkEmail).test(val.trim())) {
            setEmailS(val);
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    
    const SigntoFirebase = async(userName, password, name) => {

        SignUpUser(userName,password).
        then(async(res) => {
            var id = Firebase.auth().currentUser.uid;
            // console.log(id);
            AddSociety(name, userName, "https://i.stack.imgur.com/l60Hf.png", id).
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
    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    /**** */
    LogintoFirebase = async (email, password) => {
        LoginUser(email, password).
        then(async (res)=>{
            const uid = Firebase.auth().currentUser.uid;
            console.log(uid);
            await AsyncStorage.setItem('UID', uid);
            console.log('Shams', res);
        }).
        catch((err)=>{
            console.log(err);
    })
    }
    /******* */
    const loginHandle = (userName, password) => {
        if ( data.username.length == 0 || data.password.length == 0 ) {
            Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
                {text: 'Okay'}
            ]);
            return;
        }
        else{
            var InsertAPIURL="http://"+ip+":80/api/LoginSociety.php";

         var headers={
          'Accept':'application/json',
          'Content-Type':'application/json'
        };

        var Data={
        email:userName,
        password:password,
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
    // alert(response[0].Message);
    if(response != null){
        navigation.navigate('SocietyProfileScreen',{email:emailS});
        // SigntoFirebase(userName, password, response);
        LogintoFirebase(userName, password);
        
    }
    else{
     alert('Username or Password is incorrect!');
    }
    //  this.props.navigation.navigate("HomeScreen",{userName:userName});
    })
    .catch((error)=>{
    // console.log(JSON.stringify(error));
    alert("Error"+error);
    })
        }

       
        
    }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#dba5b8' barStyle="light-content"/>
        <View style={styles.header}>
        <Animatable.Image source={require('../assets/Logo.png')} style={styles.logo} />
           <Text style={styles.text_header}>Welcome</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={[styles.footer, { backgroundColor: colors.background  }]} >
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Email"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Email must be correct format.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                
                <TouchableOpacity
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
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
            

            <TouchableOpacity>
                <Text style={{color: '#ff80ab', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
                    {/* //{loginHandle( data.username, data.password )} */}
                <LinearGradient
                    colors={['#f4b8cd', '#cc99ab']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign In</Text>
                </LinearGradient>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('SignUpScreen')}
                    style={[styles.signIn, {
                        borderColor: '#fe4fcb',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#fe4fcb'
                    }]}>Sign Up</Text>
                </TouchableOpacity> */}
            </View>
        </Animatable.View>
      </View>
    );
};

export default  SignInSociety;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#f4b8cd'
    },
    logo: {
        width: 100,
        height: 100
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
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
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    }
  });