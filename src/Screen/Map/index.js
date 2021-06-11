import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Tab from '../../Component/BottomTab'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'

const Map = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/map.png')}
                style={{ width: "100%", height: "100%" }}
                resizeMode={FastImage.resizeMode.stretch}
            >
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
            </FastImage>
        </SafeAreaView>
    )
}

export default Map;