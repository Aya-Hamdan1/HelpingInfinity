import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';
import IconLabel from './IconLabel';


const Card = ({info}) => {
    const {name, date, address, time, num, nameS, image} = info;//$name,$date,$address,$time,$num,$nameS,$img);
    return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        
        <Image style={styles.image} source={{uri: info[7]}} />
       
        <View style={styles.info}>
        <Text style={styles.text}>{info[1]}</Text>
        <Text style={styles.details}>Charity Name:{info[6]}</Text>
        {/* <Text style={styles.details}>{info[2]}</Text>
        <Text style={styles.details}>{info[4]}</Text> */}
        <IconLabel name="clock-o" label={info[4]}  textColor={'#000'} />
        <IconLabel name='calendar' label={info[2]}  textColor={'#000'} />
        {/* //'calendar' */}
        <View style={styles.labelStyles} >
        <IconLabel name="location-arrow" label={info[3]} color='#6e77ec' />
        <IconLabel name="heart" label={info[5]} color='#ee2222' />
        </View>
        </View>

      </View>
      </View>
    );
};
const radius = 20;
const width = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    container: {
        width: width -20,
        alignItems: 'center',
        marginTop: 25,
        marginLeft:10
        },
    cardContainer: {
        width: width -25,
        height: 250,
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
        margin:5,



    },
    image: {
        height: 50,
        width: width -25,
        borderTopLeftRadius:radius,
        borderTopRightRadius: radius,
        opacity: 0.9,

    },
    text:{
        fontSize: 20,
        fontWeight: '700',
    },
    details:{
       fontSize: 20,
       fontWeight: '600',
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
export default Card;