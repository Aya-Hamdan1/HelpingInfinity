import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Image, Text, StyleSheet, Dimensions} from 'react-native';

const IconLabel = ({name, label, color, textColor}) => {
    const styles = StyleSheet.create(
        {
            text:{
                margin:2,
                fontSize: 20,
                color:textColor,
            },
            container:{
                flexDirection:'row',
                marginRight: 10,
                alignItems: 'center',
    
            },
            iconStyle: {
                marginRight: 2,
            }
    
        }
    )
    return(
        <View style={styles.container}>
            <FontAwesome
             name={name} 
             size={20}
             style={styles.iconStyle} 
             color={color} />
            <Text style={styles.text}>{label}</Text>
        </View>

    );
};

export default IconLabel;