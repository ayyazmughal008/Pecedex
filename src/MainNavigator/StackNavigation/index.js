import { createStackNavigator } from 'react-navigation-stack';
import Home from '../BottomNavigator'
import Pecios from '../../Screen/Pecios'
import Animal from '../../Screen/Animal'
import Classes from '../../Screen/Classes'
import Order from '../../Screen/Order'
import Family from '../../Screen/Family'
import Genre from '../../Screen/Genere'
import Detail from '../../Screen/Detail/AnimalDetail'
import PeciosDetail from '../../Screen/Pecios/Detail'

export default createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Pecios: {
      screen: Pecios
    },
    PeciosDetail: {
      screen: PeciosDetail
    },
    Animal: {
      screen: Animal
    },
    Detail: {
      screen: Detail
    },
    Classes: {
      screen: Classes
    },
    Order: {
      screen: Order
    },
    Family: {
      screen: Family
    },
    Genre: {
      screen: Genre
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);