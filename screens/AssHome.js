import React from 'react';
import {View, SafeAreaView, StyleSheet,ImageBackground,Button,TouchableOpacity, Image, FlatList, Linking} from 'react-native';
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
import Students from '../components/Students';
import Cardss from '../components/Cardss';
// import Share, { Button } from 'react-native-share';

import files from '../assets/filesBase64';
import { useState } from 'react';
 
    const AssHome= ({navigation}) => {
      
        const data = useRoute();
        const year = useState('1');
        const email = data.params.email;
        const id = data.params.id;
        const donor = global.name;
        const ip = global.ip;
        const University = useState('najah');
        const [selected,setSelected] = useState(false);
        const [isloading,setLoading] = useState(true);
        const [cases,setCases] = useState([]);
        const [events,setEvents] = useState([]);
        const [infoS,setInfoS] = useState([]);
        const onPressButon = () => {
          setSelected(!selected);
        };
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
            return(<View style={styles.infoBoxWrapper}>
              <Students students={cases} navigation={navigation}/>
           
            </View>);
          }
          else if (isLoggedIn==2){
            return(<View style={styles.infoBoxWrapper}>
              <FlatList data={events} 
                renderItem={({item}) => {
                    return <Cardss info={item} donor={donor} colorC={'#fff'} colorT={'#000'} butName={'Attending the Event'}/>;
                    
                }}
                showsVerticalScrollIndicator={false}
                />
           
            </View>);
          }
          else if (isLoggedIn==3){
            return( <View style={styles.aboutContainer}>

              <View style={styles.aboutLayout}>
                <Text style={styles.aboutSubHeader}> About AS</Text>
                <Text style={[styles.paraStyle, styles.aboutPara]}>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit. Aenean commodo ligula eget dolor.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                  commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer
                  adipiscing elit. Aenean commodo ligula eget dolor.
                </Text>
              </View>
        
              <Text style={styles.mainHeader}> Follow as on Social Network </Text>
        
              <View style={styles.menuContainer}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() =>
                    Linking.openURL("https://www.instagram.com/thapatechnical/")
                  }
                  >
                  {/* <Image
                    style={styles.iconStyle}
                    source={require('../assets/banners/Logo.png')}
                  /> */}
                </TouchableOpacity>
        
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() =>
                    Linking.openURL(
                      "https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                    )
                  }>
                  {/* <Image
                    style={styles.iconStyle}
                    source={require('../assets/banners/instagram.png')}
                  /> */}
                </TouchableOpacity>
        
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => Linking.openURL("https://discord.gg/AN8ThRBXtY")}>
                  {/* <Image
                    style={styles.iconStyle}
                    source={require('../assets/banners/twitter.png')}
                  /> */}
                </TouchableOpacity>
              </View>
            </View>);
          }
          return <GuestGreeting />;
        }
        const GetSocietyInfo = () => {
          var APIURL = "http://"+ip+":80/api/getsocityInfo.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:email
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
            setInfoS(Response);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        const GetCase = () => {
         
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
           if(Response[0]=='not found'){console.log("No Result!")}
          else {
            setCases(Response);
            setSelected(1);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        const GetEvents = () => {

          var APIURL = "http://"+ip+":80/api/getSocietyEvents.php";
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
           if(Response=="No Results Found"){console.log("No Result!")}
          else {
            setEvents(Response);
            setSelected(2);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        if( isloading ){
          GetSocietyInfo();
          setLoading(false);
        }
        return(
          <SafeAreaView style={styles.container}>
            
          <View style={styles.userInfoSection}>
            
         <View style={{flexDirection: 'row'}}>
        <Avatar.Image 
         source={{uri: infoS[7]}}
          size={100}
        />
        <View style={{marginLeft: 20}}>
          <Title style={[styles.title, {
            marginTop:15,
            marginBottom: 5,
          }]}>{infoS[1]}</Title>
          <FontAwesome name="facebook-square" color="blue" size={25} onPress={() => Linking.openURL('https://www.facebook.com/aya.hamdan.2001')}/>
          {/* <Caption style={styles.caption}>{infoS[3]}</Caption> */}
        </View>
      </View>
    </View>
    <View style={styles.row}>
          <Text>  </Text>
          <Icon name="email" color="#00897b" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[2]}</Text>
        </View>
        <View style={styles.row}>
        <Text>  </Text>
          <Ionicons name="location" color="#00897b" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[3]}</Text>
        </View>
        <View style={styles.row}>
        <Text>   </Text>
          <FontAwesome name="phone" color="green" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[5]}</Text>
        </View>
        <View style={styles.row}>
          <Text>   </Text>
          <FontAwesome name="heart" color="#00897b" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[6]} followers</Text>
          
        </View>
        {/* <View style={styles.row}>
        <Text>          </Text>
          <FontAwesome name="facebook-square" color="blue" size={25} onPress={() => Linking.openURL('http://google.com')}/>
        </View> */}
      <View style={{ flexDirection:"row", justifyContent:"space-between",
       alignItems: "center", marginLeft: 20,marginRight: 180}}>
      <TouchableOpacity  onPress={() => GetCase()} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Cases</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => GetEvents()} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Events</Text>
           </TouchableOpacity>
      
      </View>
      <Text> ______________________________________________________</Text>
      <View >
      <Greeting isLoggedIn={selected} />
      {/* {selected ? <Editing/>:
     ( 
          <View style={styles.infoBoxWrapper}>
            <Students/>
         
          </View>)
          } */}
          </View>
      
          </SafeAreaView>

    
        );
    };
    export default AssHome;
    const styles = StyleSheet.create(
      {
      aboutContainer: {
        display: "flex",
        alignItems: "center",
      },
      row: {
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft:50,
      },
      imgStyle: {
        width: 150,
        height: 150,
        borderRadius: 100,
      },
      mainHeader: {
        fontSize: 18,
        color: "#344055",
        textTransform: "uppercase",
        fontWeight: "500",
        marginTop: 50,
        marginBottom: 10,
        fontFamily: "JosefinSans_700Bold",
      },
      paraStyle: {
        fontSize: 18,
        color: "#000000",
        paddingBottom: 30,
      },
      aboutLayout: {
        // backgroundColor: "#005005",
        paddingHorizontal: 30,
        marginVertical: 30,
      },
      aboutSubHeader: {
        fontSize: 18,
        color: "#000000",
        textTransform: "uppercase",
        fontWeight: "500",
        marginVertical: 15,
        fontFamily: "JosefinSans_700Bold",
        alignSelf: "center",
      },
      aboutPara: {
        color: "#000000",
      },
      menuContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
      },
    
      iconStyle: {
        width: "100%",
        height: 50,
        aspectRatio: 1,
      },
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
            backgroundColor: '#005005',
            width: 120,
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