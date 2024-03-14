import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import IconLabel from './IconLabel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Section2 = ({name_u, id,mony,college,year,img,navigation, sodality, student,status}) => {
    const [isImage, setImage] = useState(false);
    // alert(status);
    // const InsertPayment = () => {
    //     alert(sodality+";;"+id+";;"+mony+";;"+student);
    // var InsertAPIURL="http://"+global.ip+":80/api/Payment.php";
    
    // var headers = {
    //     'Accept' : 'application/json',
    //     'Content-Type' : 'application/json'
    //   };
    
    // var Data = {
    //   sodality:sodality,
    //   student:student,
    //   donor:global.id,
    //   case:id,
    //   amount:mony
    // };
    
    // fetch(InsertAPIURL,
    // {
    // method:'POST',
    // headers:headers,
    // body:JSON.stringify(Data)
    // }
    // )
    // .then((response)=>response.json())
    // .then((response)=>
    // {
    // // console.log((response));
    // alert(response);
    // // this.props.navigation.navigate("SignInScreen");
    // })
    // .catch((error)=>{
    // console.log(JSON.stringify(error));
    // alert("Error"+error);
    // })
    // // alert(sodality+";;"+id+";;"+mony+";;"+student);
    // }
    if(isImage){
        return(
            <View style={[styles.container,{height:Math.round(Dimensions.get('window').height),width:Math.round(Dimensions.get('window').width)}]}>
                <TouchableOpacity onPress={()=>setImage(false)}><Icon name='exit-to-app' size={30}/></TouchableOpacity> 
                 <Image 
          source={{uri: img}}
          style={{width:width-50,height:height-50,}}
          />
            </View>
        )
    }
    return (
    
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        {/* <Image style={styles.image} source={{uri: img}} /> */}
        <View style={styles.info}>
        {/* <Text style={styles.text}>{info.name}</Text> */}
        <Text style={styles.details}>There is a student at a {name_u}, College of {college},
             in the {year} year who needs an amount of money {mony}</Text>
        <View style={styles.labelStyles} >
            <View style={styles.row}>
        <TouchableOpacity style={status==1? styles.button0: styles.button} activeOpacity={0.9} disabled={status==1?true:false}
        onPress={()=> navigation.navigate('Payment', {mony:mony, sodality:sodality, student:student, id:id})}
        >
               <Text style={styles.textButton}>Donate</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.button} activeOpacity={0.9} onPress={()=> setImage(true)}>
               <FontAwesome name='image' color={'#fff'} size={35} 
            //    onPress={}
               />
           </TouchableOpacity>
           </View>
        {/* <IconLabel name="thumbs-up" label={age} color='#6e77ec' />
        <IconLabel name="heart" label="4 km" color='#ee2222' /> */}
        </View>
        </View>

      </View>
      </View>
    );
};
const radius = 20;
const width = Math.round(Dimensions.get('window').width);
const height = Dimensions.get('window').height;
// const MyImage = () => {
//     alert(';;;');
//     return(
        
//       <View style={{height:height,width:width,}}>
//           <Image 
//           source={{uri: img}}
//           style={{width:width,height:height,}}
//           />
//           {/* <Text>hello baraa</Text> */}
//       </View>
//     )
//   }
const styles = StyleSheet.create({
    container: {
        width: width,
        alignItems: 'center',
        marginTop: 25,
        },
    cardContainer: {
        width: width -25,
        height: 220,
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
        backgroundColor: '#fff',

    },
            button: {
            backgroundColor: '#005005',
            width: 100,
            borderRadius: 5,
            height: 40,
            margin:10,
            // marginBottom:5,
            alignItems: 'center',
          },
          button0: {
            backgroundColor: '#555',
            width: 100,
            borderRadius: 5,
            height: 40,
            margin:10,
            // marginBottom:5,
            alignItems: 'center',
          },
          textButton: {
             fontSize:24,
             textAlign:'center',
             margin:5,
             color:'#fff'
          },
    image: {
        height: 130,
        width: width -25,
        borderTopLeftRadius:radius,
        borderTopRightRadius: radius,
        opacity: 0.9,

    },
    row: {
        flexDirection: 'row',
        flex:1,
        justifyContent:'center',
        marginBottom: 20,
        alignItems:'center'
       },
    text:{
        fontSize: 20,
        fontWeight: '700',
    },
    details:{
        fontSize: 20,
        color:'#000',
         margin:5,
    },
    info: {
        marginHorizontal: 10,
        marginVertical: 5,


    },
    labelStyles: {
        flexDirection: 'row',
        marginTop: 10,

 },

});
export default Section2;
