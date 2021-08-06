import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/DiveCard'
import { data } from './data'
import Tab from '../../Component/BottomTab'
import { getUserDives, eraseData } from '../../Redux/action'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';
import { black } from '../../config/color'

const Dive = (props) => {
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
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
        getApis();
    }, [])

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getUserDives(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const eraseApis = async () => {
        setIsLoading(true)
        await eraseData(login.data.id)
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
            </FastImage>
            {!Response || !Response.data.length ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    listKey={(item, index) => `_key${index.toString()}`}
                    //style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                year={item.year}
                                months={item.months}
                                navigate={props.navigation.navigate}
                                destination="UpdateLogBook"
                            />
                        )
                    }}
                />}
            <TouchableOpacity
                onPress={() => { eraseApis() }}
                style={styles.roundButton}>
                <Text style={styles.plusText}>
                    {"+"}
                </Text>
            </TouchableOpacity>
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

export default Dive;