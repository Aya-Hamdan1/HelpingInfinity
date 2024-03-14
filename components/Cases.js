import React from 'react';
import { useCallback, useEffect, useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image,TouchableOpacity, Text, StyleSheet, Dimensions, Alert} from 'react-native';
// import { Button } from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconLabel from './IconLabel';


const Cases = ({info}) => {
    // console.log(info);
    // const {name, age, image, id} = info;
    const radius = 20;
const width = Math.round(Dimensions.get('window').width);
const height = Dimensions.get('window').height;
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
        backgroundColor: '#fff',//#9474cc



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
    margin:10,
    height:40,
    width:150,
    backgroundColor:'#fff',
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
    const AddCase = () => {
        var APIURL = "http://"+global.ip+":80/api/AddCaseFromSociety.php";
              var headers = {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
                };
         var Data={
        student:info[3],
        money:info[4],
        des:info[5],
        Pic:info[9],
        Sid:info[1],
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
          // setSelected(1);
        }
         })
        .catch((error)=>{
          console.error("ERROR FOUND" + error);
        })
      
      }
      const deleteCase = () => {
        let v = true;
        var APIURL = "http://"+global.ip+":80/api/deleteCaseStudent.php";
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
         if(Response==false){console.log("Can't deleted!")}
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
        <Text style={styles.text}>{info[10]}</Text>
        {/* <Text style={styles.details}>Nablus city</Text> */}
        
 <View style={styles.labelStyles} >
        <IconLabel name="users"  label={"Student Email: "+info[3]} textColor={'#000'} />
        </View >
        <View style={styles.labelStyles}>
            <IconLabel name="money" label={info[4]}  textColor={'#000'} />
            </View>
            <View style={styles.labelStyles}>
            {/* <IconLabel name="hashtag"  label={info[5]} textColor={'#000'} /> */}
            <Text style={styles.text}>Description: {info[5]}</Text>
            </View>
            {/* <View style={styles.labelStyles}>
            <IconLabel name='hourglass-end'  label="An hour and a half" />
            </View> */}
            <View style={styles.labelStyles}>
            <IconLabel name="university"  label={info[6]+"--"+info[7]} textColor={'#000'} />
            </View>
            <View style={styles.labelStyles} onPress={()=>setImage(true)}>
              <TouchableOpacity onPress={()=> setImage(true)}>
              <IconLabel name="image"  label={' Click Document'} textColor={'#000'}  />
              </TouchableOpacity>
            
            </View>
            <View style={styles.row}>
            <TouchableOpacity onPress={() =>AddCase()}
         style={styles.button}
       >
         <Text style={styles.baseText}> add </Text>
 </TouchableOpacity>
 <TouchableOpacity onPress={() =>deleteCase()}
         style={styles.button}
       >
         <Text style={styles.baseText}> Delete </Text>
 </TouchableOpacity>
 </View>
        </View>

      </View>
      </View>
    );
};

export default Cases;