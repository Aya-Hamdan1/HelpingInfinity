import React, {useContext} from 'react';
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  Linking,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
// import StarRating from '../components/StarRating';
export const Notification = React.createContext();
const HomeScreen = ({navigation}) => {
  // const data = useRoute();
  // const name = useContext(UserContext);

  const theme = useTheme();
  const [notification, setNotification] = useState([]);
  const [socity, selectSociety] = useState([]);
  // const donor = getuser();
  
  global.ip = '192.168.239.97';
  const ip = global.ip;
  let tempticket = [];
  let Allcase = [];
  const [donorId, setDonorId] = useState(0);
  const [case1, setCase] = useState([]);
  const [donor, setDonor] = useState('');
  global.d_id = donorId;
  useEffect(() => {
    getName(); 
    // GetInfo();
  },[]);
  const getName = () => {
    try{
      AsyncStorage.getItem('userName').then(value => {
        if(value != null){
          setDonor(value);
          global.name = value;
          getProfile();
        }
      })
    } catch (error){
      console.log(error);
    }
  }
 
  getProfile=()=>{
    var APIURL = "http://"+ip+":80/api/getProfileInfo.php";
    var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
      
      var Data ={
        donor:donor
      };
    fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
      setDonorId(Response[0]);
        global.id=Response[0];
        global.img=Response[3];
        global.donorName= Response[1];
          
    })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })

  }
  const GetAllEvent = () => {
    tempticket = [];
    var APIURL = "http://"+ip+":80/api/selectSociety.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      user: donor
    };
      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
      if(Response == false){
      alert("Their is no events");
      }
      else{
     selectSociety(Response);
     for (var i=0 ; i<socity.length ; i++){
      
      GetEvent(socity[i]);
     }
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  const GetEvent = (s_id) => {//we take the id for sodality to get all events for it
    // for (var i=0 ; i<socity.length ; i++){
      
      var APURL = "http://"+ip+":80/api/getInfo.php";
           var header = {
               'Accept' : 'application/json',
               'Content-Type' : 'application/json'
             };
     var Data ={
       socity:s_id,
       donor:global.d_id
     };
       fetch(APURL,{
       method: 'POST',
       headers: header,
       body: JSON.stringify(Data)
     })
     .then((Response)=> Response.json())
     .then((Response)=>{
      if(Response=="No Results Found"){console.log("No Result!")}
     else {
      // navigation.navigate('EventPage');
      // return Response;
      for (var i=0 ; i<Response.length ; i++){
      tempticket.push(Response[i]);

      }
      
     navigation.navigate('EventPage',{ allevent: tempticket, donor:donor});
     }
      })
     .catch((error)=>{
       console.error("ERROR FOUND :" + error);
     })
    
   
  }
  const GetInfo = () => {
    var APIURL = "http://"+ip+":80/api/sodality.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
        //  alert(donorId);
    var Data ={
      did:donorId
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
      // for (var i=0 ; i<Response.length ; i++){
      //   this.setNotification(Response[i]);
      // }
      setNotification(Response);
      getProfile();
      if(notification.length > 0){
      navigation.navigate('Association',{notification: notification});
      }
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  // const getAllCases = () => {
  //   for (var i=0 ; i<notification.length ; i++){
  //     GetCases(notification[i][0]);
  //     // alert(notification[i]);
  
  //   }
  //   setCase(Allcase);
  //   if(Allcase != null){
  //     navigation.navigate('AllCases',{cases:case1});
  //     // alert(case1);
  //     }
  //   // alert(Allcase);
    
  // }
  const getAllCases = () => {
    var APIURL = "http://"+ip+":80/api/selectSociety.php";
    var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };
var Data ={
user: donor
};
fetch(APIURL,{
method: 'POST',
headers: headers,
body: JSON.stringify(Data)
})
.then((Response)=> Response.json())
.then((Response)=>{
if(Response == false){
alert("Their is no Cases");
}
else{
selectSociety(Response);
    for (var i=0 ; i<socity.length ; i++){
      GetCases(socity[i][0]);
  
    }

    setCase(Allcase);
    if(Allcase != null){
      navigation.navigate('AllCases',{cases:case1});
      // alert(case1);
      }
    }
  })
  .catch((error)=>{
    console.error("ERROR FOUND" + error);
  })
    // alert(Allcase);
    
  }
  const GetCases = (id) => {
    var APIURL = "http://"+ip+":80/api/getFinalCase.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      Sid:id
    };
      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
     if(Response==false){console.log("No Result!")}
    else {
      // alert(Response);
      for (var i=0 ; i<Response.length ; i++){
          Allcase.push(Response[i]);
        
        }
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
//  if(loading){
//   getProfile();
//   setLoading(false);
//  }
  return (
    <Notification.Provider value={notification}>
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor='#ff4081' barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#c94f7c">
            <View style={styles.slide}>
            <Image
              source={require('../assets/banners/sss.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
             <View style={styles.slide}>
            <Image
              source={require('../assets/banners/ssss.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/sup.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/supp.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/ss.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../assets/banners/suppp.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={()=>GetInfo()}>
          <View style={styles.categoryIcon}>
          {/* <MaterialCommunityIcons
              name="account-group-outline"
              size={35}
              color="#FFF"
            /> */}
            <Image
              source={require('../assets/banners/network.png')}
            
              style={styles.sliderImagee}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Associations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>GetAllEvent()}>
          <View style={styles.categoryIcon}>
          <Image
              source={require('../assets/banners/work-time.png')}
            
              style={styles.sliderImagee}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Events</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => getAllCases()}>
          <View style={styles.categoryIcon}>
            {/* <MaterialCommunityIcons name="food" size={35} color="#FF6347" /> */}
            <Image
              source={require('../assets/banners/cases.png')}
            
              style={styles.sliderImagee}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Cases</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, {marginTop: 10}]}>
        {/* <TouchableOpacity style={styles.categoryBtn}  onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Image
              source={require('../assets/banners/m.png')}
            
              style={styles.sliderImagee}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Announcement</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>navigation.navigate('Credit')}>
          <View style={styles.categoryIcon}>
            
            <Image
              source={require('../assets/banners/donation.png')}
            
              style={styles.sliderImagee}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Donate Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() =>navigation.navigate('Email')} >
          <View style={styles.categoryIcon}>
          
            <Image
              source={require('../assets/banners/com.png')}
            
              style={styles.sliderImagee}
            />
          </View>
          <Text style={styles.categoryBtnTxt}>My opinion</Text>
        </TouchableOpacity>
      </View>
      
      {/* <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#c94f7c',
          }}>
          Recently advertisements
        </Text>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner2.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Food Place</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner3.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Food Place</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={require('../assets/banners/food-banner4.jpg')}
              resizeMode="cover"
              style={styles.cardImg}
            />
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Amazing Food Place</Text>
            <StarRating ratings={4} reviews={99} />
            <Text style={styles.cardDetails}>
              Amazing description for this amazing place
            </Text>
          </View>
        </View>
      </View> */}
      {/* <Text
          style={{
            alignSelf: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            color: '#c94f7c',
          }}>
          My Associations
        </Text> */}
    </ScrollView>
    </Notification.Provider>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 250,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  
    borderRadius: 8,
  },
  sliderImagee: {
    height: '70%',
    width: '70%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#c94f7c' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#c94f7c',
  },
  cardsWrapper: {
    marginTop: 20,
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#c94f7c',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardImgWrapper: {
    flex: 1,
  },
  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#c94f7c',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardDetails: {
    fontSize: 12,
    color: '#444',
  },
});