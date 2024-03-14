import React, { useState } from 'react';
import {View, Image, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import IconLabel from './IconLabel';

const ChatSection = ({navigation,info}) => {
    const setGui1 = (id) => {
        global.gui1=id;
        navigation.navigate('ChatScreen', {userName: info.userName})
    }
    // global.gui1=info.uuid;
    return(
        <View>
        <View style={styles.container}>
            <View>
            <TouchableOpacity style={{ height: 90, width: 90, borderRadius: 45}} onPress={() => setGui1(info.uuid)}>

            <Image style={styles.image} source={{uri: info.label}} />
            </TouchableOpacity>
            </View>
            <View style={styles.details}>
            <Text style={styles.header}>{info.userName}</Text>
            
            </View>
        </View>
        <View>
            <Text style={styles.line}>        ________________________________________________________</Text>
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
            height: 75,
            width: 75,
            borderRadius:50,
            opacity: 0.9,
            margin: 10,
    
        },
        setImage: {
            width: 100,
            // alignItems: 'center',
        },
        header: {
            fontSize: 20,
            color:'#000'
        },
        details: {
            alignItems: 'flex-end',

        },

    }
)
export default ChatSection;