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
import Card from '../../Component/Review'

const DiveCenter = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const [text, setText] = useState("")
    const [rankingValue, setValue] = useState("")


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
                        resizeMode={FastImage.resizeMode.contain}
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