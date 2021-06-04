import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue2, white } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LogBook = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <KeyboardAwareScrollView>
                <View style={[styles.logView, {
                    height: heightPercentageToDP(25),
                    marginTop: heightPercentageToDP(2),
                    justifyContent: "center",
                }]}>
                    <View style={[styles.innerLogView, { height: heightPercentageToDP(20) }]}>
                        <View style={styles.left}>
                            <View>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Fecha:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: white }]}>
                                    {"16-Marzo-2021"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Hora:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: white }]}>
                                    {"13:12 horas"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Lugar de inmersion :"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: white }]}>
                                    {"Baio de dentro"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <View>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Pais:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: white }]}>
                                    {"Espana"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Cludad:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: white }]}>
                                    {"Murcia"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.logView, {
                    height: heightPercentageToDP(30),
                    marginTop: heightPercentageToDP(2),
                    backgroundColor: blue2
                }]}>
                    <View style={{ marginTop: heightPercentageToDP(2), flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/55.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/48.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/54.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/53.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: heightPercentageToDP(1), flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/52.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/50.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/49.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.weatherBtn}>
                            <FastImage
                                source={require('../../Images/51.png')}
                                resizeMode={FastImage.resizeMode.cover}
                                style={{ width: "90%", height: "90%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.smallTxt, { color: black, alignSelf: "flex-start", marginLeft: 15 }]}>
                        {"Temperatura del agua : "}
                        <Text style={[styles.smallTxt, { color: white }]}>
                            {"24*C"}
                        </Text>
                    </Text>
                    <Text style={[styles.smallTxt, { color: black, alignSelf: "flex-start", marginLeft: 15, marginTop: 10 }]}>
                        {"Visibilidad : "}
                        <Text style={[styles.smallTxt, { color: white }]}>
                            {"5 metros"}
                        </Text>
                    </Text>
                    <Text style={[styles.smallTxt, { color: black, marginLeft: 15, marginTop: 10 }]}>
                        {"Agua dulce / "}
                        <Text style={[styles.smallTxt, { color: white }]}>
                            {"Agua salada"}
                        </Text>
                    </Text>
                </View>
                <View style={[styles.logView, {
                    height: heightPercentageToDP(25),
                    marginTop: heightPercentageToDP(2),
                }]}>
                    <View style={[styles.innerLogView, { height: heightPercentageToDP(15), marginTop: heightPercentageToDP(2), justifyContent: "space-between" }]}>
                        <View style={[styles.left, { width: "48%", backgroundColor: blue2, borderRadius: widthPercentageToDP(6), flexDirection: "row", alignItems: "center" }]}>
                            <FastImage
                                source={require('../../Images/56.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{ width: "42%", height: "59%", marginLeft: 8 }}
                            />
                            <View style={{ width: "50%", height: "70%", marginLeft: 5 }}>
                                <Text style={[styles.tinyText, { color: black }]}>
                                    {"Bares inciales:"}
                                </Text>
                                <Text style={[styles.tinyText, { color: white }]}>
                                    {"200"}
                                </Text>
                                <Text style={[styles.tinyText, { color: black }]}>
                                    {"Bares finales:"}
                                </Text>
                                <Text style={[styles.tinyText, { color: white }]}>
                                    {"70"}
                                </Text>
                                <Text style={[styles.tinyText, { color: black }]}>
                                    {"Consumidos:"}
                                </Text>
                                <Text style={[styles.tinyText, { color: white }]}>
                                    {"130"}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.right, { width: "48%", backgroundColor: blue2, borderRadius: widthPercentageToDP(6), flexDirection: "row", alignItems: "center" }]}>
                            <FastImage
                                source={require('../../Images/57.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{ width: "42%", height: "60%", marginLeft: 8 }}
                            />
                            <View style={{ width: "50%", height: "70%", marginLeft: 5 }}>
                                <Text style={[styles.tinyText, { color: black }]}>
                                    {"Hora inicio:"}
                                </Text>
                                <Text style={[styles.tinyText, { color: white }]}>
                                    {"13:12 h"}
                                </Text>
                                <Text style={[styles.tinyText, { color: black }]}>
                                    {"Hora fin:"}
                                </Text>
                                <Text style={[styles.tinyText, { color: white }]}>
                                    {"14:23 h"}
                                </Text>
                                <Text style={[styles.tinyText, { color: black }]}>
                                    {"Tiempo de fondo:"}
                                </Text>
                                <Text style={[styles.tinyText, { color: white }]}>
                                    {"01:11"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.smallTxt, { color: black, marginLeft: 15, marginTop: 10 }]}>
                        {"Profundidad Maxima : "}
                        <Text style={[styles.smallTxt, { color: white }]}>
                            {"17 metros"}
                        </Text>
                    </Text>
                    <Text style={[styles.smallTxt, { color: black, marginLeft: 15, marginTop: 10 }]}>
                        {"Tipo de inmersion : "}
                        <Text style={[styles.smallTxt, { color: white }]}>
                            {"Naturalista"}
                        </Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default LogBook;