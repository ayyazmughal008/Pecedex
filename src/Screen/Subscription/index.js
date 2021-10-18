import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { Card } from 'react-native-elements'
import { styles } from '../../config/styles'
import Icon from 'react-native-vector-icons/Entypo'
import Icon2 from 'react-native-vector-icons/AntDesign'
import { green, white } from '../../config/color'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';

const Subscription = (props) => {
    const language = useSelector((state) => state.user.language);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <FastImage
                    source={require('../../Images/Banner.png')}
                    resizeMode={FastImage.resizeMode.cover}
                    style={styles.banner}
                />
                <Card containerStyle={styles.cardBanner}>
                    <FastImage
                        source={require('../../Images/banner_top.png')}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.bannerTop}
                    >
                        <Text style={[styles.subTypeText, {
                            color: white,
                            paddingLeft: widthPercentageToDP(4),
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.free}
                        </Text>
                    </FastImage>
                    <View style={{ flexDirection: "row-reverse", marginTop: heightPercentageToDP(3) }}>
                        <Text style={styles.bannerTypeText}>
                            {Strings.Premium}
                        </Text>
                        <Text style={styles.bannerTypeText}>
                            {Strings.free}
                        </Text>
                    </View>
                    <View style={styles.centerLine} />
                    <View style={styles.innerBanner}>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "16%" }}>
                            <View style={styles.bannerTitleView}>
                                <Text style={styles.subTypeText}>
                                    {Strings.Has_Advertising}
                                </Text>
                            </View>
                            <View style={styles.leftBanner}>
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                            <View style={styles.rightBanner}>
                                <Icon2
                                    name="close"
                                    color='#cccccc'
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "16%" }}>
                            <View style={styles.bannerTitleView}>
                                <Text style={styles.subTypeText}>
                                    {Strings.You_can_see_all_the_animals}
                                </Text>
                            </View>
                            <View style={styles.leftBanner}>
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                            <View style={styles.rightBanner}>
                                {/* <Icon2
                                name="close"
                                color='#cccccc'
                                size={30}
                            /> */}
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "16%" }}>
                            <View style={styles.bannerTitleView}>
                                <Text style={styles.subTypeText}>
                                    {Strings.You_can_see_all_the_wreck}
                                </Text>
                            </View>
                            <View style={styles.leftBanner}>
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                            <View style={styles.rightBanner}>
                                {/* <Icon2
                                name="close"
                                color='#cccccc'
                                size={30}
                            /> */}
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "16%" }}>
                            <View style={styles.bannerTitleView}>
                                <Text style={styles.subTypeText}>
                                    {Strings.You_can_only_save_10_dives + '\n' + Strings.infinite_in_premium}
                                </Text>
                            </View>
                            <View style={styles.leftBanner}>
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                            <View style={styles.rightBanner}>
                                {/* <Icon2
                                name="close"
                                color='#cccccc'
                                size={30}
                            /> */}
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "16%" }}>
                            <View style={styles.bannerTitleView}>
                                <Text style={styles.subTypeText}>
                                    {Strings.you_can_mark_animals_and_wrecks_as_seen}
                                </Text>
                            </View>
                            <View style={styles.leftBanner}>
                                {/* <Icon
                                name="check"
                                color={green}
                                size={30}
                            /> */}
                                <Icon2
                                    name="close"
                                    color='#cccccc'
                                    size={30}
                                />
                            </View>
                            <View style={styles.rightBanner}>
                                {/* <Icon2
                                name="close"
                                color='#cccccc'
                                size={30}
                            /> */}
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "16%" }}>
                            <View style={styles.bannerTitleView}>
                                <Text style={styles.subTypeText}>
                                    {Strings.you_can_upload_photos}
                                </Text>
                            </View>
                            <View style={styles.leftBanner}>
                                {/* <Icon
                                name="check"
                                color={green}
                                size={30}
                            /> */}
                                <Icon2
                                    name="close"
                                    color='#cccccc'
                                    size={30}
                                />
                            </View>
                            <View style={styles.rightBanner}>
                                {/* <Icon2
                                name="close"
                                color='#cccccc'
                                size={30}
                            /> */}
                                <Icon
                                    name="check"
                                    color={green}
                                    size={30}
                                />
                            </View>
                        </View>
                    </View>
                </Card>
                <Card containerStyle={styles.cardBanner2}>
                    <FastImage
                        source={require('../../Images/banner_top.png')}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.bannerTop}
                    >
                        <Text style={[styles.subTypeText, {
                            color: white,
                            paddingLeft: widthPercentageToDP(4),
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.Premium}
                        </Text>
                    </FastImage>
                    <Text style={[styles.subTypeText, {
                        paddingTop: heightPercentageToDP(3),
                        paddingLeft: widthPercentageToDP(4),
                        fontFamily: "Montserrat-SemiBold",
                    }]}>
                        {Strings.Pay_Monthly}
                    </Text>
                    <Text style={styles.amountTxt}>
                        {"5€/ mes"}
                    </Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Payment', {
                            planId: "P-3MY05731EE3202813MFULCEA"
                        })}
                        style={styles.payBtn}>
                        <Text style={[styles.subTypeText, {
                            color: white,
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.Subscribe_now}
                        </Text>
                    </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.cardBanner2}>
                    <FastImage
                        source={require('../../Images/banner_top.png')}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.bannerTop}
                    >
                        <Text style={[styles.subTypeText, {
                            color: white,
                            paddingLeft: widthPercentageToDP(4),
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.Premium}
                        </Text>
                    </FastImage>
                    <Text style={[styles.subTypeText, {
                        paddingTop: heightPercentageToDP(3),
                        paddingLeft: widthPercentageToDP(4),
                        fontFamily: "Montserrat-SemiBold",
                    }]}>
                        {Strings.semiannually}
                    </Text>
                    <Text style={styles.amountTxt}>
                        {"3,5€/ mes"}
                    </Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Payment', {
                            planId: "P-6M401578X09036921MFULD2Y"
                        })}
                        style={styles.payBtn}>
                        <Text style={[styles.subTypeText, {
                            color: white,
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.Subscribe_now}
                        </Text>
                    </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.cardBanner2}>
                    <FastImage
                        source={require('../../Images/banner_top.png')}
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.bannerTop}
                    >
                        <Text style={[styles.subTypeText, {
                            color: white,
                            paddingLeft: widthPercentageToDP(4),
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.Premium}
                        </Text>
                    </FastImage>
                    <Text style={[styles.subTypeText, {
                        paddingTop: heightPercentageToDP(3),
                        paddingLeft: widthPercentageToDP(4),
                        fontFamily: "Montserrat-SemiBold",
                    }]}>
                        {Strings.Pay_Yearly}
                    </Text>
                    <Text style={styles.amountTxt}>
                        {"2€/mes"}
                    </Text>
                    <Text style={[styles.subTypeText, {
                        paddingRight:widthPercentageToDP(2),
                        paddingLeft: widthPercentageToDP(5),
                        fontSize: widthPercentageToDP(3.5)
                    }]}>
                        {"*"}{Strings.trail}
                    </Text>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Payment', {
                            planId: "P-8A953487RU709335UMFULFXA"
                        })}
                        style={styles.payBtn}>
                        <Text style={[styles.subTypeText, {
                            color: white,
                            fontSize: widthPercentageToDP(4),
                            fontFamily: "Montserrat-SemiBold",
                        }]}>
                            {Strings.Subscribe_now}
                        </Text>
                    </TouchableOpacity>
                </Card>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Subscription;