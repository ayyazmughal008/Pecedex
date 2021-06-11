import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { black, blue } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'

const Profile = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={require('../../Images/top.png')}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <FastImage
                    style={styles.profileImg}
                    source={require('../../Images/profile_img5.png')}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.profileView}>
                    <Text style={styles.profileName}>
                        {"Sandra Gomez"}
                    </Text>
                    <Text style={styles.btnText}>
                        {"PADI advance Open Water Diver"}
                    </Text>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/seaCap.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text
                            style={styles.proInfoTile}
                            onPress={() => props.navigation.navigate('Dive')}
                        >
                            {"526 Inmersiones"}
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/fish.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                            onPress={() => props.navigation.navigate('AnimalSeen')} >
                            {"327 / 10.728 animal vistos"}
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/ship.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                            onPress={() => props.navigation.navigate('Pecios')}>
                            {"32 / 726 pecios vistos"}
                        </Text>
                    </View>
                </View>
                <Text style={[styles.profileName, { color: black, fontSize: widthPercentageToDP(4.5), alignSelf: "center" }]}>
                    {"PUNTUACION"}
                </Text>
                <Text
                    style={[styles.profileName, { color: blue, fontSize: widthPercentageToDP(6.5), alignSelf: "center" }]}
                    onPress={() => props.navigation.navigate('Ranking')}
                >
                    {"000001536"}
                </Text>
                <Text style={[styles.profileName, {
                    color: blue,
                    marginLeft: widthPercentageToDP(10)
                }]}>
                    {"PHOTOS"}
                </Text>
                <FlatList
                    data={[{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 },]}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 10 }}
                    numColumns={3}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: widthPercentageToDP(26),
                                    height: heightPercentageToDP(13),
                                    margin: 5,
                                }}
                                onPress={() => props.navigation.navigate('Detail')}
                            >
                                <FastImage
                                    source={require('../../Images/carocodile.jpg')}
                                    style={{
                                        width: widthPercentageToDP(26),
                                        height: heightPercentageToDP(13),
                                        //margin: 5,
                                        borderRadius: widthPercentageToDP(4)
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </KeyboardAwareScrollView>
            <View style={{ height: heightPercentageToDP(7) }} />
            <Tab
                homeClick={() => props.navigation.dispatch(HomeAction)}
                profileClick={() => props.navigation.dispatch(profileAction)}
                settingClick={() => props.navigation.dispatch(settingAction)}
                mapClick={() => props.navigation.dispatch(mapAction)}
                notiClick={() => props.navigation.dispatch(notificationAction)}
            />
        </SafeAreaView>
    )
}

export default Profile;