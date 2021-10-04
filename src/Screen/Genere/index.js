import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, DeviceEventEmitter, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/PeciosCard'
import { data } from './data'
import { getMenuGenro } from '../../Redux/action'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
        let menuData = await getMenuGenro(id, login.data.id)
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
                <AdView loadOnMount={true} index={index} type="image" media={false} />
            ) : (
                <Card
                    title={item.title}
                    animalImg={"http://199.247.13.90/" + item.image}
                    shortText={item.short}
                    seen={item.seen}
                    clickHandler={() => {
                        // if (!login.data.paid) {
                        //     updateRow()
                        // } else {
                        //     props.navigation.navigate("Detail", {
                        //         data: Response.data,
                        //         position: index
                        //     })
                        // }
                        props.navigation.navigate("Detail", {
                            data: Response.data,
                            position: index
                        })
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
        props.navigation.navigate("Detail", {
            data: temArr,
            position: 0
        })
        //console.log("===>",temArr)
    }
    const onViewRef = React.useRef((viewableItems) => {
        console.log(viewableItems)
        // Use viewable items in state or as intended
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

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
            <NavigationEvents onDidFocus={() => getApis()} />
            <FastImage
                source={require('../../Images/BG.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.bgImg2}>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.shortcutView}>
                        {!Response || !Response.summary ?
                            <View />
                            : Response.summary.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => {
                                            if (item.endPoint === 'get-files') {
                                                props.navigation.navigate('Animal')
                                            } else if (item.endPoint === 'get-classes') {
                                                props.navigation.navigate('Classes', {
                                                    id: item.paramValue
                                                })
                                            } else if (item.endPoint === 'get-orders') {
                                                props.navigation.navigate('Order', {
                                                    id: item.paramValue
                                                })
                                            } else if (item.endPoint === 'get-families') {
                                                props.navigation.navigate('Family', {
                                                    id: item.paramValue
                                                })
                                            } else if (item.endPoint === 'get-categories') {
                                                props.navigation.navigate('Category', {
                                                    id: item.paramValue
                                                })
                                            }
                                        }
                                        }>
                                        <Text
                                            key={"unique" + index}
                                            style={styles.shortCutTxt}>
                                            {"- "}{item.title}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                    {/* <View style={{ marginTop: heightPercentageToDP(4) }} /> */}
                    {!login.data.paid &&
                        <AdView
                            loadOnMount={true}
                            index={0}
                            type="image"
                            media={false} />
                    }
                    {!Response || !Response.data ?
                        <View />
                        : <FlatList
                            data={Response.data}
                            onViewableItemsChanged={onViewRef.current}
                            viewabilityConfig={viewConfigRef.current}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                //justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            style={{
                                //alignSelf: "center",
                                marginTop: heightPercentageToDP(2)
                            }}
                            onScrollAnimationEnd={onScrollEnd}
                            onMomentumScrollEnd={onScrollEnd}
                            onScrollEndDrag={onScrollEnd}
                            onViewableItemsChanged={onViewableItemsChanged}
                            keyExtractor={(item, index) => "unique" + index}
                            renderItem={renderItem}
                        />}
                    {/* <View style={{ marginTop: heightPercentageToDP(4) }} /> */}
                    {!login.data.paid &&
                        <AdView
                            loadOnMount={true}
                            index={1}
                            type="image"
                            media={false} />
                    }
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
                </KeyboardAwareScrollView>
            </FastImage>
        </SafeAreaView>
    )
}

export default Order;