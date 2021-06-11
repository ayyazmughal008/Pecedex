import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import HomeScreen from "../../Screen/Home";
import SettingScreen from "../../Screen/Setting";
import MapScreen from "../../Screen/Map";
import ProfileScreen from "../../Screen/Profile";
import NotificationScreen from "../../Screen/Notification";
import { white, blue } from '../../config/color'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Strings from '../../Translation'

export default createBottomTabNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{ color: tintColor, alignSelf: "center", fontFamily: "Montserrat-Regular", fontSize: widthPercentageToDP(3) }}>
                        {Strings.profile}
                    </Text>
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon4 name="user" color={tintColor} size={25} />
                ),
                tabBarVisible: true,
                header: null
            }
        },
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{ color: tintColor, alignSelf: "center", fontFamily: "Montserrat-Regular", fontSize: widthPercentageToDP(3) }}>
                        {Strings.home}
                    </Text>
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon4 name="home" color={tintColor} size={25} />
                ),
                tabBarVisible: true,
                header: null
            }
        },
        SettingScreen: {
            screen: SettingScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{ color: tintColor, alignSelf: "center", fontFamily: "Montserrat-Regular", fontSize: widthPercentageToDP(3) }}>
                        {Strings.setting}
                    </Text>
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Feather name="settings" color={tintColor} size={25} />
                ),
                tabBarVisible: true,
                header: null
            }

        },
        MapScreen: {
            screen: MapScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{ color: tintColor, alignSelf: "center", fontFamily: "Montserrat-Regular", fontSize: widthPercentageToDP(3) }}>
                        {Strings.map}
                    </Text>
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon name="map-marker-alt" color={tintColor} size={25} />
                ),
                tabBarVisible: true,
                header: null
            }
        },
        NotificationScreen: {
            screen: NotificationScreen,
            navigationOptions: {
                tabBarLabel: ({ focused, tintColor }) => (
                    <Text style={{ color: tintColor, alignSelf: "center", fontFamily: "Montserrat-Regular", fontSize: widthPercentageToDP(3) }}>
                        {Strings.notification}
                    </Text>
                ),
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon2 name="notifications" color={tintColor} size={25} />
                ),
                tabBarVisible: true,
                header: null
            }
        },
    },
    {
        tabBarOptions: {
            activeTintColor: white,
            inactiveTintColor: white,
            style: {
                height: heightPercentageToDP(7),
                backgroundColor: blue,
                borderTopWidth: 0,
                shadowOffset: { width: 5, height: 3 },
                shadowColor: "black",
                shadowOpacity: 0.5,
                elevation: 5
            }
        }
    },
    {
        initialRouteName: 'HomeScreen',
        //activeTintColor: '#F44336',
    },
);

