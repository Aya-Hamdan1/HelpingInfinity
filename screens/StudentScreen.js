import React from 'react';
import {View, SafeAreaView, StyleSheet,ImageBackground,Button,TouchableOpacity} from 'react-native';
import {Avatar,Title,Caption,Text,TouchableRipple} from 'react-native-paper';
import IconLabel from '../components/IconLabel';
import { useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Editing from '../components/Editing';
import AddCase from '../components/AddCase';
import firebase from '../firebase/firebaseConfig';
import AsyncStorage, { useAsyncStorage}  from '@react-native-community/async-storage';
// import Share, { Button } from 'react-native-share';

import files from '../assets/filesBase64';
import { useState, useEffect } from 'react';
const styles = StyleSheet.create({
    container: {
        flex: 1,
       
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
      },
      infoBoxWrapper: {
        flexDirection: 'column',
       
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
        flexDirection: 'row',
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      sliderImagee: {
        height: '80%',
        width: '100%',
      },
    
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
      appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
      },
      section: {
        backgroundColor: 'gray',

      },
      button: {
        backgroundColor: '#d05ce3',
        width: 100,
        borderRadius: 5,
        height: 40,
        marginRight:20,
        alignItems: 'center',
      },
      textButton: {
        fontSize:18,
        color:'#fff',
        margin:5,

      },
      appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      }
      
    });
    const StudentScreen = ({navigation}) => {
        const data = useRoute();
        const ip = global.ip;
        const [id,setId] = useState(data.params.id);
        const [name,setName] = useState(data.params.name);
        // alert(name);
        const [email,setEmail] = useState(data.params.email);
        const [University,setUniversity] = useState(data.params.uni); 
        const [collage,setCollage] = useState(data.params.collage);
        const [year,setYear] = useState(data.params.year);
        const [Pic,setPic] = useState(data.params.Pic);
        const [sodality, setSodality] = useState(data.params.id_sodality);
        const [loggedInUserName, setLoggedInUserName] = useState('');
        const [imageUrl, setImageUrl] = useState('');
        const [guestUid, setGuestUid] = useState('');
        const [selected,setSelected] = useState(false);
        const [info, setInfo] = useState([]);
        const [loading,setLoading] = useState(true);

        useEffect(() => {
          componentDidMount();
        },[]);
         const logOut = async () => {
          // navigation.navigate('SplashScreen');
           await firebase.auth().signOut().then(async() => {
           await AsyncStorage.removeItem('UID');
           navigation.navigate('SplashScreen');
            }).catch((err) =>{
           console.log(err);
           })
           }
        // const onPressButon = () => {
        //   setSelected(!selected);
        // };
        const componentDidMount = async() =>{
          var id;
          try {
            await firebase.database().ref('student').
            on("value", async(datasnapshot) =>{
              const uuid= await AsyncStorage.getItem('UID');
              
              datasnapshot.forEach((child) => {
                if (child.val().suid == uuid) {
                  setLoggedInUserName(child.val().nameS);
                  setImageUrl(child.val().imageS);
                  setGuestUid(child.val().society);
                  global.gui1=child.val().society;
                  // alert(child.val().nameS+"--"+imageUrl+guestUid);
                    
                }
               
              })
             
            })
          } catch (error) {
            alert(error);
          }
        }
        function Greeting(props) {
          const isLoggedIn = props.isLoggedIn;
          if (isLoggedIn==0){
            return (<View style={styles.infoBoxWrapper}>
              <ImageBackground
                     source={require('../assets/banners/profile.png')}
                     style={styles.sliderImagee}/>
             </View>);
          }
          else if (isLoggedIn==1){
            return(<Editing id={id} name={name} email={email} University={University} collage={collage} year={year} PicS={Pic} />);
          }
          else if (isLoggedIn==2){
            return(<View style={styles.infoBoxWrapper}>
              <AddCase id={id} sodality={sodality}/>
           
            </View>);
          }
          return <GuestGreeting />;
        }
        // getProfile=(userName)=>{
        //   var APIURL = "http://192.168.211.97:80/api/getStudentInfo.php";
        //   var headers = {
        //       'Accept' : 'application/json',
        //       'Content-Type' : 'application/json'
        //     };
        //     var Data ={
        //       email:userName
        //     };
        //   fetch(APIURL,{
        //     method: 'POST',
        //     headers: headers,
        //     body: JSON.stringify(Data)
        //   })
        //   .then((Response)=> Response.json())
        //   .then((Response)=>{
        //       setInfo(Response);
        //       setPic(info[3]);
        //       setId(info[0]);
        //       setName(info[1]);
        //       setEmail(info[2]);
        //       setCollage(info[5]);
        //       setUniversity(info[4]);
        //       setYear(info[6]);
                
        //   })
        //   .catch((error)=>{
        //     console.error("ERROR FOUND   Aya " + error+email);

        //   })
      
        // }
        // if(loading){
        //   getProfile(email);

        // }
        return(
          <SafeAreaView style={styles.container}>
            
          <View style={styles.userInfoSection}>
            
         <View style={{flexDirection: 'row'}}>
        <Avatar.Image 
         source={{uri: Pic}}
          size={100}
        />
        <View style={{marginLeft: 20}}>
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
          }]}>{name}</Title>
          <FontAwesome name="comment" color="gray" size={25} onPress={() => navigation.navigate('ChatScreen', {userName: loggedInUserName, guestUid:guestUid})}/>
          {/* <Caption style={styles.caption}>Zetawi</Caption> */}
        </View>
      </View>
    </View>                           
    <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <FontAwesome name="university" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>{University}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="school-outline" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>{collage}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email-box" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>{email}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome name="calendar-check-o" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>{year}</Text>
        </View>
      </View>
      <View style={{ flexDirection:"row", justifyContent:"space-between",
       alignItems: "center", marginLeft: 20,marginRight: 180}}>
      <TouchableOpacity  onPress={()=> setSelected(1)} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Edit profile</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={()=> setSelected(2)} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Add</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={()=>logOut()} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>signOut</Text>
           </TouchableOpacity>
      
      </View>
      <Text> ______________________________________________________</Text>
      <View >
      {/* {selected ? <Editing id={id}/>:
     ( 
          <View style={styles.infoBoxWrapper}>
            <AddCase id={id}/>
         
          </View>)
          } */}
          <Greeting isLoggedIn={selected} />
          </View>
      
          </SafeAreaView>

    
        );
    };
    export default StudentScreen;