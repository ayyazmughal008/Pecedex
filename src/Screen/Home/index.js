import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { getMainMenu } from '../../Redux/action'
import Icon from 'react-native-vector-icons/EvilIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import Card from '../../Component/HomeCard/'
import { data } from './data'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import { AdMobInterstitial } from 'react-native-admob'

const Home = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [menuResponse, setResponse] = useState('')
    useEffect(() => {
        Strings.setLanguage('en')
    }, [])
    // useEffect(() => {
    //     //getApis()
    //     AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    //     AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712');

    //     AdMobInterstitial.addEventListener('adLoaded', () =>
    //         console.log('AdMobInterstitial adLoaded'),
    //     );
    //     AdMobInterstitial.addEventListener('adFailedToLoad', error =>
    //         console.warn(error),
    //     );
    //     AdMobInterstitial.addEventListener('adOpened', () =>
    //         console.log('AdMobInterstitial => adOpened'),
    //     );
    //     AdMobInterstitial.addEventListener('adClosed', () => {
    //         console.log('AdMobInterstitial => adClosed');
    //         AdMobInterstitial.requestAd().catch(error => console.warn(error));
    //     });
    //     AdMobInterstitial.addEventListener('adLeftApplication', () =>
    //         console.log('AdMobInterstitial => adLeftApplication'),
    //     );

    //     AdMobInterstitial.requestAd().catch(error => console.warn(error));
    // }, [])
    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getMainMenu()
        await setResponse(menuData)
        await setIsLoading(false)
    }
    // const showInterstitial = () => {
    //     AdMobInterstitial.showAd().catch(error => console.warn(error));
    // }
    useEffect(() => {
        //showInterstitial()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={require('../../Images/top.png')}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={[styles.inputView, {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: 5
                }]}>
                    <TextInput
                        placeholder={Strings.search}
                        placeholderTextColor="#ffff"
                        style={styles.input2}
                        onChangeText={text => setSearch(text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    <View style={styles.viewPass}>
                        <Text style={[styles.btnText, {
                            fontSize: widthPercentageToDP(6),
                            marginBottom: 6
                        }]}>
                            {"|"}
                        </Text>
                        <TouchableOpacity
                        // onPress={() => showPassword()}
                        >
                            <Icon
                                name="search"
                                color="#ffff"
                                size={25}
                                style={{ marginLeft: 5 }}
                            />

                        </TouchableOpacity>
                    </View>
                </View>
                {/* {!menuResponse || !menuResponse.data ?
                    <View />
                    :  */}
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                title={item.title}
                                animalImg={item.animalImg}
                                clickHandler={() => {
                                    if (index == 0) {
                                        props.navigation.navigate('Pecios')
                                    } else if (index == 1) {
                                        props.navigation.navigate('Animal')
                                    } else if (index == 2) {
                                        //props.navigation.navigate('NewScreen')
                                        props.navigation.navigate('LogBook')
                                    }
                                }}
                            />
                        )
                    }}
                />
                {/* } */}

            </KeyboardAwareScrollView>
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

export default Home;