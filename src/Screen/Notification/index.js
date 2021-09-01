import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import Card from '../../Component/NotiicationCard'
import FastImage from 'react-native-fast-image'
import { data } from './data'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';
import { black } from '../../config/color'
import { userNotification, deleteUserNotification } from '../../Redux/action'

const Notification = (props) => {
    const dispatch = useDispatch();
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [Response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        getNotificationApi();
    }, [])

    const getNotificationApi = async () => {
        setIsLoading(true)
        const data = await userNotification(login.data.id)
        await setResponse(data)
        await setIsLoading(false)
    }
    const deleteNotiApi = async (id) => {
        setIsLoading(true)
        const data = await deleteUserNotification(login.data.id, id)
        await setResponse(data)
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            {!Response || !Response.data.length ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 10 }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                date={item.created_at}
                                deleteNotifications={() => deleteNotiApi(item.id)}
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

export default Notification;