import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/AnimalCard'
import { data } from './data'
import { getMenuClasses } from '../../Redux/action'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'

const Classes = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const id = props.navigation.getParam('id', "12")

    useEffect(() => {
        getApis()
    }, [])

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getMenuClasses(id)
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
                <Text style={styles.proInfoTile}>{"FILO CROCODILE"}</Text>
            </FastImage>
            {!Response || !Response.data ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                title={item.title}
                                animalImg={"http://199.247.13.90/" + item.image}
                                clickHandler={() => {
                                    props.navigation.navigate('Order', {
                                        id: item.id
                                    })
                                }}
                            />
                        )
                    }}
                />}
            <View style={{ height: heightPercentageToDP(5) }} />
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

export default Classes;