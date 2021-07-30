import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Tab from '../../Component/BottomTab'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Strings from '../../Translation'
import { getDiveCenters, getDiveCenterDetail, getGenreDetails, getPecioDetails, getPointsDetails, getDivesDetails } from '../../Redux/action'
import { useSelector, useDispatch } from 'react-redux';
import { black, blue } from '../../config/color'
import { FloatingAction } from "react-native-floating-action";

const Map = (props) => {
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [Response, setResponse] = useState('')
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        getApis()
    }, [])
    const postPointApis = async (centers, pecios, genreEasy, genreMedium, genreDifficult, points, dives) => {
        setIsLoading(true)
        let menuData = await getDiveCenters(login.data.id, centers, pecios, genreEasy, genreMedium, genreDifficult, points, dives)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getDiveCenters(login.data.id, "yes", "yes", "yes", "yes", "yes", "yes", "yes")
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const getCenterDetailApi = async (id) => {
        setIsLoading(true)
        await getDiveCenterDetail(id,login.data.id)
        await setIsLoading(false)
    }
    const getGenreDetailApi = async (id) => {
        setIsLoading(true)
        await getGenreDetails(id,login.data.id)
        await setIsLoading(false)
    }
    const getPeciosDetailApi = async (id) => {
        setIsLoading(true)
        await getPecioDetails(id,login.data.id)
        await setIsLoading(false)
    }
    const getPointsDetailApi = async (id) => {
        setIsLoading(true)
        await getPointsDetails(id,login.data.id)
        await setIsLoading(false)
    }
    const getDiveDetailApi = async (id) => {
        setIsLoading(true)
        await getDivesDetails(id,login.data.id)
        await setIsLoading(false)
    }
    const actions = [
        {
            text: "Pecios",
            name: "pecios",
            position: 2,
            color: '#207cfc',
        },
        {
            text: "Mis Inmersiones",
            name: "logbook",
            position: 1,
            color: "#58fc1c"
        },
        {
            text: "Centros de Buceo",
            name: "dive_center",
            position: 3,
            color: '#ff2c2c'
        },
        {
            text: "Puntos de inmersion",
            name: "new_screen",
            position: 4,
            color: '#30fcd4'
        },
        {
            text: "Género Fácil",
            name: "genre_easy",
            position: 5,
            color: '#d0fc34'
        },
        {
            text: "Género Medio",
            name: "genre_medium",
            position: 6,
            color: '#fff434'
        },
        {
            text: "Género Difícil",
            name: "genre_difficult",
            position: 7,
            color: '#ffa42c'
        },
        {
            text: "Mostrar todo",
            name: "show_all",
            position: 7,
            color: '#b82cfc'
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={StyleSheet.absoluteFillObject}
                    region={{
                        // latitude: parseFloat(this.state.lat),
                        // longitude: parseFloat(this.state.long),
                        latitude: 41.40338,
                        longitude: 2.17403,
                        // latitudeDelta: 0.0043,
                        // longitudeDelta: 0.0034
                        latitudeDelta: 30.1922,
                        longitudeDelta: 30.1421,
                    }}
                >
                    {!Response || !Response.dives.length ?
                        <View />
                        : Response.dives.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/14.png')}
                                    onPress={() => {
                                        getDiveDetailApi(item.diveId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/16.png')}
                                        style={{ height: 35, width: 35 }}
                                        resizeMode = {FastImage.resizeMode.stretch}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                    {!Response || !Response.centers.length ?
                        <View />
                        : Response.centers.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/16.png')}
                                    onPress={() => {
                                        getCenterDetailApi(item.centerId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/16.png')}
                                        style={{ height: 35, width: 35 }}
                                        resizeMode = {FastImage.resizeMode.stretch}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                    {!Response || !Response.pecios.length ?
                        <View />
                        : Response.pecios.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/15.png')}
                                    onPress={() => {
                                        getPeciosDetailApi(item.pecioId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/15.png')}
                                        style={{ height: 20, width: 20 }}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                    {!Response || !Response.genreEasy.length ?
                        <View />
                        : Response.genreEasy.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/156.png')}
                                    onPress={() => {
                                        getGenreDetailApi(item.genreId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/156.png')}
                                        style={{ height: 35, width: 35 }}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                    {!Response || !Response.genreDifficult.length ?
                        <View />
                        : Response.genreDifficult.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/158.png')}
                                    onPress={() => {
                                        getGenreDetailApi(item.genreId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/158.png')}
                                        style={{ height: 35, width: 35 }}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                    {!Response || !Response.genreMedium.length ?
                        <View />
                        : Response.genreMedium.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/157.png')}
                                    onPress={() => {
                                        getGenreDetailApi(item.genreId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/157.png')}
                                        style={{ height: 35, width: 35 }}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                    {!Response || !Response.points.length ?
                        <View />
                        : Response.points.map((item, index) => {
                            return (
                                <Marker
                                    key={"unique" + index}
                                    coordinate={{
                                        latitude: parseFloat(item.lat),
                                        longitude: parseFloat(item.lng),
                                    }}
                                    image={require('../../Images/155.png')}
                                    onPress={() => {
                                        getPointsDetailApi(item.pointId)
                                    }}
                                >
                                    {/* <FastImage
                                        source={require('../../Images/155.png')}
                                        style={{ height: 35, width: 35 }}
                                    /> */}
                                </Marker>
                            )
                        })
                    }
                </MapView>

                <View style={[styles.mapBottom, {
                    height: isOpen ? heightPercentageToDP(80) : heightPercentageToDP(11),
                }]}>
                    <FloatingAction
                        actions={actions}
                        onPressItem={name => {
                            if (name === "pecios") {
                                postPointApis(null, "yes", null, null, null, null, null)
                            } else if (name === "logbook") {
                                postPointApis(null, null, null, null, null, null, "yes")
                            } else if (name === "dive_center") {
                                postPointApis("yes", null, null, null, null, null, null)
                            } else if (name === "new_screen") {
                                postPointApis(null, null, null, null, null, "yes", null)
                            } else if (name === "genre_easy") {
                                postPointApis(null, null, "yes", null, null, null, null)
                            } else if (name === "genre_medium") {
                                postPointApis(null, null, null, "yes", null, null, null)
                            } else if (name === "genre_difficult") {
                                postPointApis(null, null, null, null, "yes", null, null)
                            } else if (name === "show_all") {
                                postPointApis("yes", "yes", "yes", "yes", "yes", "yes", "yes")
                            }
                        }}
                        overlayColor={'rgba(255, 255, 255, 0)'}
                        color={blue}
                        onClose={e => setIsOpen(false)}
                        onOpen={e => setIsOpen(true)}
                    />
                </View>
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
            </View>
        </SafeAreaView>
    )
}

export default Map;