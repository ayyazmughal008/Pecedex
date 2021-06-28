import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Linking } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Zocial'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';
import HTML from "react-native-render-html";

const DiveCenter = (props) => {
    const language = useSelector((state) => state.user.language);
    const info = props.navigation.getParam('data', "2uhih")
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={{ uri: "http://199.247.13.90/" + info.data.image }}
                    style={[styles.top, { height: heightPercentageToDP(30) }]}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <Text style={[styles.profileName, { alignSelf: "center", color: blue }]}>
                    {info.data.name}
                </Text>
                <View style={styles.infoBox}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <Icon
                            name="gmail"
                            color={blue}
                            size={30}
                        />
                        <Text style={styles.infoTxt}>
                            {info.data.email}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 5 }}>
                        <Icon2
                            name="phone"
                            color={blue}
                            size={35}
                        />
                        <Text style={styles.infoTxt}>
                            {info.data.telephone}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 5 }}>
                        <Icon2
                            name="map-marker"
                            color={blue}
                            size={40}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.infoTxt}>
                            {info.data.address}
                        </Text>
                    </View>
                </View>
                <View style={styles.socialView}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(info.data.globeLink);
                        }}
                    >
                        <FastImage
                            source={require('../../Images/129.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(info.data.facebookLink);
                        }}
                    >
                        <FastImage
                            source={require('../../Images/130.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(info.data.instagramLink);
                        }}
                    >
                        <FastImage
                            source={require('../../Images/131.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(info.data.twitterLink);
                        }}
                    >
                        <FastImage
                            source={require('../../Images/132.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(info.data.youtubeLink);
                        }}
                    >
                        <FastImage
                            source={require('../../Images/133.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <TouchableOpacity
                    style={styles.commentView}
                    onPress={() => { props.navigation.navigate('DiveCenterDetail') }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <FastImage
                            source={{ uri: "http://199.247.13.90/" + info.data.certifier }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.squre}
                        />
                        <View style={styles.starView}>
                            <View style={{ flexDirection: "row", alignItems: "center", height: "45%", width: "100%", }}>
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
                            <Text style={styles.commentTxt}>
                                {"312 Comentarios"}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5) }]}>
                    {"ACTIVIDADES"}
                </Text>
                <HTML
                    source={{ html: info.data.activities }}
                    containerStyle={{
                        marginLeft: widthPercentageToDP(8),
                        //backgroundColor: "red",
                    }}
                    tagsStyles={{
                        p: {
                            fontSize: widthPercentageToDP(4.5),
                            color: black,
                            fontFamily: "Montserrat-SemiBold",
                            marginTop: heightPercentageToDP(1)
                        }
                    }}
                />
                {/* new liness  */}
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5) }]}>
                    {"CURSOS DE BUCEO"}
                </Text>
                <HTML
                    source={{ html: info.data.courses }}
                    containerStyle={{
                        marginLeft: widthPercentageToDP(8),
                        //backgroundColor: "red",
                    }}
                    tagsStyles={{
                        p: {
                            fontSize: widthPercentageToDP(4.5),
                            color: black,
                            fontFamily: "Montserrat-SemiBold",
                            marginTop: heightPercentageToDP(1)
                        }
                    }}
                />
                {/* new liness  */}
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5) }]}>
                    {"OTROS SERVICIOS"}
                </Text>
                <HTML
                    source={{ html: info.data.services }}
                    containerStyle={{
                        marginLeft: widthPercentageToDP(8),
                        //backgroundColor: "red",
                    }}
                    tagsStyles={{
                        p: {
                            fontSize: widthPercentageToDP(4.5),
                            color: black,
                            fontFamily: "Montserrat-SemiBold",
                            marginTop: heightPercentageToDP(1)
                        }
                    }}
                />
                <View style={{ marginTop: 10 }} />
            </KeyboardAwareScrollView>
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