import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Tab from '../../Component/BottomTab'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Strings from '../../Translation'
import { getDiveCenters, getDiveCenterDetail, getGenreDetails, getPecioDetails } from '../../Redux/action'
import { useSelector, useDispatch } from 'react-redux';
import { black } from '../../config/color'

const Map = (props) => {
    const language = useSelector((state) => state.user.language);
    const [isLoading, setIsLoading] = useState(false)
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
    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getDiveCenters()
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const getCenterDetailApi = async (id) => {
        setIsLoading(true)
        await getDiveCenterDetail(id)
        await setIsLoading(false)
    }
    const getGenreDetailApi = async (id) => {
        setIsLoading(true)
        await getGenreDetails(id)
        await setIsLoading(false)
    }
    const getPeciosDetailApi = async (id) => {
        setIsLoading(true)
        await getPecioDetails(id)
        await setIsLoading(false)
    }
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
                                />
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
                                />
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
                                    //image={require('../../Images/15.png')}
                                    onPress={() => {
                                        getGenreDetailApi(item.genreId)
                                    }}
                                />
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
                                    //image={require('../../Images/15.png')}
                                    onPress={() => {
                                        getCenterDetailApi(item.genreId)
                                    }}
                                />
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
                                    //image={require('../../Images/15.png')}
                                    onPress={() => {
                                        getCenterDetailApi(item.genreId)
                                    }}
                                />
                            )
                        })
                    }
                </MapView>

                <View style={styles.mapBottom}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <TouchableOpacity style={{ width: "50%", alignItems: "center", flexDirection: "row" }}>
                            <View style={[styles.circle, { backgroundColor: "blue" }]} />
                            <Text style={[styles.btnText, { marginLeft: 10 }]}>{"Pecios"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "50%", alignItems: "center", flexDirection: "row" }}>
                            <View style={[styles.circle, { backgroundColor: "#00FF00" }]} />
                            <Text style={[styles.btnText, { marginLeft: 10 }]}>{"Mis Inmersiones"}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{ width: "50%", alignItems: "center", flexDirection: "row", marginTop: 10 }}
                    //onPress={() => props.navigation.navigate('DiveCenter')}
                    >
                        <View style={[styles.circle, { backgroundColor: "red" }]} />
                        <Text style={[styles.btnText, { marginLeft: 10 }]}>{"Centros de Buceo"}</Text>
                    </TouchableOpacity>
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