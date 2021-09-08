import React, { useEffect, useState } from 'react'
import { View, SafeAreaView, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../config/styles'
import WebView from 'react-native-webview'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { useSelector, useDispatch } from 'react-redux';
import { white } from '../../config/color'
import Strings from '../../Translation'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'

//http://199.247.13.90/accessToken
const Payment = (props) => {
    const login = useSelector((state) => state.user.login);
    const language = useSelector((state) => state.user.language);
    const planId = props.navigation.getParam('planId', '1234')
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    const _renderLoading = () => {
        return (
            <ActivityIndicator
                color="#009688"
                size="large"
                style={styles.loading}
            />
        )
    }
    const handleResponse = data => {
        let result = data.url.search("cong")
        if (result > -1) {
            Alert.alert(Strings.paymentSuccess, Strings.paymentMessage)
            props.navigation.navigate('SettingScreen', {
                paymentSuccess: "true"
            })
        } else {
            console.log("nothing found")
        }

    }
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: white }]}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <WebView
                source={{ uri: `http://199.247.13.90/paypal/${login.data.id}/${planId}` }}
                renderLoading={_renderLoading}
                //Enable Javascript support
                javaScriptEnabled={true}
                //For the Cache
                domStorageEnabled={true}
                startInLoadingState={true}
                onNavigationStateChange={data => handleResponse(data)}
            />
            <Tab
                homeClick={() => props.navigation.dispatch(HomeAction)}
                profileClick={() => props.navigation.dispatch(profileAction)}
                settingClick={() => props.navigation.dispatch(settingAction)}
                mapClick={() => props.navigation.dispatch(mapAction)}
                notiClick={() => props.navigation.dispatch(notificationAction)}
            />
        </SafeAreaView>
    )

}

export default Payment;