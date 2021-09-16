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
import Stars from '../../Component/ShowStars'

const DiveCenter = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const language = useSelector((state) => state.user.language);
    const array = props.navigation.getParam('array', '123')
    const count = props.navigation.getParam('count', '123')
    const average = props.navigation.getParam('average', '123')
    const id = props.navigation.getParam('id', '123')
    const logo = props.navigation.getParam('logo','dkhj')
    const totalAverage = props.navigation.getParam('totalAverage', '123')
    const [myId, setMyId] = useState("")
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        if (id) {
            setMyId(id)
        }
    }, [id])
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
                        source={{ uri: "http://199.247.13.90/" + logo }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
            </View>
            <View style={{ marginTop: heightPercentageToDP(2) }} />
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={[styles.commentView, {
                    backgroundColor: blue,
                    borderRadius: widthPercentageToDP(5),
                    height: heightPercentageToDP(45),
                }]}>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        //backgroundColor:"red"
                    }}>
                        <Stars value={5} />
                        <Text style={styles.commentTxt}>
                            {totalAverage.fiveStars}
                        </Text>
                    </View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        //backgroundColor:"red"
                    }}>
                        <Stars value={4} />
                        <Text style={styles.commentTxt}>
                            {totalAverage.fourStars}
                        </Text>
                    </View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        //backgroundColor:"red"
                    }}>
                        <Stars value={3} />
                        <Text style={styles.commentTxt}>
                            {totalAverage.threeStars}
                        </Text>
                    </View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        //backgroundColor:"red"
                    }}>
                        <Stars value={2} />
                        <Text style={styles.commentTxt}>
                            {totalAverage.twoStars}
                        </Text>
                    </View>
                    <View style={{
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        //backgroundColor:"red"
                    }}>
                        <Stars value={1} />
                        <Text style={styles.commentTxt}>
                            {totalAverage.oneStars}
                        </Text>
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
                        onPress={() => {
                            //alert(myId);
                            props.navigation.navigate('SubmitReview', {
                                id: myId
                            });
                        }
                        }
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
                    />
                }
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