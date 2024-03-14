import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View, Button,Image,TouchableOpacity ,SectionList, Linking, TextInput, StatusBar, TextField, Alert} from 'react-native';
const styles = StyleSheet.create({
      body: {
        //backgroundColor: '#ffffff',
        padding: 30,
        fontFamily: 'sanserf',
        height: 900,
        alignItems: 'center',
        margin: 50,
      },
      text: {
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
        color: 'black',
      },
      input: {
        width: 300,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#c94f7c',
        textAlign: 'center',
        marginBottom: 30,
        marginRight:10,
      },
      row: {
       flexDirection: 'row',
       marginBottom: 20,
      },
      button: {
        backgroundColor: '#ea4f7c',
        width: 200,
        marginTop: 10,
        marginBottom: 20,
        borderRadius: 5,
        height: 50,
        alignItems: 'center',
      },
     
      image: {
        width: 100,
        height: 100,
        marginRight:200,
      },
    });
    const Credit = ({navigation}) => {
      const [text, setText] = useState('');
      const [name, setName] = useState('');
      const [submitted, setSubmitted] = useState(false);
      const [expiration, setExpiration] = useState('');
      const [security, setSecurity] = useState('');
      const [money, setMoney] = useState(0);
      const [society, setSociety] = useState('');
      const onPressButon = () => {
        setSubmitted(!submitted);
      };
      // const Stack=createNativeStackNavigator();
      return (
       
        <View style={styles.body}>
      
         {/* <StatusBar backgroundColor='#ff4081' barStyle="light-content"/> */}
         <View style={styles.row}>
          {/* <Text style={styles.text}>Name:     </Text> */}
          <TextInput style={styles.input} placeholder='Full Name' maxLength={10} onChangeText = {(value)=>setName(value)}></TextInput>
          </View>
          <View style={styles.row}>
          {/* <Text style={styles.text}>Number:  </Text> */}
          <TextInput style={styles.input} placeholder='Credit Card Number' maxLength={25} onChangeText = {(value)=>setCnum (value)}></TextInput>
          </View>
          <View style={styles.row}>
          {/* <Text style={styles.text}>Password </Text> */}
          <TextInput style={[styles.input , { width:150},]} placeholder='Expiration Date' maxLength={25} onChangeText = {(value)=>setExpiration (value)}></TextInput>
          <TextInput style={[styles.input , { width:150},]} placeholder='Security Code' maxLength={25} onChangeText = {(value)=>setSecurity (value)}></TextInput>
        
          </View>
          <View style={styles.row}>
          {/* <Text style={styles.text}>Password </Text> */}
          <TextInput style={[styles.input , { width:150},]} placeholder='Amount of money' maxLength={25} onChangeText = {(value)=>setMoney(value)}></TextInput>
          <TextInput style={[styles.input , { width:150},]} placeholder='Association Name' maxLength={25} onChangeText = {(value)=>setSociety (value)}></TextInput>
        
          </View>
          <TouchableOpacity  onPress={()=>{} } style={styles.button} activeOpacity={0.9}>
               <Text style={styles.text}>Save</Text>
           </TouchableOpacity>
           {/* <Button title="switch to menu" onPress={() => navigation.navigate("Menu")}></Button> */}
           {/* <Image style ={styles.image} source={require='../credit.png'} resizeMode='stretch'/> */}
           <Image style={styles.image} source={require('../assets/credit.png')} resizeMode='stretch'/>
           

        </View>
        
      );
    };
export default Credit;