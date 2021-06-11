import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput } from 'react-native'
import { styles } from '../../config/styles'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { black, lightRed } from '../../config/color'

const Setting = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
                style={styles.profileImg}
                source={require('../../Images/profile_img5.png')}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{ height: heightPercentageToDP(10) }} />
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
                style={[styles.input3, { marginLeft: widthPercentageToDP(8), }]}
                placeholder="ayyazmughal007@gmail.com"
                placeholderTextColor={black}
                editable={false}
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