import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image,TouchableOpacity,Text,Button, StyleSheet, Dimensions, Alert} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconLabel from './IconLabel';
import { AuthContext } from './context';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';



const showStudents = ({info}) => {


  const [disbutton, setDisbutton] = useState(false);
  const [colors,setColors]=useState('#000');
  const [Pic, setPic] = useState(info[7]);
   //////
    return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.imgs}>
        <Image style={styles.image} source={{uri: Pic}} />
        </View>
        <View style={styles.info}>
        <View style={styles.labelStyles} >
            <IconLabel name="users" color="#000" label={info[1]} />
        </View >
        <View style={styles.labelStyles}>
            <IconLabel name="graduation-cap" color="#000" label={'Academic Year:'+info[6]} />
            </View>
            
           
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#000'}} />
  <View style={{flex: 1, height: 1, backgroundColor: '#000'}} />
</View>
            
            <View style={styles.labelStyles}>
            <IconLabel name='envelope'  color="#000" label={info[2]}  textColor={'#000'}/>
            </View>
            <View style={styles.labelStyles}>
            <IconLabel name='university'  label={'University:'+info[4]} color="#000"  textColor={'#000'}/>
            </View>
            <View style={styles.labelStyles}>
            <IconLabel name='bookmark' label={'Collage:'+info[5]} color="#000"  textColor={'#000'} />
            </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#000'}} />
  <View style={{flex: 1, height: 1, backgroundColor: '#000'}} />
</View>
{/* <View style={styles.containerr}>
<TouchableRipple onPress={() =>navigation.navigate()}>
          <View >
          <Icon name="door-open" color="#ffffff" size={28} fontSize={5}/>
         <Text style={styles.text}>Entry</Text>
         
          </View>
        </TouchableRipple>
        <TouchableRipple disabled={ disbutton ? true : false } onPress={() =>InsertRecord(info[1])}>
          <View >
          <Icon name="bell" color='white' size={28} fontSize={5}/>
         <Text style={styles.text}>Subscribe</Text>
           
          </View>
        </TouchableRipple>
             
            </View> */}
        
        </View>

      </View>
  
    );
    
};
const radius = 20;
const width = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
      },
    container: {
        width: width -20,
        alignItems: 'center',
        marginTop: 25,
        marginLeft:10,
        },
        imgs:{
          backgroundColor:'#fff'
        },
    cardContainer: {
        width: width -25,
        height: 330,
        borderRadius:radius,
        shadowColor:'#000',
        shadowOffset:{
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
        marginTop: 5,
        backgroundColor: '#fff',



    },
    image: {
        height: 40,
        width: width -25,
        borderTopLeftRadius:radius,
        borderTopRightRadius: radius,
        opacity: 0.9,

    },
    text:{
        fontSize: 15,
        fontWeight: '700',
        color:'#ffffff',
    },
    details:{
       fontSize: 15,
       fontWeight: '200',
    },
    info: {
        marginHorizontal: 10,
        marginVertical: 5,


    },
    labelStyles: {
        flexDirection: 'row',
        marginTop: 10,

 },
 button: {
    borderWidth:1,
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:'#fff',
    
    borderRadius: 10,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize:15,
    color:'black',
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  labelStyles: {
    flexDirection: 'column',
    marginTop: 10,
    marginLeft:10,
    justifyContent: 'space-between',
   
},
containerr: {
  
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  justifyContent:'space-around',
},

});
export default showStudents;