import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { useSelector, useDispatch } from 'react-redux';
import Strings from '../../Translation'
import ShowStars from '../../Component/ShowRanking'

const DiveCenter = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const language = useSelector((state) => state.user.language);
    const array = props.navigation.getParam('array', '123')
    const count = props.navigation.getParam('count', '123')
    const id = props.navigation.getParam('id', '123')
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    const _renderItem = ({ item, index }) => {
        return (
            <ShowStars
                name={item.name}
                value={item.stars}
                comment={item.comment}
            />
        )
    }

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
            <View style={{ marginTop: heightPercentageToDP(1) }} />
            <View style={[styles.commentView, {
                backgroundColor: blue,
                borderRadius: widthPercentageToDP(5),
                height: heightPercentageToDP(20),
            }]}>
                <View style={{ flexDirection: "row", alignItems: "center", height: "25%", width: "90%", }}>
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
                    {count}{" "}{Strings.Comments}
                </Text>
                <Text
                    onPress={() => props.navigation.navigate('SubmitReview', {
                        id: id
                    })}
                    style={[styles.commentTxt, {
                        textDecorationLine: "underline"
                    }]}>
                    {Strings.Write_Review}
                </Text>
            </View>

            {!array || !array.length ?
                <View />
                : <FlatList
                    data={array}
                    keyExtractor={(item, index) => "unque" + index}
                    showsVerticalScrollIndicator={false}
                    renderItem={_renderItem}
                />}

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