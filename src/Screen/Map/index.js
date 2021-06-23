import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Tab from '../../Component/BottomTab'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'

const Map = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={StyleSheet.absoluteFillObject}
                    region={{
                        // latitude: parseFloat(this.state.lat),
                        // longitude: parseFloat(this.state.long),
                        latitude: 40.416775,
                        longitude: -3.703790,
                        // latitudeDelta: 0.0043,
                        // longitudeDelta: 0.0034
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />

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
                        onPress={() => props.navigation.navigate('DiveCenter')}
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
            </View>
        </SafeAreaView>
    )
}

export default Map;