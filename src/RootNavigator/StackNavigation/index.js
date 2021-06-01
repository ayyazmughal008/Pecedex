import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screen/Login'
import Register from '../../Screen/Register'

export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);