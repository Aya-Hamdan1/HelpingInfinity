import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import {createAppContainer} from 'react-navigation';
import { createStackNavigator } from "@react-navigation/stack";
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from "../firebase/Fire";
import { useRoute } from '@react-navigation/native';
export default class ChatScreen extends React.Component {
    state = {
        messages: [],
        name:''
    }
    myName(){
      const data = useRoute();
      this.setState({name:data.params.name});
    }
    get user() {
        
        return {
            _id: Fire.uid,
            name: this.name

        }
    }

    componentDidMount() {
        Fire.get(messages => this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        })))
    }
    componentWillUnmount() {
        Fire.off();
    }
    render() {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user}/>
        if(Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{flex: 1}} behavior="padding" keyboardVerticalOffset={30} enabled>
                    {chat}
                </KeyboardAvoidingView>
            );
        }
        return <SafeAreaView style={{flex: 1}}>{chat}</SafeAreaView>;
    //     (
    //     <View style={styles.container}>
    //        <Text>Open up App.js to </Text>
    //     </View>
    // );
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});