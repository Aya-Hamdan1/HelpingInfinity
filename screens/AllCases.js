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
  import React, { Component, useContext } from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { Header } from '@react-navigation/stack';
  import { AuthContext } from '../components/context';
  import { useRoute } from '@react-navigation/native';
  import Students from '../components/Students';
  import Section2 from '../components/Section2';
  const AllCase = ({navigation}) => {
        const data = useRoute();
        const { getuser } = React.useContext(AuthContext);
        const donor = global.name;
        //alert(donor);
        notification = data.params.cases;
        // alert(notification[0]);
        return (
            <View style={styles.view}>
                <Students students={notification} navigation={navigation}/>
               
                {/* <FlatList data={notification} 
                renderItem={({item}) => {
                    return <Section2 name_u={item[6]} sodality={item[1]} student={item[2]} id={item[0]} mony={item[4]}  college={item[7]} year={item[8]} img={item[9]} navigation={navigation} />;
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index)=> index}
                // keyExtractor={(notification) => this.state.notification.id.toString()} 
                /> */}
                
                </View>
            
        );
        // return (
        //     <View style={styles.view}>
                 
        //         {/* <StatusBar backgroundColor='#b4004e' barStyle="light-content"/> */}
        //         {/* <View style={styles.header}>
        //           <Text style={styles.text}>Association</Text>
        //         </View> */}
        //         {/* <Card /> */}
        //         <Students students={notification} navigation={navigation}/>
                
        //         </View>
            
        // );
              }
  
  export default AllCase;
  const styles = StyleSheet.create(
    {   
        text: {
        fontSize: 18,
        fontWeight: 'bold',
        },
        view: {
            alignItems: 'center',
            flex: 1, 
            backgroundColor: '#ffffff',
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
          //  backgroundColor: '#9474cc',
        },
        signIn: {
            width: '100%',
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 50,
            borderRadius: 30
        },
        text: {
          fontSize: 24,
          fontWeight: 'bold',
          paddingLeft:50,
          },
  
    }
  );