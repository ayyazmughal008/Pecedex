import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import MAINAPP from "./MainApp";
import { Store, persistor } from "./src/Redux/store";
import SplashScreen from 'react-native-splash-screen'
import { PersistGate } from "redux-persist/integration/react";
import RemotePushController from './src/Service/RemotePushController'
export default class App extends React.Component {

  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={Store}>
          <PersistGate loading={null} persistor={persistor}>
            <MAINAPP />
            <RemotePushController />
          </PersistGate>
        </Provider>
      </View>
    );
  }
}