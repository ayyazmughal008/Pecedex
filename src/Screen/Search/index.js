import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TextInput, TouchableOpacity, DeviceEventEmitter } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/AnimalCard'
//import { data } from './data'
import { getMenuFiles, searchList } from '../../Redux/action'
import Tab from '../../Component/BottomTab'
import Strings from '../../Translation'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { black } from '../../config/color'
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons'
import { AdView } from '../../AdsServices/AdView'
import { Events } from '../../AdsServices/utils'
let viewableItemsChanged = null;

const Map = (props) => {
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const [searchText, setSearch] = useState('')

    useEffect(() => {
        //getApis()
    }, [])
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])

    const getApis = async (text) => {
        setIsLoading(true)
        let menuData = await searchList(text, login.data.id)
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
                    animalImg={item.image}
                    clickHandler={() => {
                        if (item.goto === "pecios-sheet") {
                            props.navigation.navigate("PeciosDetail", {
                                data: item.sheet
                            })
                        } else if (item.goto === "families") {
                            props.navigation.navigate('Family', {
                                id: item.id
                            })
                        } else if (item.goto === "categories") {
                            props.navigation.navigate('Category', {
                                id: item.id
                            })
                        } else if (item.goto === "classes") {
                            props.navigation.navigate('Classes', {
                                id: item.id
                            })
                        } else if (item.goto === "orders") {
                            props.navigation.navigate('Order', {
                                id: item.id
                            })
                        } else if (item.goto === "genres") {
                            props.navigation.navigate('Genre', {
                                id: item.id
                            })
                        } else if (item.goto === "genres-sheet") {
                            props.navigation.navigate('Detail', {
                                data: item.sheet
                            })
                        }
                        else {
                            alert("No route found")
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
            <View style={styles.serachView}>
                <TextInput
                    placeholder={Strings.search}
                    placeholderTextColor="#ffff"
                    style={styles.input2}
                    onChangeText={text => getApis(text)}
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
            {!Response || !Response.data ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center" }}
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