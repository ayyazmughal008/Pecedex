import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue2, white, } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { data } from './data'

const LogBook = (props) => {
    const imageModel = (({ item, index }) => {
        return (
            <View style={styles.modelView}>
                <FastImage
                    source={item.img}
                    style={styles.imgModel}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.title}>
                    {item.title}
                </Text>
                {/* <Text style={styles.date}>
                    {item.date}
                </Text> */}
            </View>
        )
    })
    return (
        <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <KeyboardAwareScrollView>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"LOCATION"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
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
                                <Text style={[styles.smallTxt, { color: blue2 }]}>
                                    {"16-Marzo-2021"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Hora:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: blue2 }]}>
                                    {"13:12 horas"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Lugar de inmersion :"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: blue2 }]}>
                                    {"Baio de dentro"}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.right}>
                            <View>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Pais:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: blue2 }]}>
                                    {"Espana"}
                                </Text>
                            </View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {"Cludad:"}
                                </Text>
                                <Text style={[styles.smallTxt, { color: blue2 }]}>
                                    {"Murcia"}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={[styles.sideButton, { top: "10%" }]}>
                        <FastImage
                            source={require('../../Images/45.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.sideButton, { top: "40%" }]}>
                        <FastImage
                            source={require('../../Images/44.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </TouchableOpacity>

                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"ENVIRONMENT"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={[styles.logView, {
                    height: heightPercentageToDP(30),
                    marginTop: heightPercentageToDP(2),
                    //backgroundColor: blue2
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
                    <Text style={[styles.smallTxt, { color: black, alignSelf: "flex-start", marginLeft: 15, marginTop: 10 }]}>
                        {"Temperatura del agua : "}
                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                            {"24*C"}
                        </Text>
                    </Text>
                    <Text style={[styles.smallTxt, { color: black, alignSelf: "flex-start", marginLeft: 15, marginTop: 10 }]}>
                        {"Visibilidad : "}
                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                            {"5 metros"}
                        </Text>
                    </Text>
                    <Text style={[styles.smallTxt, { color: black, marginLeft: 15, marginTop: 10 }]}>
                        {"Agua dulce / "}
                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                            {"Agua salada"}
                        </Text>
                    </Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"IMMERSION"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
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
                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                            {"17 metros"}
                        </Text>
                    </Text>
                    <Text style={[styles.smallTxt, { color: black, marginLeft: 15, marginTop: 10 }]}>
                        {"Tipo de inmersion : "}
                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                            {"Naturalista"}
                        </Text>
                    </Text>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"DIVING CENTER"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={[styles.logView, {
                    height: heightPercentageToDP(43),
                    marginTop: heightPercentageToDP(2),
                    //backgroundColor: blue2
                }]}>
                    <View style={{ width: "100%", height: heightPercentageToDP(22), flexDirection: "row", alignItems: "center", marginTop: heightPercentageToDP(2), justifyContent: "space-between" }}>
                        <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                            <TouchableOpacity
                                style={{ width: "100%", height: "65%", }}
                            >
                                <FastImage
                                    source={require('../../Images/79.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                {"Traje"}
                            </Text>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                {"humedo"}
                            </Text>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                {"7 mm"}
                            </Text>
                        </View>
                        <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                            <TouchableOpacity
                                style={{ width: "100%", height: "65%", }}
                            >
                                <FastImage
                                    source={require('../../Images/76.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                {"Traje"}
                            </Text>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                {"humedo"}
                            </Text>
                        </View>
                        <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                            <TouchableOpacity
                                style={{ width: "100%", height: "65%", }}
                            >
                                <FastImage
                                    source={require('../../Images/74.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                {"Traje"}
                            </Text>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                {"humedo"}
                            </Text>
                        </View>
                        <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                            <TouchableOpacity
                                style={{ width: "100%", height: "65%", }}
                            >
                                <FastImage
                                    source={require('../../Images/72.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                {"Traje"}
                            </Text>
                            <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                {"humedo"}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.innerLogView, { height: heightPercentageToDP(10) }]}>
                        <View style={styles.left}>
                            <Text style={[styles.tinyText2, { color: black }]}>
                                {"Rebreader/ "}
                                <Text style={[styles.tinyText2, { color: blue2 }]}>
                                    {"scuba"}
                                </Text>
                            </Text>
                            <Text style={[styles.tinyText2, { color: black }]}>
                                {"Mezclable Aire/ "}
                                <Text style={[styles.tinyText2, { color: blue2 }]}>
                                    {"Nitrox"}
                                </Text>
                            </Text>
                            <Text style={[styles.tinyText2, { color: black, marginTop: 10 }]}>
                                {"Lastre: "}
                                <Text style={[styles.tinyText2, { color: blue2 }]}>
                                    {"4 Kg"}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.right}>
                            <Text style={[styles.tinyText2, { color: black }]}>
                                {"Jacket/"}
                                <Text style={[styles.tinyText2, { color: blue2 }]}>
                                    {"Ala 24%"}
                                </Text>
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.innerLogView, { height: heightPercentageToDP(8), marginTop: 10, justifyContent: "space-between", width: widthPercentageToDP(90) }]}>
                        <TouchableOpacity style={{ width: "11%", height: "70%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/62.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "11%", height: "70%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/59.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "11%", height: "70%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/70.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "11%", height: "70%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/69.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "11%", height: "70%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/66.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "11%", height: "70%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/60.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: "13%", height: "60%" }}>
                            <FastImage
                                style={{ width: "100%", height: "100%" }}
                                source={require('../../Images/64.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"HEADING"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <FlatList
                    data={data.heading}
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    listKey={(item, index) => `_key${index.toString()}`}
                    //style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={imageModel}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"ANIMAL"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <FlatList
                    data={data.animal}
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    listKey={(item, index) => `_key${index.toString()}`}
                    //style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={imageModel}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"TEAM"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <FlatList
                    data={data.team}
                    showsVerticalScrollIndicator={false}
                    numColumns={4}
                    listKey={(item, index) => `_key${index.toString()}`}
                    //style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={imageModel}
                />
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"CLASSMATES"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <View style={styles.writeView}>
                    <View style={styles.modelView}>
                        <FastImage
                            source={require('../../Images/fish2.jpg')}
                            style={styles.imgModel}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text style={styles.title}>
                            {"Madrid Buceo"}
                        </Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Sello"
                        placeholderTextColor={black}
                        textAlign="center"
                    />
                </View>
                <View style={styles.titleView}>
                    <Text style={styles.titleTxt}>
                        {"HEADING"}
                    </Text>
                    <FastImage
                        source={require('../../Images/line_right.png')}
                        style={styles.line}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                </View>
                <TextInput
                    style={styles.input2}
                    placeholder="Observaciones"
                    placeholderTextColor={black}
                    textAlign="center"
                />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => { }}
                >
                    <Text style={styles.btnText}>
                        {"GUARDAR"}
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default LogBook;