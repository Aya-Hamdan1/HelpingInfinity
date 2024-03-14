import React from 'react';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import IconLabel from './IconLabel';
const Section = ({navigation,id,email,name, label, sub, location}) => {
    return(
        <View>
        <View style={styles.container}>
            <View style={styles.setImage}>
            <TouchableOpacity onPress={()=>navigation.navigate('AssHome',{email:email,id:id})}></TouchableOpacity>
            <Image style={styles.image} source={{uri: label}}/>
            </View>
            <View style={styles.details}>
            <Text style={styles.header}>{name}</Text>
            <View style={styles.container}>
                <IconLabel name='heart' label={sub} color='red' textColor={'#000'} />
                <IconLabel name='paper-plane' label={location} color='green' />
                
            </View>
            
            </View>
        </View>
        <View>
            <Text style={styles.line}>     _____________________________________________________________</Text>
        </View> 
        </View>

    );
};
const width = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create(
    {
        text:{
            fontSize: 12,
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
            fontSize: 24,
        },
        details: {
            alignItems: 'flex-start',

        },

    }
)
export default Section;