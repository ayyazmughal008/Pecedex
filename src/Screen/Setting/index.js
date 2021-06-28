import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { black, green, lightRed } from '../../config/color'
import { useSelector, useDispatch } from 'react-redux';
import Strings from '../../Translation'
import { logOut, setLanguage } from '../../Redux/action'
import RNRestart from 'react-native-restart';

const Setting = (props) => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])


    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={styles.profileImgView}>
                {!login.data.image ?
                    <FastImage
                        style={styles.profileImg}
                        source={require('../../Images/profile_img5.png')}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    : <FastImage
                        style={styles.profileImg}
                        source={{ uri: "http://199.247.13.90/" + login.data.image }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
            </View>
            {/* <View style={{ height: heightPercentageToDP(10) }} /> */}
            <View style={styles.titleView}>
                <Text style={styles.titleTxt}>
                    {Strings.email}
                </Text>
                <FastImage
                    source={require('../../Images/line_right.png')}
                    style={styles.line2}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </View>
            <TextInput
                style={[styles.input3, { marginLeft: widthPercentageToDP(4), }]}
                placeholder="ayyazmughal007@gmail.com"
                placeholderTextColor={black}
                editable={false}
                value={login.data.email}
            />
            <View style={styles.titleView}>
                <Text style={styles.titleTxt}>
                    {Strings.password}
                </Text>
                <FastImage
                    source={require('../../Images/line_right.png')}
                    style={styles.line2}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </View>
            <View style={{ width: widthPercentageToDP(90), alignSelf: "center", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TextInput
                    style={styles.input3}
                    placeholder="********"
                    placeholderTextColor={black}
                    editable={false}
                />
                <Text style={[styles.btnText, { color: lightRed }]}>
                    {Strings.change}
                </Text>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.titleTxt}>
                    {Strings.language}
                </Text>
                <FastImage
                    source={require('../../Images/line_right.png')}
                    style={styles.line2}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </View>
            <View style={{ width: widthPercentageToDP(90), alignSelf: "center", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TextInput
                    style={styles.input3}
                    placeholder={!language ? "English" : language === 'es' ? "Spanish" : "English"}
                    placeholderTextColor={black}
                    editable={false}
                />
                <Text
                    onPress={() => {
                        if (!language) {
                            dispatch(setLanguage('en'));
                            RNRestart.Restart();
                        } else if (language === 'es') {
                            dispatch(setLanguage('en'));
                            RNRestart.Restart();
                        } else {
                            dispatch(setLanguage('es'));
                            RNRestart.Restart();
                        }

                    }}
                    style={[styles.btnText, { color: lightRed }]}>
                    {Strings.change}
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.inputView, {
                    backgroundColor: green,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: heightPercentageToDP(4),
                    alignSelf: "center"
                }]}
                onPress={() => { dispatch(logOut()) }}
            >
                <Text style={styles.btnText}>
                    {Strings.logout}
                </Text>
            </TouchableOpacity>
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

export default Setting;