import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Zocial'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'

const DiveCenter = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={require('../../Images/sink2.jpg')}
                    style={[styles.top, { height: heightPercentageToDP(30) }]}
                    resizeMode={FastImage.resizeMode.cover}
                />

                <Text style={[styles.profileName, { alignSelf: "center", color: blue }]}>
                    {"Madrid  Buceo"}
                </Text>
                <View style={styles.infoBox}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <Icon
                            name="gmail"
                            color={blue}
                            size={30}
                        />
                        <Text style={styles.infoTxt}>
                            {"informacionxmadribduceo.crg"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 5 }}>
                        <Icon2
                            name="phone"
                            color={blue}
                            size={35}
                        />
                        <Text style={styles.infoTxt}>
                            {"03018440137"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%", marginTop: 5 }}>
                        <Icon2
                            name="map-marker"
                            color={blue}
                            size={40}
                            style={{ marginRight: 4 }}
                        />
                        <Text style={styles.infoTxt}>
                            {"C/Pruodo, 12. 28003 Madrid"}
                        </Text>
                    </View>
                </View>
                <View style={styles.socialView}>
                    <TouchableOpacity>
                        <FastImage
                            source={require('../../Images/129.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage
                            source={require('../../Images/130.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage
                            source={require('../../Images/131.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage
                            source={require('../../Images/132.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <FastImage
                            source={require('../../Images/133.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(11),
                                height: heightPercentageToDP(5.5),
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <TouchableOpacity
                    style={styles.commentView}
                    onPress={() => { props.navigation.navigate('DiveCenterDetail') }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", width: "100%" }}>
                        <View style={styles.squre}>
                            <FastImage
                                source={require('../../Images/134.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={styles.squre}
                            />
                        </View>
                        <View style={styles.starView}>
                            <View style={{ flexDirection: "row", alignItems: "center", height: "45%", width: "100%", }}>
                                <FastImage
                                    source={require('../../Images/star.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.star}
                                />
                                <FastImage
                                    source={require('../../Images/star.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.star}
                                />
                                <FastImage
                                    source={require('../../Images/star.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.star}
                                />
                                <FastImage
                                    source={require('../../Images/star.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.star}
                                />
                                <FastImage
                                    source={require('../../Images/star.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={styles.star}
                                />
                            </View>
                            <Text style={styles.commentTxt}>
                                {"312 Comentarios"}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={styles.line}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5) }]}>
                    {"ACTIVIDADES"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Bautizo on Piscina"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Bautizo on mar"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Refresh"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Snorkel"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Inmersiones Guiadas"}
                </Text>
                {/* new liness  */}
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5) }]}>
                    {"CURSOS DE BUCEO"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"PADI Open Water Diver"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"PADI Advance Open Water Diver"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"PADI Rescuo"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"PADI Divemaster"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"EFR (Energyency First Response)"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"PADI Nitrox"}
                </Text>
                {/* new liness  */}
                <Text style={[styles.profileName, { alignSelf: "flex-start", color: blue, marginLeft: widthPercentageToDP(5) }]}>
                    {"OTROS SERVICIOS"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Alquitor do Equipos"}
                </Text>
                <Text style={[styles.commentTxt, { marginLeft: widthPercentageToDP(8), marginTop: 0 }]}>
                    {"Lienado de botellas"}
                </Text>
                <View style={{ marginTop: 10 }} />
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

export default DiveCenter;