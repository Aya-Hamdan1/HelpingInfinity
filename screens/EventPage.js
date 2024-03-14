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
    FlatList
  } from 'react-native';
  import Cardss from '../components/Cardss';
  import * as Animatable from 'react-native-animatable';
  import LinearGradient from 'react-native-linear-gradient';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Feather from 'react-native-vector-icons/Feather';
  import React, { Component, useState} from 'react';
  import { Header } from '@react-navigation/stack';
  import IconLabel from '../components/IconLabel';
  import { NavigationContainer } from '@react-navigation/native';
  import { AuthContext } from '../components/context';
  import { useRoute } from '@react-navigation/native';

//   const notification = [
//     {
//         name: 'Education Support',
//         age: 'tt',
//         image: require('../assets/banners/e.jpg'),
//         id: 1,
//     },
//     {
//         name: 'for a better future',
//         age: 'tt',
//         image: require('../assets/banners/eee.jpg'),
//         id: 2,
//     },
//     {
//         name: 'Donate even a little',
//         age: 'tt',
//         image: require('../assets/banners/eeee.jpg'),
//         id: 3,
//     },
//     {
//         name: 'get to know us',
//         age: '4 k',
//         image: require('../assets/banners/eeeee.jpg'),
//         id: 4,
//     },
//   ];
  const EventPage = ({navigation}) => {
   

    const data = useRoute();
    notification = data.params.allevent;
    donor_name = data.params.donor;
    // const { getuser } = React.useContext(AuthContext);
    // const donor = getuser();
  
        return (
             
            <View style={styles.view}>
                {/* <StatusBar backgroundColor='#9474cc' /> */}
                <FlatList data={notification} 
              renderItem={({item}) => {
                  return <Cardss info={item} donor={donor_name} colorC={'#4fb3bf'} colorT={'#fff'} butName={'Attending the Event'}/>;
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item,index)=> index}
            //   keyExtractor={(notification) => notification.id.toString()} 
              />
                </View>
        );
    
  }
  export default EventPage;
  const styles = StyleSheet.create(
    {   
        text: {
        fontSize: 18,
        fontWeight: 'bold',
        },
        view: {
            alignItems: 'center',
            flex: 1, 
            backgroundColor: '#eeeeee',
        },
        note:{
            flex: 1,
            opacity: 0.8,
            backgroundColor: '#ffffff',
            height: 10,
            width: 90,
            alignItems: 'center',
            marginTop: 10,
            //justifyContent:'center',
  
  
        },
        header:{
           height: 70,
           width: Math.round(Dimensions.get('window').width),
           marginBottom: 10,
        //    backgroundColor: '#9474cc',
        },
        signIn: {
            width: '100%',
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 50,
            borderRadius: 30,
        },
        text: {
          fontSize: 24,
          fontWeight: 'bold',
          paddingLeft:50,
        
          },
  
    }
  );