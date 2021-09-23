import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native'
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
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'
import { NavigationEvents } from 'react-navigation';
let viewableItemsChanged = null;

const Map = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const login = useSelector((state) => state.user.login);
    const isSeen = props.navigation.getParam('isSeen', false)
    const language = useSelector((state) => state.user.language);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
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

    const updateData = () => {
        if (isSeen) {
            getSeenList()
        } else {
            getApis()
        }
    }

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getPeciosData(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const getSeenList = async () => {
        setIsLoading(true)
        let menuData = await getPeciosSeenList(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const onScrollEnd = React.useCallback(() => {
        DeviceEventEmitter.emit(
            Events.onViewableItemsChanged,
            viewableItemsChanged,
        );
    }, []);
    const onViewableItemsChanged = React.useCallback((e) => {
        viewableItemsChanged = e;
    }, []);
    const renderItem = React.useCallback(
        ({ item, index }) =>
            item.ad ? (
                <AdView
                    loadOnMount={true}
                    index={index}
                    type="image"
                    media={false} />
            ) : (
                <Card
                    title={item.title}
                    animalImg={"http://199.247.13.90/" + item.image}
                    shortText={item.short}
                    seen={item.seen}
                    clickHandler={() => {
                        if (!login.data.paid) {
                            updateRow()
                        } else {
                            props.navigation.navigate("PeciosDetail", {
                                data: Response.data
                            })
                        }
                    }}
                />
            ),
        [Response],
    );

    const updateRow = async () => {
        setResponse(true)
        let temArr = [];
        await Response.data.forEach(item => {
            if (item.ad) {
                return
            } else {
                temArr.push(item)
            }
        });
        await setResponse(false)
        props.navigation.navigate("PeciosDetail", {
            data: temArr
        })
        //console.log("===>",temArr)
    }

    return (
        <SafeAreaView style={styles.container}>
            <NavigationEvents onDidFocus={() => updateData()} />
            <FastImage
                source={require('../../Images/8.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.cover}
            >
                <Text style={styles.headerTitle}>{Strings.PECIOS}</Text>
            </FastImage>
            <FastImage
                source={require('../../Images/BG.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.bgImg2}
            >
                {!Response || !Response.data ?
                    <View />
                    : <FlatList
                        data={Response.data}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexGrow:1
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                            marginTop: heightPercentageToDP(5)
                        }}
                        onScrollAnimationEnd={onScrollEnd}
                        onMomentumScrollEnd={onScrollEnd}
                        onScrollEndDrag={onScrollEnd}
                        onViewableItemsChanged={onViewableItemsChanged}
                        keyExtractor={(item, index) => "unique" + index}
                        renderItem={renderItem}
                    />}
                <View style={{ height: heightPercentageToDP(8) }} />
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
            </FastImage>
        </SafeAreaView>
    )
}

export default Map;