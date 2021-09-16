import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/PeciosCard'
import { data } from './data'
import { black } from '../../config/color'
import { getAnimalSeenList } from '../../Redux/action'
import { useSelector } from 'react-redux';
import Strings from '../../Translation'

import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'
let viewableItemsChanged = null;

const Map = (props) => {
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    useEffect(() => {
        getApis()
    }, [])
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getAnimalSeenList(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const onScrollEnd = React.useCallback(() => {
        DeviceEventEmitter.emit(
            Events.onViewableItemsChanged,
            viewableItemsChanged,
        );
    }, []);

    /**
     * [STEP I] When viewable items change in the list
     * we want to know what items are visible and store them
     * in a variable for later us.
     */
    const onViewableItemsChanged = React.useCallback((e) => {
        viewableItemsChanged = e;
    }, []);
    const renderItem = React.useCallback(
        ({ item, index }) =>
            item.ad ? (
                /**
                 * loadOnMount -> We are telling the AdView to not load the ad when
                 * it is mounted.
                 */
                <AdView loadOnMount={true} index={index} type="image" media={false} />
            ) : (
                <Card
                    title={item.title}
                    animalImg={"http://199.247.13.90/" + item.image}
                    shortText={item.short}
                    seen={item.seen}
                    clickHandler={() => props.navigation.navigate("Detail", {
                        data: Response.data
                    })}
                />
            ),
        [Response],
    );


    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
                <Text style={styles.headerTitle}>{Strings.ANIMAL}</Text>
            </FastImage>
            {!Response || !Response.data ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 15 }}
                    keyExtractor={(item, index) => "unique" + index}
                    onScrollAnimationEnd={onScrollEnd}
                    onMomentumScrollEnd={onScrollEnd}
                    onScrollEndDrag={onScrollEnd}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderItem={renderItem}
                />
            }
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

export default Map;