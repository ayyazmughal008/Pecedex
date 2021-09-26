import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/AnimalCard'
import { data } from './data'
import { getMenuFamily } from '../../Redux/action'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'
let viewableItemsChanged = null;

const Order = (props) => {
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const id = props.navigation.getParam('id', "12")
    const language = useSelector((state) => state.user.language);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        getApis()
    }, [])

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getMenuFamily(id, login.data.id)
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
                        props.navigation.navigate('Category', {
                            id: item.id
                        })
                    }}
                />
            ),
        [],
    );

    return (
        <SafeAreaView style={styles.container}>
            {!Response ?
                <FastImage
                    source={require('../../Images/top.png')}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.stretch}
                >
                    <Text style={styles.proInfoTile}>{""}</Text>
                </FastImage>
                : <FastImage
                    source={{ uri: "http://199.247.13.90/" + Response.headerImage }}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.cover}
                >
                    <Text
                        onPress={() => props.navigation.goBack()}
                        style={styles.headerTitle}>
                        {!Response ? "" : !Response.headerTitle ? "" : Response.headerTitle}
                    </Text>
                </FastImage>

            }
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
                            flexGrow: 1
                        }}
                        style={{
                            alignSelf: "center",
                            marginTop: heightPercentageToDP(3)
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

export default Order;