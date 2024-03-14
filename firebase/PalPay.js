
import React, { Component, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator,Button} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { CardField } from "@stripe/stripe-react-native";
import { confirmPayment } from "@stripe/stripe-react-native";
import { createToken } from "@stripe/stripe-react-native";
import PayPalApi from "./PayPalApi";
import { async } from "@firebase/util";

const Paying = ({navigation}) => {
     
    const [cardInfo, setCardInfo] = useState(null);
    const fetchCardDetail = (cardDetails) => {
        if(cardDetails.complete) {
            setCardInfo(cardDetails);
        }
        else{
            setCardInfo(null);
        }
    }
    constDone = async () => {

    }

    const onPressPaypal = async() =>{
        try {
            const token = await PayPalApi.generateToken();
            const res = await PayPalApi.createOrder(token);
            console.log("res++++++",res);
        } catch (error) {
            console.log("error");
        }
    }






    return(
        <View style={StyleSheet.container}>
            <SafeAreaView style={{flex:1}}>
                <View style={{padding: 16}}>
                    <CardField 
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    // cardStyle={{
                    //     backgroundColor: '#fff',
                    //     textColor: '#000',
                    // }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        fetchCardDetail(cardDetails)
                    }}
                    onFocus={(focusedField) => {
                        console.log('focusField', focusedField);
                    }}
                    />
                </View>

            </SafeAreaView>
            <Button title='Done' ></Button>
            <Button title='pay' onPress={()=> onPressPaypal()}></Button>
        </View>
    );
};
export default Paying;