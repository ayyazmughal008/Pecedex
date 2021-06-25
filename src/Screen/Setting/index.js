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
import { logOut } from '../../Redux/action'

const Setting = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    useEffect(() => {
        Strings.setLanguage('en')
    }, [])


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
                    {"Email"}
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
                    {"Password"}
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
                    {"Change"}
                </Text>
            </View>
            <View style={styles.titleView}>
                <Text style={styles.titleTxt}>
                    {"Language"}
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
                    placeholder="English"
                    placeholderTextColor={black}
                    editable={false}
                />
                <Text style={[styles.btnText, { color: lightRed }]}>
                    {"Change"}
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