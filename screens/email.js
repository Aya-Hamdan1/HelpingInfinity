import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Image,
  Linking,
  Platform,
  Alert
} from "react-native";

import Communications from "react-native-communications";
import { NavigationContainer } from '@react-navigation/native';
export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodayText: ""
    };
  }

 
  /*Function to send the mail function(to, cc, bcc, subject, body)*/
  openEmail = () => {
    Communications.email(
      ["amal741852@gmail.com"],
      null,
      null,
      "Enter Subject",
      "Enter body for the mail"
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{ textAlign: "center", fontSize: 30, paddingVertical: 30,fontWeight: 'bold' ,fontStyle:'italic', color:'#7b1fa2'}}
        >
          Your opinion may make a scientist, a leader, an educator, or a teacher for generations
          
             {/* What do you think of the application? */}
        </Text>
        <Image
              source={require('../assets/banners/what.png')}
              resizeMode="cover"
      
            />
            <Text></Text>
        {/* <TextInput
          value={this.state.bodayText}
          onChangeText={bodayText => this.setState({ bodayText })}
          placeholder={"Enter Body"}
          style={styles.input}
        /> */}
        <View style={{ marginTop: 20 }}>
          <Button onPress={this.openEmail} title="Send Email" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#ffffff"
  },
 
  input: {
    width: 255,
    height: 44,
    padding: 10,
    margin: 10,
    backgroundColor: "#FFF",
    borderColor: "#000",
    borderRadius: 0.5,
    borderWidth: 0.5
  }
});