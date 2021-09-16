import { createStackNavigator } from 'react-navigation-stack';
import Login from '../../Screen/Login'
import Register from '../../Screen/Register'
import SendEmail from '../../Screen/SendEmail'
import UpdatePassword from '../../Screen/SendEmail/UpdatePassword'

export default createStackNavigator(
  {
    Login: {
      screen: Login
    },
    Register: {
      screen: Register
    },
    SendEmail: {
      screen: SendEmail
    },
    UpdatePassword: {
      screen: UpdatePassword
    },
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none',
  }
);