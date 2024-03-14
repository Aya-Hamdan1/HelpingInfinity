import React from 'react';
import {View, SafeAreaView, StyleSheet,ImageBackground,Button,ToastAndroid,FlatList,
  TouchableHighlight, Modal} from 'react-native';
import { useCallback, useEffect, useState } from "react";
import {Avatar,Title,Caption,Text,TouchableOpacity, TouchableRipple} from 'react-native-paper';
// import IconLabel from '../components/IconLabel';
// import { NavigationContainer } from '@react-navigation/native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../components/context';
import DonorEvent from '../components/DonorEvent';
import Section from '../components/Section';
import { Calendar } from 'react-native-calendars';
// import Share, { Button } from 'react-native-share';

import files from '../assets/filesBase64';
// import moment from 'moment';
// import { useRoute } from '@react-navigation/native';
// import { compareAsc, format, getTime } from 'date-fns'

const ProfileScreen = ({navigation}) => {
 

  
  const { signOut, toggleTheme } = React.useContext(AuthContext);
  const [Pic, setPic] = React.useState("https://i.stack.imgur.com/l60Hf.png")

  let markedDatesArray = [new Date()];
  const donor = global.name;
  const ip = global.ip;
  // const donor = 'aya@gmail.com';
  const [society, setSociety] = useState([]);
  const [info, setInfo] = useState([]);
  const [isLoading,setLoading] = React.useState(true);
  const [events, setEvents] = useState([]);
  const [showEvents,setShowEvents] = useState(0);
  const [showSocity,setShowSocity] = useState(false);
  const [donate, setDonate] = useState([]);
  const [date1, setDate] = useState(new Date('2023-01-05'));
  const [event2,setEvent2] = useState(new Date());
        
  let marked = [new Date(date1)];
  const styleD = StyleSheet.create(
    {
        text:{
            fontSize: 18,
            width:200,
            // borderLeftWidth:1,
            borderWidth:1,
            borderColor:'gray'
        },
        line: {
            color: 'gray',
            fontSize: 14,
        },
        container:{
            flexDirection:'row',
            marginRight: 10,
            alignItems: 'center',

        },
        header: {
          fontSize: 24,
      },
      details: {
          alignItems: 'flex-start',

      },
      row: {
        flexDirection: 'row',
        marginBottom: 20,
       },
      });
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
        setInfo(Response);
        setPic(info[3]);
          
    })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  }
  const GetDonation = () => {
    var APIURL = "http://"+ip+":80/api/getDonat.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
            
    var Data ={
      user:info[0]
    };
      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
     if(Response==false){alert("No Donation!")}
    else {
      // navigation.navigate('Society',{society: Response});
      setDonate(Response);
      setShowEvents(5);
      
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  const GetSocity = () => {
    var APIURL = "http://"+ip+":80/api/mySocity.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      user:donor
    };
      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
     if(Response=="No Results Found"){alert("No Result!")}
    else {
      // navigation.navigate('Society',{society: Response});
      setSociety(Response);
      setShowEvents(1);
      setShowSocity(true);
      
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  const GetEvent = () => {
    var APIURL = "http://"+ip+":80/api/getDonorEvents.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      user:info[0]
    };
      fetch(APIURL,{
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((Response)=> Response.json())
    .then((Response)=>{
     if(Response=="No Events!"){alert("No Result!")}
    else {
      setEvents(Response);
      GetTime();
      // setShowEvents(4);
      
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
    setEvent2(marked[0]);
    setDate(marked[0]);
        
  }
  const GetTime = () => {
    var APIURL = "http://"+ip+":80/api/getTimeEvents.php";
          var headers = {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            };
    var Data ={
      user:info[0]
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
      
      // alert(date1);
      for (let i = 0; i < Response.length; i++) {
        setDate(Response[i]);
        // alert(Response[i]);
        markedDatesArray.push({
          date: new Date(date1),
          dots: [
            {
              color: 'red',
            },
          ],
        });
        marked.push(new Date(date1));
      
        //  alert(markedDatesArray[0]);
      }
     
  
      
      
    }
     })
    .catch((error)=>{
      console.error("ERROR FOUND" + error);
    })
  
  }
  
  // const myCustomShare = async() => {
  //   const shareOptions = {
  //     message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
  //     url: files.appLogo,
  //     // urls: [files.image1, files.image2]
  //   }

  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     console.log(JSON.stringify(ShareResponse));
  //   } catch(error) {
  //     console.log('Error => ', error);
  //   }
  // };
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
      return(<FlatList data={society} 
        renderItem={({item}) => {
            return <Section navigation={navigation} id={item[0]} email={item[2]} name={item[1]} label={item[7]} sub={item[6]} location={item[3]}/>;
        }}
        showsVerticalScrollIndicator={false}
        // keyExtractor={(item) => item.id.toString()} 
        />);
    }
    else if (isLoggedIn==2){
      return(
        <View></View>
      );
    }
    else if (isLoggedIn==3){
      return(<FlatList data={events} renderItem={({item}) => {
        return <DonorEvent info={item} />;}}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item,index)=> index}
    />);
    }
    else if (isLoggedIn==4){
      return(
        <View animationType='fade'>
          <Calendar style={{borderRadius: 10, elevation: 4, margin:30}} maxDate={'2035-12-31'}
        // {markedDatesArray}
           markedDates= {{
            
            [date1]: { selected: true, selectedColor: "#d81b60" },
            [event2]: { selected: true, selectedColor: "#d81b60" },
            // [marked[0]]: { selected: true, selectedColor: "#d81b60" },
          }}
          />
        </View>
      );
    }
    else if (isLoggedIn==5){
      return(<FlatList data={donate} renderItem={({item}) => {
        return(  <View>
          <View style={styles.container}>
             
              <View style={styleD.details}>
                <View style={styleD.row}>
                  <Text style={styleD.text}>Name of Charity</Text>
                <Text style={styleD.text}>Amount of money</Text>
                </View>
                <View style={styleD.row}>
              <Text style={styleD.text}>{item[4]}</Text>
              <Text style={styleD.text} >{item[2]}</Text>
              </View>
              {/* <View style={styles.container}>
                  <IconLabel name='heart' label={sub} color='red' textColor={'#000'} />
                  <IconLabel name='paper-plane' label={location} color='green' />
                  
              </View> */}
              
              </View>
          </View>
          <View>
              <Text style={styles.line}>   _____________________________________________________</Text>
          </View> 
          </View>);}}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item,index)=> index}
    />);
    }
    return <GuestGreeting />;
  }
  if( isLoading ) {
    getProfile();
    
  }
  return (
    <SafeAreaView style={styles.container} >
<View style={styles.userInfoSection} >
      
        <View style={{flexDirection: 'row'}}>
          <Avatar.Image 
           source={{uri: Pic}}
            size={100}
          />
          <View style={{marginLeft: 20}}>
            <Title style={ [styles.title, {
              // marginTop:5,
              // marginBottom: 5,
            }]}>{info[1]}</Title>
          </View>
        </View>    
      </View>

      <View style={styles.userInfoSection}>
        {/* <View style={styles.row}>
          <Icon name="map-marker-radius" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>nablus</Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>+91-900000009</Text>
        </View> */}
        <View style={styles.row}>
          <Icon name="email" color="#000000" size={20}/>
          <Text style={{color:"#000000", marginLeft: 20}}>{info[2]}</Text>
        </View>
      </View>
      {/*  */}
      <View style={{ flexDirection:"row", justifyContent:"space-between",
                        alignItems: "center", marginLeft: 20,marginRight: 180}}>
      <Button  
                       onPress={() =>navigation.navigate('Edit Profile',{email:info[2],name:info[1],Pic:info[3]}) }
                        title="Edit profile" 
                        color="#002984" 
                        
                        
                    />  
       <Button  
                        // onPress={() => getProfile()} 
                        onPress={() => {signOut()}} 
                        title="Sign out"  
                        color="#002984"  
                        
                    />  
      </View>
     
      {/*  */}
       <View style={styles.menuWrapper}>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
        <TouchableRipple onPress={() => GetSocity()}>
          <View style={styles.menuItem}>
         <MaterialCommunityIcons
              name="account-group-outline"
              size={35}
              color="#494949"
            />
            {/* <Text style={styles.menuItemText}>Your Favorites</Text> */}
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => GetDonation()}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="cash-multiple"
              size={35}
              color="#005005"
            />
            {/* <Text style={styles.menuItemText}>Payment</Text> */}
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={()=>{GetEvent(),setShowEvents(3)}}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="account-heart-outline"
              size={35}
              color="#ff1744"
            />
          
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() =>{ GetEvent(),setShowEvents(4)}}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="sort-calendar-ascending"
              size={35}
              color="#00227b"
            />
            </View>
        </TouchableRipple>
        
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>

<Greeting isLoggedIn={showEvents} />
     {/*  */}
     {/* {showEvents ? (
       <FlatList data={events} renderItem={({item}) => {
                  return <DonorEvent info={item} />;}}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item,index)=> index}
              />) :(
              
               <View style={styles.infoBoxWrapper}>
               <ImageBackground
                      source={require('../assets/banners/profile.png')}
                      style={styles.sliderImagee}
                      
                    />
              </View>)
     } */}
               
     
                {/* <FlatList data={society} 
                renderItem={({item}) => {
                    return <Section name={item[1]} label={require('../assets/banners/najah.jpg')} sub={item[6]} location={item[3]}/>;
                }}
                showsVerticalScrollIndicator={false}
                // keyExtractor={(item) => item.id.toString()} 
                /> */}

     
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  userInfoSection: {
    paddingHorizontal: 10,
    marginBottom: 10,
    
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
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
  
 

});