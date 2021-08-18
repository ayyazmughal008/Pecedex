import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, Linking, Platform, Alert, ScrollView } from 'react-native'
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
import Share from 'react-native-share';
import Stars from '../../Component/ShowStars'
import { saveCenterId } from '../../Redux/action'

const DiveCenter = (props) => {
    const dispatch = useDispatch()
    const language = useSelector((state) => state.user.language);
    const centerId = useSelector((state) => state.user.centerId);
    const info = props.navigation.getParam('data', "2uhih")
    const [myId, setMyId] = useState("")
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        if (info) {
            setMyId(info.data.id)
        }
    }, [info])

    const callNumber = phone => {
        console.log('callNumber ----> ', phone);
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };
    const shareMessage = async () => {
        const shareOptions = {
            title: 'PECEDEX',
            message: "Have a look at this amazing application.",
            failOnCancel: false,
            url: "https://youtu.be/M1YpXF4sEHQ",
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(ShareResponse)
            //setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            //setResult('error: '.concat(getErrorString(error)));
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={{ uri: "http://199.247.13.90/" + info.data.image }}
                    style={[styles.top, { height: heightPercentageToDP(30) }]}
                    resizeMode={FastImage.resizeMode.cover}
                >
                    <FastImage
                        source={{ uri: "http://199.247.13.90/" + info.data.logo }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.diveLogo}
                    />
                </FastImage>

                <Text style={[styles.profileName, { alignSelf: "center", color: blue }]}>
                    {info.data.name}
                </Text>
                <View style={styles.infoBox}>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(`mailto:${info.data.email}`)}
                        style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <Icon
                            name="gmail"
                            color={blue}
                            size={30}
                        />
                        <Text style={styles.infoTxt}>
                            {info.data.email}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => callNumber(info.data.telephone)}
                        style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 5 }}>
                        <Icon2
                            name="phone"
                            color={blue}
                            size={35}
                        />
                        <Text style={styles.infoTxt}>
                            {info.data.telephone}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 5 }}>
                        <Icon2
                            name="map-marker"
                            color={blue}
                            size={40}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.infoTxt}>
                            {info.data.address}
                        </Text>
                    </TouchableOpacity>
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
                            style={styles.socialImages}
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
                            style={styles.socialImages}
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
                            style={styles.socialImages}
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
                            style={styles.socialImages}
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
                            style={styles.socialImages}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(info.data.tiktokLink);
                        }}
                    >
                        <FastImage
                            source={require('../../Images/tiktok.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={[styles.socialImages, {
                                width: widthPercentageToDP(10),
                                height: heightPercentageToDP(5),
                            }]}
                        />
                    </TouchableOpacity>
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={[styles.line, { marginTop: heightPercentageToDP(1) }]}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={{
                    width: info.data.certifiers.length < 2 ?
                        "22%" : info.data.certifiers.length < 4 ?
                            "45%" :
                            info.data.certifiers.length < 6 ?
                                "65%" : "100%",
                    alignSelf: "center",
                    marginTop: heightPercentageToDP(1),
                    //backgroundColor:"red"
                }}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ alignItems: "center", flexGrow: 1 }}>
                        {info.data.certifiers.map((item, index) => {
                            return (
                                <FastImage
                                    key={"unique" + index}
                                    source={{ uri: "http://199.247.13.90/" + item }}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.squre}
                                />
                            )
                        })}
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={styles.commentView}
                    onPress={() => {
                        //dispatch(saveCenterId(myId));
                        //alert(myId);
                        props.navigation.navigate('DiveCenterDetail', {
                            array: info.data.comments,
                            count: info.data.commentsCount,
                            id: myId,
                            average: info.averageStars,
                            totalAverage: info.totalAverage
                        });
                    }}
                >
                    <View style={[styles.starView, { alignSelf: "center" }]}>
                        <Stars value={info.averageStars} />
                        <Text style={styles.commentTxt}>
                            {info.data.commentsCount}{" "}{Strings.Comments}
                        </Text>
                    </View>
                </TouchableOpacity>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5), marginTop: heightPercentageToDP(4) }]}>
                    {Strings.ACTIVITIES}
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
                    {Strings.DIVING_COURSES}
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
                    {Strings.OTHER_SERVICES}
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