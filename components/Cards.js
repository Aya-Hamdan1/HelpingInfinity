import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image,TouchableOpacity,Text,Button, StyleSheet, Dimensions, Alert} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconLabel from './IconLabel';
import { AuthContext } from './context';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';



const Cards = ({info, donor, navigation}) => {

  const { getuser } = React.useContext(AuthContext);
  let d_name = donor;
  const image= require('../assets/banners/najah.jpg');
  const [disbutton, setDisbutton] = useState(false);
  const [colors,setColors]=useState('#ffffff');
  const [Pic, setPic] = useState(info[7]);
  const [stat1,setStat]= useState(info[8]);
  // alert(info[8]);
  InsertRecord=(name)=>
{
 
  // alert(donor);
  
 
var InsertAPIURL="http://"+global.ip+":80/api/increase.php";

var headers={
'Accept':'application/json',
'Content-Type':'application/json'
};

var Data={
s_name:name,
user:d_name
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
alert(response[0].Message);
// setStat(1);
})
.catch((error)=>{
console.log(JSON.stringify(error));
alert("Error"+error);
})
  
    
}
DeleteRecord=(name)=>
{
 
var InsertAPIURL="http://"+global.ip+":80/api/deleteSubscribe.php";

var headers={
'Accept':'application/json',
'Content-Type':'application/json'
};
var Data={
s_name:name,
user:global.id
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
// setDisbutton(true);
// setStat(0);
setColors('gray');
})
.catch((error)=>{
console.log(JSON.stringify(error));
alert("Error"+error);
})
  
    
}
   //////
    return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.imgs}>
        <Image style={styles.image} source={{uri: Pic}} />
        </View>
        <View style={styles.info}>
        <View style={styles.labelStyles} >
            <IconLabel name="users" color="#ffffff" label={info[1]} textColor={'#fff'}/>
        </View >
        <View style={styles.labelStyles}>
          <IconLabel name="graduation-cap" color="#ffffff" label={'Subscriber:'+info[6]} textColor={'#fff'} />
            
            </View>
            
           
      <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#ffffff'}} />
  <View style={{flex: 1, height: 1, backgroundColor: '#ffffff'}} />
</View>
            
            <View style={styles.labelStyles}>
            <IconLabel name='envelope'  color="#ffffff" label={info[2]}  textColor={'#fff'}/>
            </View>
            <View style={styles.labelStyles}>
            <IconLabel name='phone'  label={info[5]} color="#ffffff"  textColor={'#fff'}/>
            </View>
            <View style={styles.labelStyles}>
            <IconLabel name='location-arrow' label={info[3]} color="#ffffff"  textColor={'#fff'} />
            </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center',marginTop:10}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#ffffff'}} />
  <View style={{flex: 1, height: 1, backgroundColor: '#ffffff'}} />
</View>
<View style={styles.containerr}>
<TouchableRipple onPress={() => navigation.navigate('My_Society',{email:info[2], id:info[0]})}>
          <View >
          <Icon name="door-open" color="#ffffff" size={28} fontSize={5}/>
         <Text style={styles.text}>Entry</Text>
         
          </View>
        </TouchableRipple>
        {stat1==1?(<TouchableRipple onPress={() =>DeleteRecord(info[1])}>
          <View >
          <Icon name="bell" color='gray' size={28} fontSize={5} style={{opacity:0.7}}/>
          
         <Text style={styles.text0}>UnSubscribe</Text>
           
          </View>
        </TouchableRipple>)
        :<TouchableRipple  onPress={() =>InsertRecord(info[1])}>
        <View >
        <Icon name="bell" color='white' size={28} fontSize={5}/>
        
       <Text style={styles.text}>Subscribe</Text>
         
        </View>
      </TouchableRipple>}
        {/* <TouchableRipple disabled={ disbutton ? true : false } onPress={() =>InsertRecord(info[1])}>
          <View >
          <Icon name="bell" color='white' size={28} fontSize={5}/>
          
         <Text style={styles.text}>Subscribe</Text>
           
          </View>
        </TouchableRipple> */}
             
            </View>
        
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
        },
        imgs:{
          backgroundColor:'#fff'
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
        backgroundColor: '#b4004e',



    },
    image: {
        height: 60,
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
    text0:{
      fontSize: 15,
      fontWeight: '700',
      color:'gray',
      opacity:0.7,
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
export default Cards