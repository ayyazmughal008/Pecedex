import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator, DeviceEventEmitter, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { getMainMenu, submitFcmToken } from '../../Redux/action'
import Icon from 'react-native-vector-icons/EvilIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import Card from '../../Component/HomeCard/'
//import { data } from './data'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import { useDispatch, useSelector } from 'react-redux';
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'

let viewableItemsChanged = null;
const Home = (props) => {
    const dispatch = useDispatch()
    const language = useSelector((state) => state.user.language);
    const token = useSelector((state) => state.user.token);
    const login = useSelector((state) => state.user.login);
    const menuData = useSelector((state) => state.user.menuData);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [isLoading, setIsLoading] = useState(false)
    const [menuResponse, setResponse] = useState('')
    const nativeAdViewRef = useRef();
    const data = [
        {
            id: 1,
            title: Strings.pecios,
            animalImg: require('../../Images/8.png')
        },
        {
            id: 1,
            title: Strings.animals,
            animalImg: require('../../Images/108.png')
        },
        {
            id: 1,
            ad: true
        },
        {
            id: 1,
            title: Strings.logbook,
            animalImg: require('../../Images/109.png')
        },

    ]
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
        postTokenApi()
    }, [])

    const postTokenApi = async () => {
        setIsLoading(true)
        await submitFcmToken(token, login.data.id)
        await setIsLoading(false)
        dispatch(getMainMenu(login.data.id))
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
                            if (menuData.wreckBlock === 'no') {
                                props.navigation.navigate('Pecios')
                            } else {
                                Alert.alert("Permission Denied", "No permission to access this module")
                            }
                        } else if (index == 1) {
                            if (menuData.animalBlock === 'no') {
                                props.navigation.navigate('Animal')
                            } else {
                                Alert.alert("Permission Denied", "No permission to access this module")
                            }

                        } else if (index == 3) {
                            //props.navigation.navigate('NewScreen')
                            props.navigation.navigate('Dive')
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
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={black}
                        style={styles.loading}
                    />
                }
                {AuthLoading &&
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

export default Home;