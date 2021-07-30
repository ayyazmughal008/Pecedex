import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator, DeviceEventEmitter } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { getMainMenu, submitFcmToken } from '../../Redux/action'
import Icon from 'react-native-vector-icons/EvilIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import Card from '../../Component/HomeCard/'
import { data } from './data'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import { useDispatch, useSelector } from 'react-redux';
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'

let viewableItemsChanged = null;
const Home = (props) => {
    const language = useSelector((state) => state.user.language);
    const token = useSelector((state) => state.user.token);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [menuResponse, setResponse] = useState('')
    const nativeAdViewRef = useRef();

    React.useEffect(() => {
        nativeAdViewRef.current?.loadAd();
    }, []);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        //console.log("My save token is", token)
        postTokenApi()
    }, [])

    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getMainMenu()
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const postTokenApi = async () => {
        setIsLoading(true)
        await submitFcmToken(token, login.data.id)
        await setIsLoading(false)
    }

    /**
  * [STEP II] We only want to know about the viewable
  * items when user stops scrolling. So as soon as the
  * scrolling ends we will send an event to all Ad Items
  * in the list to check which item is visible currently.
  *
  * Go to AdView.js for next steps.
  */
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
                    animalImg={item.animalImg}
                    clickHandler={() => {
                        if (index == 0) {
                            props.navigation.navigate('Pecios')
                        } else if (index == 1) {
                            props.navigation.navigate('Animal')
                        } else if (index == 3) {
                            //props.navigation.navigate('NewScreen')
                            props.navigation.navigate('LogBook')
                        }
                    }}
                />
            ),
        [],
    );

    return (

        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <FastImage
                source={require('../../Images/BG.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.bgImg2}
            >
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("SearchScreen")}
                    style={[styles.inputView, {
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignSelf: "center",
                        marginTop: heightPercentageToDP(5)
                    }]}>
                    <Text style={styles.searchText}>
                        {Strings.search}
                    </Text>
                    <View style={styles.viewPass}>
                        <Text style={[styles.btnText, {
                            fontSize: widthPercentageToDP(6),
                            marginBottom: 6
                        }]}>
                            {"|"}
                        </Text>
                        <Icon
                            name="search"
                            color="#ffff"
                            size={25}
                            style={{ marginLeft: 5 }}
                        />
                    </View>
                </TouchableOpacity>

                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    onScrollAnimationEnd={onScrollEnd}
                    onMomentumScrollEnd={onScrollEnd}
                    onScrollEndDrag={onScrollEnd}
                    onViewableItemsChanged={onViewableItemsChanged}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={renderItem}
                />
                <View style={{ height: heightPercentageToDP(7) }} />
                <Tab
                    homeClick={() => props.navigation.dispatch(HomeAction)}
                    profileClick={() => props.navigation.dispatch(profileAction)}
                    settingClick={() => props.navigation.dispatch(settingAction)}
                    mapClick={() => props.navigation.dispatch(mapAction)}
                    notiClick={() => props.navigation.dispatch(notificationAction)}
                />
            </FastImage>



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

export default Home;