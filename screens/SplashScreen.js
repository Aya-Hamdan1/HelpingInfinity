import React, { useEffect} from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    Button,
    
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';


const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [society, setSociety] = useState([]);
    const ip = '192.168.239.97';
    global.ip = ip;
    getSociety = () => {
        
        var InsertAPIURL="http://192.168.239.97:80/api/getAllSociety.php";

     var headers={
      'Accept':'application/json',
      'Content-Type':'application/json'
    };

    var Data={
    
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
    setSociety(response);
    //alert(society);

})
.catch((error)=>{
// console.log(JSON.stringify(error));
alert("Error"+error);
})
    

   
    
}
    // useEffect(() => {
    //     createChannels();
    // },[]);
    // const handleNotification = () => {
    //     PushNotification.localNotification({
    //         channelId: "test-channel",
    //         title: "Wellcom ",
    //         message: "Hello",
    //     });
    // }

    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#ff4081' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../assets/Logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
        </View>
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
        >
            <Text style={[styles.title, {
                color: '#ff66c4'
            }]}>Helping<Text style={[styles.title, {
                color: '#70c236'
            }]}>Infinity!</Text></Text>
            {/* <Button onPress={handleNotification(),() => navigation.navigate('Society')}>enter</Button>
            <Button onPress={() => navigation.navigate('Credit')}>Event</Button>
            <Button onPress={() => navigation.navigate('TimeSelect')}>Credit</Button> */}
            <Text style={styles.text}>Sign in with account</Text>
            
            <View style={styles.button}>
            <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
            {/* onPress={()=>navigation.navigate('SignInScreen')}> */}
                <LinearGradient
                    colors={['#c94f7c', '#ff80ab']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Start as Donor</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity onPress={()=> {navigation.navigate('SingInStudent', {society: society}),getSociety()}}>
                <LinearGradient
                    colors={['#c94f7c', '#ff80ab']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Start as Student</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            <Text></Text>
          
            <TouchableOpacity onPress={()=>navigation.navigate('SignInSociety')}>
                <LinearGradient
                    colors={['#c94f7c', '#ff80ab']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Start as Society</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
      </View>
    );
};


export default SplashScreen;
const createChannels = () => {
    PushNotification.createChannel(
        {
        channelId: "test-channel",
        channelName: "Test Channel"
        }
    )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#c94f7c'
  },
  header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 40,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'center',
      marginTop: 30,
  },
  signIn: {
      width: 200,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      flexDirection: 'row'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
   },
  textSign: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
  }
});


// import React from 'react';
// import { 
//     View, 
//     Text, 
//     TouchableOpacity, 
//     Dimensions,
//     StyleSheet,
//     StatusBar,
//     Image
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { useTheme } from '@react-navigation/native';

// const SplashScreen = ({navigation}) => {
//     const { colors } = useTheme();

//     return (
//       <View style={styles.container}>
//           <StatusBar backgroundColor='#ff4081' barStyle="light-content"/>
//         <View style={styles.header}>
//             <Animatable.Image 
//                 animation="bounceIn"
//                 duraton="1500"
//             source={require('../assets/Logo.png')}
//             style={styles.logo}
//             resizeMode="stretch"
//             />
//         </View>
//         <Animatable.View 
//             style={[styles.footer, {
//                 backgroundColor: colors.background
//             }]}
//             animation="fadeInUpBig"
//         >
//             <Text style={[styles.title, {
//                 color:'#ff66c4' 
//             }]}>Helping<Text style={{color:'#70c236'}}>Infinty</Text></Text>
//             <Text style={styles.text}>Sign in with account</Text>
//             <View style={styles.button}>
//             <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')}>
//                 <LinearGradient
//                     colors={['#c94f7c', '#ff80ab']}
//                     style={styles.signIn}
//                 >
//                     <Text style={styles.textSign}>Get Started</Text>
//                     <MaterialIcons 
//                         name="navigate-next"
//                         color="#fff"
//                         size={20}
//                     />
//                 </LinearGradient>
//             </TouchableOpacity>
//             </View>
//         </Animatable.View>
//       </View>
//     );
// };

// export default SplashScreen;

// const {height} = Dimensions.get("screen");
// const height_logo = height * 0.28;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     backgroundColor: '#c94f7c'
//   },
//   header: {
//       flex: 2,
//       justifyContent: 'center',
//       alignItems: 'center'
//   },
//   footer: {
//       flex: 1,
//       backgroundColor: '#fff',
//       borderTopLeftRadius: 30,
//       borderTopRightRadius: 30,
//       paddingVertical: 50,
//       paddingHorizontal: 30
//   },
//   logo: {
//       width: height_logo,
//       height: height_logo
//   },
//   title: {
//       color: '#05375a',
//       fontSize: 30,
//       fontWeight: 'bold'
//   },
//   text: {
//       color: 'grey',
//       marginTop:5
//   },
//   button: {
//       alignItems: 'flex-end',
//       marginTop: 30
//   },
//   signIn: {
//       width: 150,
//       height: 40,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderRadius: 50,
//       flexDirection: 'row'
//   },
//   textSign: {
//       color: 'white',
//       fontWeight: 'bold'
//   }
// });