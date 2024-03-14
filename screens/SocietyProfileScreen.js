import React, { useEffect } from 'react';
import {View, SafeAreaView, StyleSheet,ImageBackground,TextInput,Button,TouchableOpacity, Linking, Image, FlatList, ToastAndroid,  Dimensions} from 'react-native';
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
import AsyncStorage from '@react-native-community/async-storage';
import Cardss from '../components/Cardss';
import Cases from '../components/Cases';
import { Calendar } from 'react-native-calendars';
import {launchImageLibrary} from 'react-native-image-picker';
// import Share, { Button } from 'react-native-share';

import files from '../assets/filesBase64';
import { useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ShowStudents from '../components/ShowStudent';
    
    const SocietyProfileScreen= ({navigation}) => {
      useEffect(() => {
        GetSocietyInfo();
      },[]);
      const sectionStyle = StyleSheet.create(
        { 
          text:{
          fontSize: 12,
      },
      button: {
        backgroundColor: '#555055',
        width: 70,
        borderRadius: 5,
        height: 30,
        marginRight:20,
        alignItems: 'center',
      },
      rows:{
        flexDirection:'row',
        marginRight: 10,
        alignItems: 'center',
        marginTop:10,

    },
    textButton: {
      fontSize:14,
      color:'#fff',
      margin:5,

    },
      line: {
          color: 'gray',
          fontSize: 12,
      },
      container:{
          flexDirection:'row',
          marginRight: 10,
          alignItems: 'center',

      },
      iconStyle: {
          marginRight: 2,
      },
      image: {
          height: 100,
          width: 100,
          borderRadius:50,
          opacity: 0.9,
          margin: 10,
  
      },
      setImage: {
          width: 150,
          alignItems: 'center',
      },
      header: {
          fontSize: 18,
      },
      details: {
          alignItems: 'flex-start',

      },}
      );
        const stylesCase = StyleSheet.create({
            body: {
                //backgroundColor: '#ffffff',
                padding: 5,
                fontFamily: 'sanserf',
                height: 900,
                alignItems: 'center',
                margin: 20,
              },
              text: {
                fontSize: 20,
                marginBottom:5,
                fontStyle: 'italic',
                color: 'black',
              },
              text0: {
                fontSize: 20,
                fontStyle: 'italic',
                margin: 10,
                color: 'black',
              },
              input: {
                width: 300,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'gray',
                marginLeft:40,
                // textAlign: 'center',
                // marginBottom: 10,
                // marginRight:10,
              },
              row: {
               flexDirection: 'row',
               marginBottom: 20,
              },
              action: {
                flexDirection: 'row',
                marginTop: 5,
                borderBottomWidth: 1,
                borderBottomColor: '#f2f2f2',
                paddingBottom: 5,
                marginLeft:40,
            },
              button: {
                backgroundColor: '#ce25ce',
                width: 300,
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 5,
                marginLeft:40,
                height: 50,
                alignItems: 'center',
              },
              textInput: {
                flex: 1,
                width: 100,
                marginTop: Platform.OS === 'ios' ? 0 : -12,
                paddingLeft: 30,
                color: 'gray',
            },
            docs: {
              // flex:1,
              width: 300,
              height: 50,
              borderRadius: 5,
              borderWidth:1,
              borderColor: 'gray',
              alignItems:'center',
              // paddingLeft: 10,
              // paddingTop:10,
              backgroundColor:'#d05ce3'
          },
              image: {
                width: 100,
                height: 100,
                marginRight:200,
              },
        });
        const data = useRoute();
        const ip = global.ip;
        const year = useState('1');
         const [email,setEmail] = useState(data.params.email);
        const [ref,setRef] = useState(global.ref);
        //const id=3;
        const University = useState('');
        const [selected,setSelected] = useState(0);
        const [isloading,setLoading] = useState(true);
        const [cases,setCases] = useState([]);
        const [SocietyCase, setSocietyCase] = useState([]);
        const [events,setEvents] = useState([]);
        const [eventText,setEventText] = useState(['','Event Name', '__/__/__', 'Location', "__:__"]);
        const [infoS,setInfoS] = useState([]);
        const [student, setStudent] = useState('');
         const [allDonor, setAllDonor] = useState([]);
        const [donation, setDonation] = useState([]);
        const [allStudent, setAllStudent] = useState([]);
        // const [event2,setEvent2] = useState(new Date());
        

        const [money, setMoney] = useState();
        const [des, setDes] = useState('');
        const [Pic, setPic] = useState('https://i.stack.imgur.com/l60Hf.png');
        const onPressButon = () => {
          setSelected(!selected);
        };
        setToastMessage = msg => {
          ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
      };
        const  uploadImage = () => {
          // var id=await AsyncStorage.getItem('UID');
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
              // UpdateUserImage(Pic, id);
            }
        
          });
        
        }
        const logOut = async () => {
          navigation.navigate('SplashScreen');
           await firebase.auth().signOut().then(async() => {
           await AsyncStorage.removeItem('UID');
          //  navigation.navigate('SplashScreen');
            }).catch((err) =>{
           console.log(err);
           })
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
            return(<View style={styles.body}>
                <Text style={stylesCase.text}>         Add Case                                     </Text>
                <View style={stylesCase.row}>
                   <TextInput style={[stylesCase.input,{height:50},]} placeholder='Student Email' maxLength={800} onEndEditing={(e)=>setStudent(e.nativeEvent.text)} >
                    {student}
                   </TextInput>
                   </View>
                 {/* <StatusBar backgroundColor='#ff4081' barStyle="light-content"/> */}
                 <View style={stylesCase.row}>
                  {/* <Text style={styles.text}>Mony:        </Text> */}
                  <TextInput style={stylesCase.input} placeholder='Amount' maxLength={10} onEndEditing={(e)=>setMoney(e.nativeEvent.text)}>{money}</TextInput>
                  </View>
                   <View style={stylesCase.row}>
                   <TextInput style={[stylesCase.input,{height:50},]} placeholder='Description' maxLength={800} onEndEditing={(e)=>setDes(e.nativeEvent.text)}>
                    {des}
                   </TextInput>
                   </View>
                <View style={stylesCase.action}>
                <TouchableOpacity style={stylesCase.docs} onPress={()=> uploadImage()}><Text style={stylesCase.text0}>Choose Documents</Text></TouchableOpacity>
                              {/* <TextInput 
                                  placeholder="your docs"
                                  style={styles.textInput}
                                  editable = {false}
                                  autoCapitalize="none"
                                  onChangeText={(des)=>setDoc({des})}
                              /> */}
                 </View>
                  
                  <TouchableOpacity  onPress={()=>AddCase()} style={stylesCase.button} activeOpacity={0.9}>
                       <Text style={stylesCase.text0}>Save</Text>
                   </TouchableOpacity>
                   
        
                </View>);
          }
          else if (isLoggedIn==2){
            if (allStudent.length == 0){
              alert('Their is no Student');
            }
            return(<View style={styles.infoBoxWrapper}>
              <FlatList data={allStudent} 
                renderItem={({item}) => {
                    return <ShowStudents info={item} />;
                    
                }}
                showsVerticalScrollIndicator={false}
                />
           
            </View>);
          }
          else if (isLoggedIn==3){
            if (allDonor.length == 0){
              alert('Their is no Donor');
            }
            return(<View style={styles.infoBoxWrapper}>
              <FlatList data={allDonor} 
                renderItem={({item}) => {
                    return (<View>
                      <View style={sectionStyle.container}>
                          <View style={sectionStyle.setImage}>
                          {/* <TouchableOpacity onPress={()=>navigation.navigate('AssHome',{email:email,id:id})}></TouchableOpacity> */}
                          <Image style={sectionStyle.image} source={{uri: item[3]}}/>
                          </View>
                          <View style={sectionStyle.details}>
                          <Text style={sectionStyle.header}>{item[1]}</Text>
                          <View style={sectionStyle.rows}>
                              <Icon name='email' size={22} color={'#000'}/>
                              <Text style={sectionStyle.header}> {item[2]}</Text>
                          </View>
                          <View style={sectionStyle.rows}>
                          <TouchableOpacity onPress={() => removeDonor(item[0])} style={sectionStyle.button} activeOpacity={0.9}>
               <Text style={sectionStyle.textButton}>Delete</Text>
           </TouchableOpacity>
           {/* <TouchableOpacity  style={sectionStyle.button} activeOpacity={0.9}>
               <Text style={sectionStyle.textButton}>  </Text>
           </TouchableOpacity> */}
                          </View>
                          </View>
                      </View>
                      <View>
                          <Text style={sectionStyle.line}>     _____________________________________________________________</Text>
                      </View> 
                      </View>);
                    
                }}
                showsVerticalScrollIndicator={false}
                />
           
            </View>);
          }
          else if (isLoggedIn==4){
            return(<View style={styles.infoBoxWrapper}>
              <FlatList data={events} 
                renderItem={({item}) => {
                    return (<Cardss navigation={navigation} info={item} colorC={'#fff'} colorT={'#000'} butName={'Editing'}/>);
                    
                }}
                showsVerticalScrollIndicator={false}
                />
           
            </View>);
          }
         
          else if (isLoggedIn==5){
            return(<View style={styles.infoBoxWrapper}>
              <FlatList data={cases} 
              extraData={ref}
                renderItem={({item}) => {
                    return (<Cases info={item} />);
                    
                }}
                showsVerticalScrollIndicator={false}
                />
           
            </View>);
          }
          else if (isLoggedIn==6){
            <Calendar
  // Initially visible month. Default = now
  initialDate={'2012-03-01'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2012-05-10'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2012-05-30'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={day => {
    console.log('selected day', day);
  }}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={day => {
    console.log('selected day', day);
  }}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={month => {
    console.log('month changed', month);
  }}
  // Hide month navigation arrows. Default = false
  hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={direction => <Arrow />}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={true}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  disableArrowLeft={true}
  // Disable right arrow. Default = false
  disableArrowRight={true}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter
  renderHeader={date => {
    /*Return JSX*/
  }}
  // Enable the option to swipe between months. Default = false
  enableSwipeMonths={true}
/>
          }
          else if (isLoggedIn==7){
            return(<View style={styles.infoBoxWrapper}>
              <FlatList data={SocietyCase} 
                renderItem={({item}) => {
                    return (<Cases2 info={item} />);
                    
                }}
                showsVerticalScrollIndicator={false}
                />
           
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
            Sid:email,
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
        const AddCase = () => {
          alert(infoS[0]+student+money+des);
          var APIURL = "http://"+ip+":80/api/AddCaseFromSociety.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0],
            student:student,
            money:money,
            des:des,
            Pic:Pic,
            Caseid:null
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
            alert(Response);
            setStudent('');
            setMoney('');
            setDes('');
            // setSelected(1);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        const GetCaseStudent = () => {
          //setSelected(2);
          var APIURL = "http://"+ip+":80/api/getSocietyCase.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0]
          };
            fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=> Response.json())
          .then((Response)=>{
           if(Response==false){
            console.log("No Result!");
            setSelected(5);
          }
          else {
            setCases(Response);
            setSelected(5);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        const GetCaseSociety = () => {
          //setSelected(2);
          var APIURL = "http://"+ip+":80/api/getFinalCase.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0]
          };
            fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=> Response.json())
          .then((Response)=>{
           if(Response==false){
            console.log("No Result!");
            setSelected(7);
          }
          else {
            setSocietyCase(Response);
            setSelected(7);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        
        const GetDonation = () => {
          //setSelected(2);
          var APIURL = "http://"+ip+":80/api/getDonationforSociety.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            S_id:infoS[0]
          };
            fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=> Response.json())
          .then((Response)=>{
           if(Response==false){
            console.log("No Result!");
            
          }
          else {
            setDonation(Response);
            if(donation != null){
            navigation.navigate('Donation',{donations: donation});
            }
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }

        const GetStudent = () => {
          //setSelected(2);
          var APIURL = "http://"+ip+":80/api/getSocietyStudent.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0]
          };
            fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=> Response.json())
          .then((Response)=>{
           if(Response==false){
            console.log("No Result!");
            setSelected(2);
          }
          else {
            setAllStudent(Response);
            setSelected(2);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        const GetAllDonor = () => {
          //setSelected(3);
          var APIURL = "http://"+ip+":80/api/getSocietyDonor.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0]
          };
            fetch(APIURL,{
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
          })
          .then((Response)=> Response.json())
          .then((Response)=>{
           if(Response==false){
            console.log("No Result!");
            setAllDonor([]);
            setSelected(3);
          }
          else {
            setAllDonor(Response);
            setSelected(3);
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        const removeDonor = (donor) => {

          var APIURL = "http://"+ip+":80/api/removeSubScribe.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0],
            donor:donor,
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
            alert('Deleted Successfully');
            GetAllDonor();
          }
           })
          .catch((error)=>{
            console.error("ERROR FOUND" + error);
          })
        
        }
        
        const GetEvents = () => {
          setSelected(4);
          var APIURL = "http://"+ip+":80/api/getSocietyEvents.php";
                var headers = {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                  };
          var Data ={
            Sid:infoS[0]
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
            setSelected(4);
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
          <FontAwesome name="comment" color="gray" size={25} onPress={() => navigation.navigate('SocietyChat')}/>
        </View>
      </View>
    </View>
    <View style={styles.row}>
          <Text>     </Text>
          <Icon name="email" color="#004d40" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[2]}</Text>
        </View>
        <View style={styles.row}>
            <Text>     </Text>
          <Ionicons name="location" color="#00e676" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[3]}</Text>
        </View>
        <View style={styles.row}>
        <Text>      </Text>
          <FontAwesome name="phone" color="green" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[5]}</Text>
        </View>
        <View style={styles.row}>
        <Text>      </Text>
          <FontAwesome name="heart" color="red" size={20} />
          <Text style={{color:"#000000", marginLeft: 2}}>{infoS[6]} followers</Text>
        </View>
        
      <View style={{ flexDirection:"row", justifyContent:"space-between",
      marginLeft: 2,marginRight: 2,
       alignItems: "center", }}>
      <TouchableOpacity  onPress={() => navigation.navigate('EditProfileSociety',{id:infoS[0],email:infoS[2],name:infoS[1],Pic:infoS[7],phone:infoS[5],address:infoS[3],facebook:infoS[4]})} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Edit Profile</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => navigation.navigate('TimeSelect', {Sid:infoS[0],info:eventText, action:1})} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Add Event</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => GetDonation()} style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>Donations</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => logOut() } style={styles.button} activeOpacity={0.9}>
               <Text style={styles.textButton}>signOut</Text>
           </TouchableOpacity>
      
      </View>
      <View style={styles.menuWrapper}>
       <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
        <TouchableRipple onPress={() =>setSelected(1)}>
          <View style={styles.menuItem}>
         <FontAwesome
              name="user-plus"
              size={30}
              color="#494949"
            />
            {/* <Text style={styles.menuItemText}>Your Favorites</Text> */}
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => GetStudent()}>
        {/* GetStudent() */}
          <View style={styles.menuItem}>
          <FontAwesome
              name="graduation-cap"
              size={30}
              color="#005005"
            />
            {/* <Text style={styles.menuItemText}>Payment</Text> */}
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => GetAllDonor()}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="account-heart-outline"
              size={30}
              color="#ff1744"
            />
          
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => GetEvents()}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="sort-calendar-ascending"
              size={30}
              color="#00227b"
            />
            </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => GetCaseStudent()}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="hand-coin"
              size={30}
              color="#00227b"
            />
            </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => GetCaseSociety()}>
          <View style={styles.menuItem}>
          <MaterialCommunityIcons
              name="bitcoin"
              size={30}
              color="#00227b"
            />
            </View>
        </TouchableRipple>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
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
    export default SocietyProfileScreen;
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
            paddingVertical: 5,
            paddingHorizontal: 17,
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
            backgroundColor: '#c492a4',
            width: 98,
            borderRadius: 5,
            height: 40,
            marginRight:2,
            marginLeft:2,
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
       
      const Cases2 = ({info}) => {
          // console.log(info);
          
          const [money, setMoney] = useState(0);
const height = Dimensions.get('window').height;
          const [des, setDes] = useState('');
          const radius = 20;
      const width = Dimensions.get('window').width;
      const styles = StyleSheet.create({
          screenContainer: {
              flex: 1,
              justifyContent: "center",
              padding: 10
            },
            input: {
              width: 310,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#000',
            },
            input1: {
              width: 150,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#000',
              marginRight:10,
            },
          container: {
              width: width -20,
              alignItems: 'center',
              margin: 20,
              // marginLeft: 10,
              },
          cardContainer: {
              width: width -25,
              height: 350,
              borderRadius:radius,
              shadowColor:'#000',
              shadowOffset:{
                  width: 5,
                  height: 5,
              },
              shadowOpacity: 0.75,
              shadowRadius: 5,
              elevation: 9,
              marginTop: 10,
              backgroundColor: '#fafafa',//#9474cc
              marginRight:12
      
      
      
          },
          image: {
              height: 80,
              width: width -25,
              borderTopLeftRadius:radius,
              borderTopRightRadius: radius,
              opacity: 0.9,
      
          },
          text:{
              fontSize: 20,
              fontWeight: '600',
          },
          details:{
             fontSize: 15,
             fontWeight: '180',
          },
          info: {
              marginHorizontal: 10,
              marginVertical: 5,
      
      
          },
          labelStyles: {
              flexDirection: 'column',
              marginTop: 10,
              marginLeft:10,
              justifyContent: 'space-between',
             
       },
       button: {
          borderWidth:1,
          borderColor:'#000',//'#9c64a6'
          alignItems:'center',
          justifyContent:'center',
          margin:5,
          height:40,
          width:140,
          backgroundColor:'#b0bec5',
          borderRadius: 10,
        },
        row: {
          flexDirection: 'row',
          marginBottom: 20,
          alignItems:'center',
         },
        baseText: {
          fontWeight: 'bold',
          fontSize:18,
          color:'#000',//'#9c64a6'
        },
      });
          const image= require('../assets/banners/e.jpg');
          const [Pic,setPic] = useState(info[6]);
          const [isImage, setImage] = useState(false);
          const [Edit1, setEdit] = useState(true);
          // const AddCase = () => {
          //     var APIURL = "http://"+global.ip+":80/api/AddCaseFromSociety.php";
          //           var headers = {
          //               'Accept' : 'application/json',
          //               'Content-Type' : 'application/json'
          //             };
          //      var Data={
          //     student:info[3],
          //     money:info[4],
          //     des:info[5],
          //     Pic:info[9],
          //     Sid:info[1],
          //     Caseid:info[0],
          //     };
          //       fetch(APIURL,{
          //       method: 'POST',
          //       headers: headers,
          //       body: JSON.stringify(Data)
          //     })
          //     .then((Response)=> Response.json())
          //     .then((Response)=>{
          //      if(Response=="No Results Found"){console.log("No Result!")}
          //     else {
          //       alert(Response);
                
          //     }
          //      })
          //     .catch((error)=>{
          //       console.error("ERROR FOUND" + error);
          //     })
            
          //   }
          
          const deleteCase = () => {
            var APIURL = "http://"+global.ip+":80/api/deleteSocCase.php";
                  var headers = {
                      'Accept' : 'application/json',
                      'Content-Type' : 'application/json'
                    };
             var Data={
           Cid:info[0],
            };
              fetch(APIURL,{
              method: 'POST',
              headers: headers,
              body: JSON.stringify(Data)
            })
            .then((Response)=> Response.json())
            .then((Response)=>{
             if(Response==false){alert("Can't deleted!");}
            else {
              alert("Delete Successfully");
              global.ref = true;
              // setSelected(1);
            }
             })
            .catch((error)=>{
              console.error("ERROR FOUND" + error);
            })
          
          }
          const UpdateCase = () => {
            
            var APIURL = "http://"+global.ip+":80/api/UpdateCaseSociety.php";
                  var headers = {
                      'Accept' : 'application/json',
                      'Content-Type' : 'application/json'
                    };
             var Data={
            money:money,
            des:des,
            Pic:Pic,
            Caseid:info[0],
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
              alert(Response);
              global.ref = true;
              setEdit(true);
              // setSelected(1);
            }
             })
            .catch((error)=>{
              console.error("ERROR FOUND" + error);
            })
          
          }


          const  uploadImage = async() => {
            var id=await AsyncStorage.getItem('UID');
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
            if(isImage){
              return(
                  <View style={[styles.container,{height:Math.round(Dimensions.get('window').height),width:Math.round(Dimensions.get('window').width)}]}>
                      <TouchableOpacity onPress={()=>setImage(false)}><Icon name='exit-to-app' size={30}/></TouchableOpacity> 
                       <Image 
                source={{uri: info[9]}}
                style={{width:width-50,height:height-50,}}
                />
                  </View>
              )
          }
          
          return (
          <View style={styles.container}>
            <View style={styles.cardContainer}>
              
              <View style={styles.info}>
              <View style={styles.labelStyles} >
              {Edit1? (<Text style={styles.text}>{info[10]}</Text>) : (<View></View>)}
              {/* <Text style={styles.details}>Nablus city</Text> */}
              </View>
       <View style={styles.labelStyles} >
              {Edit1? (<IconLabel name="users"  label={"Student Email: "+info[3]} textColor={'#000'} />):(<View></View>)}
              </View >
              <View style={styles.labelStyles}>
                  {Edit1?(<IconLabel name="money" label={info[4]}  textColor={'#000'} />):<TextInput style={styles.input} placeholder={'Money'}
                  onChangeText={(val)=>setMoney(val)}></TextInput>}
                  </View>
                  <View style={styles.labelStyles}>
                  {Edit1?( <Text style={styles.text}>Description: {info[5]}</Text>):<TextInput style={styles.input} placeholder={'Description'}
                  onChangeText={(val)=>setDes(val)}></TextInput>}
                 
                  </View>
                  {/* <View style={styles.labelStyles}>
                  <IconLabel name='hourglass-end'  label="An hour and a half" />
                  </View> */}
                  <View style={styles.labelStyles}>
                  {Edit1?( <IconLabel name="university"  label={info[6]+"--"+info[7]} textColor={'#000'} />):(<View></View>)}
                  
                  </View>
                  {Edit1?(<View style={styles.labelStyles} onPress={()=>setImage(true)}>
                    <TouchableOpacity onPress={()=> setImage(true)}>
                  <IconLabel name="image"  label={' Click Document'} textColor={'#000'} onPress={()=> setImage(true)} /></TouchableOpacity>
                  </View>):(<View></View>)}
                  {Edit1?
                  (<View style={styles.row}>
                  <TouchableOpacity onPress={() =>setEdit(!Edit1)}
                  style={styles.button}
                  >
                 <Text style={styles.baseText}> Edit </Text>
                 </TouchableOpacity>
                 <TouchableOpacity onPress={() =>deleteCase()}
                  style={styles.button} >
                 <Text style={styles.baseText}> Delete </Text>
                 </TouchableOpacity>
                 </View>)
                 :(<View style={styles.row}><TouchableOpacity onPress={() =>UpdateCase()}
                 style={styles.button}
                 >
                <Text style={styles.baseText}> Save </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() =>uploadImage()}
                 style={styles.button} >
                <Text style={styles.baseText}> Update Document </Text>
                </TouchableOpacity></View>)}
              </View>
      
            </View>
            </View>
          );
      };
      