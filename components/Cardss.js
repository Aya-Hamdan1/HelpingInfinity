import React from 'react';
import { useCallback, useEffect, useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image,TouchableOpacity, Text, StyleSheet, Dimensions, Alert} from 'react-native';
// import { Button } from 'react-native-paper';
import IconLabel from './IconLabel';


const Cardss = ({navigation,info, donor, colorC, colorT, butName}) => {
    // console.log(info);
    // const {name, age, image, id} = info;
    const radius = 20;
const width = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 10
      },
    container: {
        width: width -20,
        alignItems: 'center',
        margin: 15,
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
        backgroundColor: colorC,//#9474cc



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
    marginTop:10,
    height:40,
    backgroundColor:'#fff',
    borderRadius: 10,
  },
  button1: {
    borderWidth:1,
    borderColor:'#000',//'#9c64a6'
    alignItems:'center',
    justifyContent:'center',
    marginTop:10,
    height:40,
    backgroundColor:'#ccc',
    borderRadius: 10,
    opacity:0.6
  },
  baseText: {
    fontWeight: 'bold',
    fontSize:18,
    color:'#000',//'#9c64a6'
  },
});
    const image= require('../assets/banners/e.jpg');
    const [Pic,setPic] = useState(info[6]);
    const [state, setState] = useState(info[7]);
    InsertRecord=(id)=>
    {
    
      
     if(butName == 'Editing'){
      navigation.navigate('TimeSelect',{info:info, action:0, Sid:info[8]});
     }
     else{
    var InsertAPIURL="http://"+global.ip+":80/api/subEvents.php";
    
    var headers={
    'Accept':'application/json',
    'Content-Type':'application/json'
    };
    
    var Data={
    event_id:id,
    user:donor
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
    // this.props.navigation.navigate("SignInScreen");
    })
    .catch((error)=>{
    console.log(JSON.stringify(error));
    alert("Error"+error);
    })
      
     }   
    }
    DeleteRecord=(id)=>
    {
    
    var InsertAPIURL="http://"+global.ip+":80/api/cancelEvent.php";
    
    var headers={
    'Accept':'application/json',
    'Content-Type':'application/json'
    };
    
    var Data={
    event_id:id,
    user:donor
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
    setState(0);
    // this.props.navigation.navigate("SignInScreen");
    })
    .catch((error)=>{
    console.log(JSON.stringify(error));
    alert("Error"+error);
    })
     
    }
    return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        <Image style={styles.image} source={{uri: Pic}} />
        <View style={styles.info}>
        <Text style={styles.text}>{info[1]}</Text>
        {/* <Text style={styles.details}>Nablus city</Text> */}
        {state==1?(
        <TouchableOpacity onPress={() => DeleteRecord(info[0])} style={styles.button1}  >
         <Text style={styles.baseText}> Cancel Attendance</Text></TouchableOpacity>)
         :( <TouchableOpacity onPress={() =>InsertRecord(info[0])} style={styles.button}>
         <Text style={styles.baseText}> {butName} </Text>
          </TouchableOpacity>)}
        {/* <TouchableOpacity onPress={() =>InsertRecord(info[0])}
         style={styles.button}
       >
         <Text style={styles.baseText}> {butName} </Text>
 </TouchableOpacity> */}
 <View style={styles.labelStyles} >
        <IconLabel name="users"  label={"The number of Attendees: "+info[5]} textColor={colorT} />
        </View >
        <View style={styles.labelStyles}>
            <IconLabel name="clock-o" label={info[4]}  textColor={colorT} />
            </View>
            <View style={styles.labelStyles}>
            <IconLabel name='paper-plane'  label={info[3]} textColor={colorT} />
            </View>
            {/* <View style={styles.labelStyles}>
            <IconLabel name='hourglass-end'  label="An hour and a half" />
            </View> */}
            <View style={styles.labelStyles}>
            <IconLabel name='calendar'  label={info[2]} textColor={colorT} />
            </View>
        </View>

      </View>
      </View>
    );
};

export default Cardss;