import React from "react";
import { View } from "react-native";
import NAVIGATOR, { navigationService } from "./src/RootNavigator";
import MainNavigator from "./src/MainNavigator";
import { useSelector } from 'react-redux';

const MainApp = props => {
    const isLogin = useSelector((state) => state.user.isLogin);
    return (
        <View style={{ flex: 1 }}>
            {
                !isLogin ?
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
            {/* <NAVIGATOR
                //uriPrefix={prefix}
                ref={navigatorRef => {
                    navigationService.setTopLevelNavigator(navigatorRef);
                }}
            /> */}
        </View>
    );
}

export default MainApp;