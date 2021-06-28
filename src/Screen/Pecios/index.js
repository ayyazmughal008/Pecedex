import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/PeciosCard'
import { data } from './data'
import { useSelector, useDispatch } from 'react-redux';
import { getPeciosData, getPeciosSeenList } from '../../Redux/action'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import Strings from '../../Translation'

const Map = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const login = useSelector((state) => state.user.login);
    const isSeen = props.navigation.getParam('isSeen', false)
    const language = useSelector((state) => state.user.language);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        if (isSeen) {
            getSeenList()
        } else {
            getApis()
        }
    }, [isSeen])

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getPeciosData()
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const getSeenList = async () => {
        setIsLoading(true)
        let menuData = await getPeciosSeenList(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
                <Text style={styles.proInfoTile}>{"PECIOS"}</Text>
            </FastImage>
            {!Response || !Response.data ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 15 }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                title={item.title}
                                animalImg={"http://199.247.13.90/" + item.image}
                                shortText={item.short}
                                clickHandler={() => props.navigation.navigate("PeciosDetail", {
                                    data: item
                                })}
                            />
                        )
                    }}
                />}
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

export default Map;