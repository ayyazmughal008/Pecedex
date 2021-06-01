import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { blue } from '../../config/color'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'

const Profile = (props) => {
    return (
        <SafeAreaView style={styles.container}>
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
                    <Text style={styles.proInfoTile}>
                        {"526 Inmersiones"}
                    </Text>
                </View>
                <View style={styles.profileInfo}>
                    <FastImage
                        source={require('../../Images/fish.png')}
                        style={{ width: 35, height: 35 }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.proInfoTile}>
                        {"327 / 10.728 animal vistos"}
                    </Text>
                </View>
                <View style={styles.profileInfo}>
                    <FastImage
                        source={require('../../Images/ship.png')}
                        style={{ width: 35, height: 35 }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={styles.proInfoTile}>
                        {"32 / 726 pecios vistos"}
                    </Text>
                </View>
            </View>
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
                        <FastImage
                            source={require('../../Images/35.png')}
                            style={{
                                width: widthPercentageToDP(25),
                                height: widthPercentageToDP(25),
                                margin: 5
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Profile;