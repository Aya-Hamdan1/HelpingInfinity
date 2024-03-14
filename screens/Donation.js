import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Alert,
    FlatList,
    ActivityIndicator
  } from 'react-native';
  import Cards from '../components/Cards';
  import * as Animatable from 'react-native-animatable';
  import LinearGradient from 'react-native-linear-gradient';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Feather from 'react-native-vector-icons/Feather';
  import React, { Component, useContext, useState } from 'react';
  import { useRoute } from '@react-navigation/native';
  import IconLabel from '../components/IconLabel';
  const Donation = ({navigation}) => {
        const data = useRoute();
        const donor = global.name;
        //alert(donor);
        donations = data.params.donations;
        // const navigation1 = navigation;
        return (
            <View style={styles.view}>
                {/* <StatusBar backgroundColor='#b4004e' barStyle="light-content"/> */}
                {/* <View style={styles.header}>
                  <Text style={styles.text}>Association</Text>
                </View> */}
                {/* <Card /> */}
                <FlatList data={donations} 
                renderItem={({item}) => {
                    return (
                        <View style={styles.container}>
                        <View style={styles.cardContainer}>
                          
                          <View style={styles.info}>
                          <Text style={styles.text}>Donation information</Text>
                          {/* <Text style={styles.details}>Nablus city</Text> */}
                          
                        
                   <View style={styles.labelStyles} >
                          <IconLabel name="user"  label={"Donor Name: "+item[3]} textColor={'#000'} />
                          </View >
                          <View style={styles.labelStyles} >
                          <IconLabel name="envelope"  label={"Donor Email: "+item[0]} textColor={'#000'} />
                          </View >
                          <View style={styles.labelStyles}>
                              <IconLabel name="user" label={"Student Name: "+item[2]}  textColor={'#000'} />
                              </View>
                              <View style={styles.labelStyles} >
                          <IconLabel name="envelope"  label={"Student Email: "+item[1]} textColor={'#000'} />
                          </View >
                              <View style={styles.labelStyles}>
                              <IconLabel name='money'  label={"Amount: "+item[4]} textColor={'#000'} />
                              </View>
                              
                          </View>
                  
                        </View>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index)=> index}
                // keyExtractor={(notification) => this.state.notification.id.toString()} 
                />
                
                </View>
            
        );
              }
  
  export default Donation;
  const radius = 20;
  const width = Math.round(Dimensions.get('window').width);
  const styles = StyleSheet.create(
    {   
       
        view: {
            alignItems: 'center',
            flex: 1, 
            backgroundColor: '#ffffff',
        },
        screenContainer: {
            flex: 1,
            justifyContent: "center",
            padding: 10
          },
        container: {
            width: width -20,
            alignItems: 'center',
            margin: 15,
            // marginLeft: 10,
            },
        cardContainer: {
            width: width -25,
            height: 300,
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
            backgroundColor: '#fff',//#9474cc
    
    
    
        },
        image: {
            height: 80,
            width: width -25,
            borderTopLeftRadius:radius,
            borderTopRightRadius: radius,
            opacity: 0.9,
    
        },
        text:{
            fontSize: 20,
            fontWeight: '600',
            color:'#000'
        },
        details:{
           fontSize: 15,
           fontWeight: '180',
        },
        info: {
            marginHorizontal: 10,
            marginVertical: 5,
            marginTop:10,

        },
        labelStyles: {
            flexDirection: 'column',
            marginTop: 18,
            marginLeft:10,
            justifyContent: 'space-between',
           
     },
     button: {
        borderWidth:1,
        borderColor:'#000',//'#9c64a6'
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        height:40,
        backgroundColor:'#fff',
        borderRadius: 10,
      },
      baseText: {
        fontWeight: 'bold',
        fontSize:18,
        color:'#000',//'#9c64a6'
      },
  
    }
  );