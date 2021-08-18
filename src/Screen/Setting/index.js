import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { black, green, lightRed } from '../../config/color'
import { useSelector, useDispatch } from 'react-redux';
import Strings from '../../Translation'
import { logOut, setLanguage, logoutUser, sendUserLanguage } from '../../Redux/action'
import RNRestart from 'react-native-restart';
import { GooglePay } from 'react-native-google-pay';

const Setting = (props) => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const allowedCardNetworks = ['VISA', 'MASTERCARD'];
    const allowedCardAuthMethods = ['PAN_ONLY', 'CRYPTOGRAM_3DS'];

    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    const logoutApi = async () => {
        setIsLoading(true)
        await logoutUser(login.data.id)
        await setIsLoading(false)
        dispatch(logOut())
    }
    const languageApi = async (language) => {
        setIsLoading(true)
        await sendUserLanguage(login.data.id, language)
        await setIsLoading(false)
        RNRestart.Restart();
    }
    const _onMonthlyClick = () => {
        const requestData = {
            cardPaymentMethod: {
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    // stripe (see Example):
                    // gateway: 'stripe',
                    // gatewayMerchantId: '',
                    // stripe: {
                    //     publishableKey: 'pk_test_TYooMQauvdEDq54NiTphI7jx',
                    //     version: '2018-11-08',
                    // },
                    // other:
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                },
                allowedCardNetworks,
                allowedCardAuthMethods,
            },
            transaction: {
                totalPrice: '10',
                totalPriceStatus: 'FINAL',
                currencyCode: 'USD',
            },
            merchantName: 'Example Merchant',
        };
        // Set the environment before the payment request
        GooglePay.setEnvironment(GooglePay.ENVIRONMENT_TEST);

        // Check if Google Pay is available
        GooglePay.isReadyToPay(allowedCardNetworks, allowedCardAuthMethods)
            .then((ready) => {
                if (ready) {
                    // Request payment token
                    GooglePay.requestPayment(requestData)
                        .then((token) => {
                            console.log(token)
                        })
                        .catch((error) => console.log(error.code, error.message));
                }
            })
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
                <Text
                    onPress={() => props.navigation.navigate('ForgetPWD')}
                    style={[styles.btnText, { color: lightRed }]}>
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
                            languageApi("en")
                        } else if (language === 'es') {
                            dispatch(setLanguage('en'));
                            languageApi("en")
                        } else {
                            dispatch(setLanguage('es'));
                            languageApi("es")
                        }

                    }}
                    style={[styles.btnText, { color: lightRed }]}>
                    {Strings.change}
                </Text>
            </View>
            <Text style={[styles.titleTxt, { alignSelf: "center" }]}>
                {Strings.membership}
            </Text>
            <TouchableOpacity
                style={[styles.logoutBtn, {
                    borderColor: green,
                    alignSelf: "center",
                    marginTop: heightPercentageToDP(1)
                }]}
                onPress={() => { _onMonthlyClick() }}
            >
                <Text style={styles.logoutBtnTxt}>
                    {"$ 20.00 / PER MONTHLY"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.logoutBtn, {
                    borderColor: "#FFD700",
                    alignSelf: "center",
                    marginTop: heightPercentageToDP(1)
                }]}
                onPress={() => { logoutApi() }}
            >
                <Text style={styles.logoutBtnTxt}>
                    {"$ 100.00 / PER YEARLY"}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.logoutBtn, {
                    position: "absolute",
                    bottom: "10%",
                    alignSelf: "center"
                }]}
                onPress={() => { logoutApi() }}
            >
                <Text style={styles.logoutBtnTxt}>
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
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={black}
                    style={styles.loading}
                />
            }
        </SafeAreaView>
    )
}

export default Setting;