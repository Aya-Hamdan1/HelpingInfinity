/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Payment from './screens/Payment';
import Success from './screens/Success';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import My_Society from './screens/AssHome';
import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme, 
  Title
} from 'react-native-paper';

import { DrawerContent } from './screens/DrawerContent';

import MainTabScreen from './screens/MainTabScreen';
import Credit from './screens/Credit';
import ProfileScreen from './screens/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';

import { AuthContext } from './components/context';

import RootStackScreen from './screens/RootStackScreen';

import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from './screens/HomeScreen';
import Ass from './screens/ass';
import Society from './screens/Society';
import EventPage from './screens/EventPage';
import Email from './screens/email';
import LottieView from 'lottie-react-native';
import AllCases from './screens/AllCases';
console.disableYellowBox = true;
// export const UserContext = React.createContext();
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const App = () => {
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null); 
  console.disableYellowBox = true;

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [name, setName] = React.useState('');
  const initialLoginState = {
    isLoading: true,
    userName: null,
    // userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userName: action.userName,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.userName,
          // userName: action.id,
          // userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          // userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.userName,
          // userName: action.id,
          // userToken: action.token,
          isLoading: false,
        };
    }
  };
  const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100
},
  });
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
        //const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        setName(userName);
        //alert(userName);
      try {
        await AsyncStorage.setItem('userName', userName);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', userName: userName});
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('userName');
        // await firebase.auth().signOut().then(async() => {
          await AsyncStorage.removeItem('UID');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    },
    getuser: async() => {
      //setName(await AsyncStorage.getItem('userName'));
      return name;
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let userName;
      userName = null;
      try {
        userName = await AsyncStorage.getItem('userName');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', userName: userName });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}
       autoPlay loop >
        {/* <ActivityIndicator size="large"/>  ref={animation => {
          this.animation = animation;}}*/}
        <LottieView source={require('./assets/animation.json')} autoPlay loop />
        {/* <Animatable.Image source={require('./assets/Logo.png')} style={styles.logo} /> */}
        
      </View>
    );
  }
 
  return (
    <PaperProvider theme={theme}>
    <AuthContext.Provider value={authContext}>
    {/* <UserContext.Provider value={name}> */}
    <NavigationContainer theme={theme}>
    
      { loginState.userName !== null ? (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
          <Drawer.Screen name="HelpingInfinty" component={MainTabScreen} />
          
          <Stack.Screen name="Hello" component={HomeScreen} />
          {/* options={({route}) => 
          ({
            title:route.params.userName,
            headerBackTitleVisible: false
          })} */}
          <Stack.Screen name="Credit" component={Credit} />
          <Stack.Screen name="Profile Screen" component={ProfileScreen} />
          <Stack.Screen name="Edit Profile" component={EditProfileScreen} headerBackTitleVisibl={false}/>
          <Stack.Screen name="Association" component={Ass} headerBackTitleVisibl={false}/>
          <Stack.Screen name="Society" component={Society} />
          <Stack.Screen name="EventPage" component={EventPage} />
          <Stack.Screen name="My_Society" component={My_Society} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="Success" component={Success} />
          <Stack.Screen name="AllCases" component={AllCases} />
        </Drawer.Navigator>
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    {/* </UserContext.Provider> */}
    </AuthContext.Provider>
    </PaperProvider>
    
    
  );
  
}

export default App;