import React, { useEffect } from "react";
import { View } from "react-native";
import NAVIGATOR, { navigationService } from "./src/RootNavigator";
import MainNavigator from "./src/MainNavigator";
import { useSelector, useDispatch } from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import { saveToken } from './src/Redux/action'

const MainApp = props => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);

    useEffect(() => {
        updateData();
    }, [])
    const updateData = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            getFcmToken();
            console.log('Authorization status:', authStatus);
        }
        messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage.data.type)
            // if (remoteMessage.data.type == "holiday") {
            //     navigationService.navigate("Vocation")
            // }
            // else if (remoteMessage.data.type == "part") {
            //     navigationService.navigate("ParteDiario")
            // }
            // else if (remoteMessage.data.type == "expense") {
            //     navigationService.navigate("MisGastos")
            // }
            // else if (remoteMessage.data.type == "blog") {
            //     navigationService.navigate("Blog")
            // }
            // else if (remoteMessage.data.type == "document") {
            //     navigationService.navigate("Documents")
            // }
            // else if (remoteMessage.data.type == "epi") {
            //     navigationService.navigate("Epis")
            // } else if (remoteMessage.data.type == "personal") {
            //     navigationService.navigate("PersonalDocuments")
            // }
            // else {
            //     alert("No data")
            // }
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage.data);
            // if (remoteMessage.data.type == "holiday") {
            //     navigationService.navigate("Vocation")
            // }
            // else if (remoteMessage.data.type == "part") {
            //     navigationService.navigate("ParteDiario")
            // }
            // else if (remoteMessage.data.type == "expense") {
            //     navigationService.navigate("MisGastos")
            // }
            // else if (remoteMessage.data.type == "blog") {
            //     navigationService.navigate("Blog")
            // }
            // else if (remoteMessage.data.type == "document") {
            //     navigationService.navigate("Documents")
            // }
            // else if (remoteMessage.data.type == "epi") {
            //     navigationService.navigate("Epis")
            // } else if (remoteMessage.data.type == "personal") {
            //     navigationService.navigate("PersonalDocuments")
            // }
            // else {
            //     alert("No data")
            // }
        });
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.data,
            );
            // if (remoteMessage.data.type == "holiday") {
            //     navigationService.navigate("Vocation")
            // }
            // else if (remoteMessage.data.type == "part") {
            //     navigationService.navigate("ParteDiario")
            // }
            // else if (remoteMessage.data.type == "expense") {
            //     navigationService.navigate("MisGastos")
            // }
            // else if (remoteMessage.data.type == "blog") {
            //     navigationService.navigate("Blog")
            // }
            // else if (remoteMessage.data.type == "document") {
            //     navigationService.navigate("Documents")
            // }
            // else if (remoteMessage.data.type == "epi") {
            //     navigationService.navigate("Epis")
            // } else if (remoteMessage.data.type == "personal") {
            //     navigationService.navigate("PersonalDocuments")
            // }
            // else {
            //     alert("No data")
            // }
            // navigation.navigate(remoteMessage.data.type);
        });
        // Check whether an initial notification is available
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log(
                    'Notification caused app to open from quit state:',
                    remoteMessage.data,
                );
                // if (remoteMessage.data.type == "holiday") {
                //     navigationService.navigate("Vocation")
                // }
                // else if (remoteMessage.data.type == "part") {
                //     navigationService.navigate("ParteDiario")
                // }
                // else if (remoteMessage.data.type == "expense") {
                //     navigationService.navigate("MisGastos")
                // }
                // else if (remoteMessage.data.type == "blog") {
                //     navigationService.navigate("Blog")
                // }
                // else if (remoteMessage.data.type == "document") {
                //     navigationService.navigate("Documents")
                // }
                // else if (remoteMessage.data.type == "epi") {
                //     navigationService.navigate("Epis")
                // } else if (remoteMessage.data.type == "personal") {
                //     navigationService.navigate("PersonalDocuments")
                // }
                // else {
                //     alert("No data")
                // }
                //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
        });
    }
    const getFcmToken = async () => {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
            //console.log("Your Firebase Token is:", fcmToken);
            dispatch(saveToken(fcmToken))
        } else {
            console.log("Failed", "No token received");
        }
    }
    return (
        <View style={{ flex: 1 }}>
            {!login ?
                <NAVIGATOR
                    //uriPrefix={prefix}
                    ref={navigatorRef => {
                        navigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
                : <MainNavigator
                    ref={navigatorRef => {
                        navigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
            }
        </View>
    );
}

export default MainApp;