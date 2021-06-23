import { createStackNavigator } from 'react-navigation-stack';
import Home from '../../Screen/Home'
import Pecios from '../../Screen/Pecios'
import Animal from '../../Screen/Animal'
import Classes from '../../Screen/Classes'
import Order from '../../Screen/Order'
import Family from '../../Screen/Family'
import Genre from '../../Screen/Genere'
import Dive from '../../Screen/Dive'
import Ranking from '../../Screen/Rankisng'
import LogBook from '../../Screen/LogBook'
import RankingDetail from '../../Screen/RankingDetail'
import AnimalSeen from '../../Screen/AnimalSeen'
import DiveCenter from '../../Screen/DiveCenter'
import DiveCenterDetail from '../../Screen/DiveCenter/DiveCenterDetail'
import Detail from '../../Screen/Detail/AnimalDetail'
import PeciosDetail from '../../Screen/Pecios/Detail'
import SettingScreen from "../../Screen/Setting";
import MapScreen from "../../Screen/Map";
import ProfileScreen from "../../Screen/Profile";
import SubmitReview from "../../Screen/DiveCenter/SubmitReview";
import NotificationScreen from "../../Screen/Notification";

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
    Dive: {
      screen: Dive
    },
    AnimalSeen: {
      screen: AnimalSeen
    },
    Ranking: {
      screen: Ranking
    },
    RankingDetail: {
      screen: RankingDetail
    },
    LogBook: {
      screen: LogBook
    },
    DiveCenter: {
      screen: DiveCenter
    },
    DiveCenterDetail: {
      screen: DiveCenterDetail
    },
    // new bottom screen
    SettingScreen: {
      screen: SettingScreen
    },
    MapScreen: {
      screen: MapScreen
    },
    ProfileScreen: {
      screen: ProfileScreen
    },
    NotificationScreen: {
      screen: NotificationScreen
    },
    SubmitReview: {
      screen: SubmitReview
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);