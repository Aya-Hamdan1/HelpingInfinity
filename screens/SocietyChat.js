 
import React from 'react';
import AsyncStorage, { useAsyncStorage}  from '@react-native-community/async-storage';
import { DataSnapshot } from 'firebase/database';
import { Component } from 'react'
import {View, Image,TouchableOpacity,Text,Button, StyleSheet, Dimensions, Alert, FlatList, ActivityIndicator} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import ChatSection from '../components/ChatSection';
import firebase from '../firebase/firebaseConfig';



const styles = StyleSheet.create(
  {   
      text: {
      fontSize: 18,
      fontWeight: 'bold',
      },
      view: {
          alignItems: 'center',
          flex: 1, 
          backgroundColor: '#fff',
      },
    }
    );
   class SocietyChat extends Component {

    state = {
      allUsers: [],
      imageUrl:'',
      loggedInUserName:'',
      loadingC:true,
    }
    
 
  async componentDidMount() {
    let users = [];
    try {
      await firebase.database().ref('users').
      on("value", async(datasnapshot) =>{
        const uuid= await AsyncStorage.getItem('UID');
        // alert(uuid);
        datasnapshot.forEach((child) => {
            users.push({
              userName: child.val().name,
              label: child.val().image,
              uuid: child.val().uuid
            });
        //   }
        });
        // this.setState({allUsers: users});
        // // alert(allUsers);
        // this.setState({loadingC:false});
      })
      
    } catch (error) {
      alert(error);
    }
      
    try {
      await firebase.database().ref('student').
      on("value", async(datasnapshot) =>{
      
        datasnapshot.forEach((child) => {
           
            users.push({
              userName: child.val().nameS,
              label: child.val().imageS,
              uuid: child.val().suid
            });
        //   }
        });
        // this.setState({allUsers: users});
        // // alert(allUsers);
        // this.setState({loadingC:false});
      })
    } catch (error) {
      alert(error);
    }
    this.setState({allUsers: users});
        // alert(allUsers);
        this.setState({loadingC:false});
  }

  // async componentDidS() {
    
  //   try {
  //     await firebase.database().ref('student').
  //     on("value", async(datasnapshot) =>{
  //       // const uuid= await AsyncStorage.getItem('UID');
  //       // alert(uuid);
  //       let users = [];
  //       datasnapshot.forEach((child) => {
  //           // alert('ok');
  //       //   if (child.val().uuid == uuid) {
  //       //       this.setState({ loggedInUserName: child.val().name , imageUrl: child.val().image})
  //       //   }
  //       //   else{
  //           users.push({
  //             userName: child.val().nameS,
  //             label: child.val().imageS,
  //             uuid: child.val().suid
  //           });
  //       //   }
  //       });
  //       this.setState({allUsers: users});
  //       // alert(allUsers);
  //       this.setState({loadingC:false});
  //     })
  //   } catch (error) {
  //     alert(error);
  //   }
  // }
  render() {
  
    return (
      <View style={styles.view}>
      {/* <StatusBar backgroundColor='#9474cc' /> */}
      <FlatList data={this.state.allUsers} 
    renderItem={({item}) => {
        return ( 
        <ChatSection info={item}  navigation={this.props.navigation}/>
        );
    }}
    showsVerticalScrollIndicator={false}
    keyExtractor={(item,index)=> index}
  //   keyExtractor={(notification) => notification.id.toString()} 
    />
      </View>
    );
  }
}
export default SocietyChat;

