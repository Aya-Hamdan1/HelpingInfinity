import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import EditProfileScreen from './EditProfileScreen';
import ChatScreen from './ChatScreen';
import {useTheme, Avatar} from 'react-native-paper';
import {View} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CardListScreen from './CardListScreen';
import CardItemDetails from './CardItemDetails';

const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" 
  activeColor="#fff"
  barStyle={{ backgroundColor: '#ff4081' }}
       
 >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#ff4081',
        tabBarIcon: ({color}) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#ff4081',
        tabBarIcon: ({color}) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreStackScreen}
      options={{
        tabBarLabel: 'Chat',
        tabBarColor: '#ff4081',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons
          name="chat-processing"
          size={26}
          color={color}
        />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {
  const {colors} = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        
      <HomeStack.Screen
        name="Hello"
        component={HomeScreen}
        options={{
          title: '',
          headerShadowVisible:false
        }}
       
        // options={{
        //   title: 'HelpingIfinity',
        //   headerLeft: () => (
        //     <View style={{marginLeft: 10}}>
        //       <Icon.Button
        //         name="ios-menu"
        //         size={25}
        //         color={colors.text}
        //         backgroundColor={colors.background}
        //         onPress={() => navigation.openDrawer()}
        //       />
        //     </View>
            
        //   ),
          // headerRight: () => (
          //   <View style={{flexDirection: 'row', marginRight: 10}}>
          //     <Icon.Button
          //       name="ios-search"
          //       size={25}
          //       color={colors.text}
          //       backgroundColor={colors.background}
          //       onPress={() => {}}
          //     />
          //     <TouchableOpacity
          //       style={{paddingHorizontal: 10, marginTop: 5}}
          //       onPress={() => {
          //         navigation.navigate('Profile');
          //       }}>
          //       <Avatar.Image
          //         source={{
          //           uri:
          //             '..\assets\Logo.png',
          //         }}
          //         source={require('../assets/Logo.png')}
          //         size={60}
          //       />
                
          //     </TouchableOpacity>
          //   </View>
          // ),
      //   }}
      />
      <HomeStack.Screen 
        name="CardListScreen"
        component={CardListScreen}
        options={({route}) => ({
          title: route.params.title,
          headerBackTitleVisible: false
        })}
      />
      <HomeStack.Screen 
        name="CardItemDetails"
        component={CardItemDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff'
        })}
      />
    </HomeStack.Navigator>
  );
};




const ExploreStackScreen = ({navigation}) => (
  <ExploreStack.Navigator
  navigationOptions={{
      header: { visible: false }
      // headerStyle: {
      //   backgroundColor: '#1f65ff',
      // },
      // headerTintColor: '#fff',
      // headerTitleStyle: {
      //   fontWeight: 'bold',
      // },
    }}
    >
    <ExploreStack.Screen
      name="Chat"
      component={ExploreScreen}
      
      options={{
        title: '',
        headerShadowVisible:false
      }}
      onPress={() => navigation.openDrawer()}
      //   headerLeft: () => (
      //     <Icon.Button
      //       name="ios-menu"
      //       size={25}
      //       backgroundColor="#1f65ff"
      //       onPress={() => navigation.openDrawer()}
      //     />
      //   ),
      // }}
    />
    <ExploreStack.Screen
        name="ChatScreen"
        options={{
          title: 'Chat',
        }}
        component={ChatScreen}
      />
  </ExploreStack.Navigator>
);
const ProfileStackScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          // headerLeft: () => (
          //   <View style={{marginLeft: 10}}>
          //     <Icon.Button
          //       name="ios-menu"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       onPress={() => navigation.openDrawer()}
          //     />
          //   </View>
          // ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       onPress={() => navigation.navigate('EditProfile')}
          //     />
          //   </View>
          // ),
        }}
        onPress={() => navigation.openDrawer()}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: 'Edit Profile',
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};
