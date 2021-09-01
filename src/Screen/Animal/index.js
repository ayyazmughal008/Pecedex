import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/AnimalCard'
import { data } from './data'
import { getMenuFiles } from '../../Redux/action'
import Tab from '../../Component/BottomTab'
import Strings from '../../Translation'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import { useDispatch, useSelector } from 'react-redux';
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'
let viewableItemsChanged = null;
const Map = (props) => {
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const nativeAdViewRef = useRef();

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
        let menuData = await getMenuFiles(login.data.id)
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
                    clickHandler={() => {
                        props.navigation.navigate('Classes', {
                            id: item.id
                        })
                    }}
                />
            ),
        [],
    );


    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/108.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.cover}
            >
                <Text
                    onPress={() => props.navigation.goBack()}
                    style={styles.headerTitle}>
                    {Strings.ANIMAL}
                </Text>
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
            </FastImage>

        </SafeAreaView>
    )
}

export default Map;