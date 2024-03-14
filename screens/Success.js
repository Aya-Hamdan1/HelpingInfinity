import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Success(props) {

  const route = useRoute();

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <Text style={{fontWeight:'bold',fontSize:20}}>Payment Successfull</Text>
      <Text style={{marginTop: 10,}}> payId - {route.params.payId}</Text>
      <Text style={{marginTop: 10,}}> token - {route.params.token}</Text>
      <Text style={{marginTop: 10,}}> payerId - {route.params.payerId}</Text>
     </View>
  );
}