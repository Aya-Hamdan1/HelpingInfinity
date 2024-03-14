import { createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import SignUp from '../screens/SignUpScreen';
import Login from '../screens/SignInScreen';
import Dashboard from '../'

const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUp,
}, {
    headerMode: 'none' , initialRouteName: 'Login'
}
);

const App = createSwitchNavigator({
    Auth: AuthStack,
    Dashboard: Da
})

export default createAppContainer(AuthStack);