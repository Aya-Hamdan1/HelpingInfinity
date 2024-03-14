import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SingInStudent from './SingInStudent';
// import TimeSelect from './TimeSelect';
import StudentScreen from './StudentScreen';
import StudentSignUp from './StudentSignUp';
import ProfileScreen from './ProfileScreen';
import AssHome from './AssHome';
import SocietyProfileScreen from './SocietyProfileScreen';
import EditProfileSociety from './EditProfileSociety';
import  SignInSociety from './SignInSociety';
import TimeSelect from './TimeSelect';
import Ass from './ass';
import HomeScreen from './HomeScreen';
import ChatScreen from './ChatScreen';
import ExploreScreen from './ExploreScreen';
import Payment from './Payment';
import Donation from './Donation';
import SocietyChat from './SocietyChat';

// import HomeScreen from './HomeScreen';

// import App from'./App';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="HomeScreen" component={HomeScreen}/>
        <RootStack.Screen name="StudentSignUp" component={StudentSignUp}/>
        <RootStack.Screen name="StudentScreen" component={StudentScreen}/>
        <RootStack.Screen name="SingInStudent" component={SingInStudent}/>
        {/* <RootStack.Screen name="ProfileScreen" component={ProfileScreen}/> */}
        <RootStack.Screen name="AssHome" component={AssHome}/>
        <RootStack.Screen name="EditProfileSociety" component={EditProfileSociety}/>
        <RootStack.Screen name="SocietyProfileScreen" component={SocietyProfileScreen}/>
        <RootStack.Screen name="SignInSociety" component={SignInSociety}/>
        <RootStack.Screen name="TimeSelect" component={TimeSelect}/>
        <RootStack.Screen name="ExploreScreen" component={ExploreScreen}/>
        <RootStack.Screen name="ChatScreen" component={ChatScreen}/>
        <RootStack.Screen name="Payment" component={Payment}/>
        <RootStack.Screen name="SocietyChat" component={SocietyChat}/>
        <RootStack.Screen name="Donation" component={Donation}  options={{title: 'Donation',}}
    //     screenOptions={{
    //     headerMode: 'screen',
    //     headerTintColor: 'white',
    //     headerStyle: { backgroundColor: 'tomato' },
    //   }} 
      />
    </RootStack.Navigator>
);

export default RootStackScreen;