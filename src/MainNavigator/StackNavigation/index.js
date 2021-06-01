import { createStackNavigator } from 'react-navigation-stack';
import Home from '../BottomNavigator'
import Pecios from '../../Screen/Pecios'

export default createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Pecios: {
      screen: Pecios
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);