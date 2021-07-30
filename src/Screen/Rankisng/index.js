import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { black, blue, white } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { data } from './data'
import Card from '../../Component/RankingCard'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import { getUserScore } from '../../Redux/action'
import { useSelector, useDispatch } from 'react-redux';
import Strings from '../../Translation'

const Profile = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const language = useSelector((state) => state.user.language);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        getCount()
    }, [])
    const getCount = async () => {
        setIsLoading(true)
        let menuData = await getUserScore(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={require('../../Images/22.png')}
                    style={styles.top2}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={[styles.profileImgView,{
                    marginTop:heightPercentageToDP(-15)
                }]}>
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
                <View style={styles.profileView}>
                    <Text style={[styles.profileName, { color: black, fontSize: widthPercentageToDP(5), alignSelf: "center" }]}>
                        {"PUNTUACION"}
                    </Text>
                    <Text style={[styles.profileName, { color: white, fontSize: widthPercentageToDP(5), alignSelf: "center" }]}>
                        {!Response ? "0" : !Response.scoreTotal ? "0" : Response.scoreTotal}
                    </Text>
                    <View style={[styles.profileInfo, { width: widthPercentageToDP(50), marginTop: 0 }]}>
                        <FastImage
                            source={require('../../Images/seaCap.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text
                            style={styles.proInfoTile}
                        //onPress={() => props.navigation.navigate('Dive')}
                        >
                            {!Response ? "0" : !Response.scoreDive ? "0" : Response.scoreDive}
                        </Text>
                    </View>
                    <View style={[styles.profileInfo, { width: widthPercentageToDP(50) }]}>
                        <FastImage
                            source={require('../../Images/fish.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                        //onPress={() => props.navigation.navigate('AnimalSeen')} 
                        >
                            {!Response ? "0" : !Response.scoreGenre ? "0" : Response.scoreGenre}
                        </Text>
                    </View>
                    <View style={[styles.profileInfo, { width: widthPercentageToDP(50) }]}>
                        <FastImage
                            source={require('../../Images/ship.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                        //onPress={() => props.navigation.navigate('Pecios')}
                        >
                            {!Response ? "0" : !Response.scorePecio ? "0" : Response.scorePecio}
                        </Text>
                    </View>
                </View>

                {/* <FastImage
                    source={require('../../Images/line.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={{
                        width: widthPercentageToDP(70),
                        height: heightPercentageToDP(0.2),
                        marginTop: heightPercentageToDP(2),
                        alignSelf: "center"
                    }}
                /> */}

                {!Response || !Response.topTen.length ?
                    <View />
                    : <FlatList
                        data={Response.topTen}
                        showsVerticalScrollIndicator={false}
                        style={{ alignSelf: "center", marginTop: 10 }}
                        keyExtractor={(item, index) => "unique" + index}
                        renderItem={({ item, index }) => {
                            return (
                                <Card
                                    rank={index + 1}
                                    title={item.name}
                                    score={item.score}
                                />
                            )
                        }}
                    />}
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

export default Profile;