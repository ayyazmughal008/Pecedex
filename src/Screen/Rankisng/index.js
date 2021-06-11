import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { black, blue, white } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { data } from './data'
import Card from '../../Component/RankingCard'
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
                    <Text style={[styles.profileName, { color: black, fontSize: widthPercentageToDP(5), alignSelf: "center" }]}>
                        {"PUNTUACION"}
                    </Text>
                    <Text style={[styles.profileName, { color: white, fontSize: widthPercentageToDP(5), alignSelf: "center" }]}>
                        {"000001536"}
                    </Text>
                    <View style={[styles.profileInfo, { width: widthPercentageToDP(50) }]}>
                        <FastImage
                            source={require('../../Images/seaCap.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text
                            style={styles.proInfoTile}
                        //onPress={() => props.navigation.navigate('Dive')}
                        >
                            {"00000324"}
                        </Text>
                    </View>
                    <View style={[styles.profileInfo, { width: widthPercentageToDP(50) }]}>
                        <FastImage
                            source={require('../../Images/fish.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                        //onPress={() => props.navigation.navigate('AnimalSeen')} 
                        >
                            {"00000024"}
                        </Text>
                    </View>
                    <View style={[styles.profileInfo, { width: widthPercentageToDP(50) }]}>
                        <FastImage
                            source={require('../../Images/ship.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                        //onPress={() => props.navigation.navigate('Pecios')}
                        >
                            {"00000724"}
                        </Text>
                    </View>
                </View>

                {/* <FastImage
                    source={require('../../Images/line.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={{
                        width: widthPercentageToDP(70),
                        height: heightPercentageToDP(0.2),
                        marginTop: heightPercentageToDP(2),
                        alignSelf: "center"
                    }}
                /> */}

                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 10 }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                rank={item.rank}
                                title={item.title}
                                score={item.score}
                            />
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