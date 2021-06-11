import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'

const DiveCenter = (props) => {

    const _renderItem = ({ item, index }) => {
        return (
            <View style={[styles.commentView, {
                height: heightPercentageToDP(20),
            }]}>
                <Text style={[styles.profileName, { alignSelf: "center", color: blue }]}>
                    {"FULANITO "}{index + 1}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center", height: "20%", width: "80%", }}>
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                </View>
                <Text style={[styles.commentTxt, { textAlign: "center" }]}>
                    {"Este centro es muy bueno y repetiria sin duad"}
                </Text>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </View>
        )
    }

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
            <View style={{ marginTop: heightPercentageToDP(14) }} />
            <View style={[styles.commentView, {
                backgroundColor: blue,
                borderRadius: widthPercentageToDP(5),
                height: heightPercentageToDP(15),
            }]}>
                <View style={{ flexDirection: "row", alignItems: "center", height: "30%", width: "90%", }}>
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                    <FastImage
                        source={require('../../Images/star.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.star}
                    />
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={styles.commentTxt}>
                    {"312 Comentarios"}
                </Text>
            </View>

            <FlatList
                data={[{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 },]}
                keyExtractor={(item, index) => "unque" + index}
                showsVerticalScrollIndicator={false}
                renderItem={_renderItem}
            />

            <View style={{ height: heightPercentageToDP(7) }} />
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

export default DiveCenter;