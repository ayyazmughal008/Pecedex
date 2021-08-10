import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue, green } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../Component/Review'
import { submitDiveCenterRanking } from '../../Redux/action'
import Strings from '../../Translation'

const DiveCenter = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const centerId = useSelector((state) => state.user.centerId);
    const [text, setText] = useState("")
    const [rankingValue, setValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const id = props.navigation.getParam('id', '123')
    const [myId, setMyId] = useState("")
    const language = useSelector((state) => state.user.language);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    // useEffect(() => {
    //     console.log("my id is", centerId)
    // }, [centerId])
    useEffect(() => {
        if (id) {
            setMyId(id)
        }
    }, [id])
    const getApis = async (id, centerId, star, comment) => {
        setIsLoading(true)
        await submitDiveCenterRanking(id, centerId, star, comment)
        await setIsLoading(false)
        await setValue("")
        await setText("")
    }
    const _onSubmit = () => {
        if (!myId) {
            Alert.alert("", "ID is null in physical device")
            return
        }
        if (!rankingValue) {
            Alert.alert("", "Please choose at least one star")
            return
        }
        if (!text) {
            Alert.alert("", Strings.Please_write_something)
            return
        }
        getApis(login.data.id, myId, rankingValue, text)
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
            <KeyboardAwareScrollView>
                <Card
                    value={rankingValue}
                    onChangeTextHandler={text => setText(text)}
                    networkText={text}
                    clickHandler1={() => setValue(1)}
                    clickHandler2={() => setValue(2)}
                    clickHandler3={() => setValue(3)}
                    clickHandler4={() => setValue(4)}
                    clickHandler5={() => setValue(5)}
                />

                <TouchableOpacity
                    style={[styles.inputView, {
                        backgroundColor: green,
                        justifyContent: "center",
                        alignItems: "center",
                        //marginTop: heightPercentageToDP(4),
                        alignSelf: "center"
                    }]}
                    onPress={() => { _onSubmit() }}
                >
                    <Text style={styles.btnText}>
                        {Strings.submit}
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

            <View style={{ height: heightPercentageToDP(7) }} />
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

export default DiveCenter;