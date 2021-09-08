import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import { black, blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'

const Card = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.centerView}>
                <View style={styles.firstRow}>
                    <View style={styles.left}>
                        <FastImage
                            source={props.weatherImage}
                            resizeMode={FastImage.resizeMode.contain}
                            style={styles.img}
                        />
                        <Text style={styles.monthTxt}>
                            {props.month}
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.monthTxt, { color: black }]}>
                            {"Temperatura del agua: "} {'\n'}
                            <Text style={styles.monthTxt}>
                                {props.aguaTemp}
                            </Text>
                        </Text>
                        <Text style={[styles.monthTxt, { color: black }]}>
                            {"Temperatura del aire: "}{'\n'}
                            <Text style={styles.monthTxt}>
                                {props.aireTemp}
                            </Text>
                        </Text>
                        <Text style={[styles.monthTxt, { color: black }]}>
                            {"Corrientes: "}
                            <Text style={styles.monthTxt}>
                                {props.orrientes}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={[styles.bottomRow, {}]}>
                    <ScrollView
                        horizontal
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsHorizontalScrollIndicator={false}
                    >
                        {!props.animalArray || !props.animalArray.length ?
                            < View />
                            : props.animalArray.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={"unique" + index}
                                        onPress={() => props.genreId(item.id)}
                                    >
                                        <FastImage
                                            source={{ uri: item.image }}
                                            resizeMode={FastImage.resizeMode.cover}
                                            style={styles.roundImg}
                                        />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(25),
        marginBottom: heightPercentageToDP(2),
        marginTop: heightPercentageToDP(2),
        borderWidth: widthPercentageToDP(0.8),
        borderColor: blue,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    centerView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(23)
    },
    firstRow: {
        width: "100%",
        height: heightPercentageToDP(11.5),
        flexDirection: "row",
        alignItems: "center"
    },
    left: {
        width: "35%",
        height: "100%",
        alignItems: "center",
        //backgroundColor:"red"
    },
    img: {
        width: "100%",
        height: "80%"
    },
    right: {
        width: "65%",
        height: "100%",
        //alignItems: "center"
        justifyContent: "center"
    },
    monthTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-SemiBold",
        color: blue
    },
    roundImg: {
        width: widthPercentageToDP(18),
        height: widthPercentageToDP(18),
        borderRadius: widthPercentageToDP(18) / 2,
        marginLeft: widthPercentageToDP(5)
    },
    bottomRow: {
        width: "100%",
        height: heightPercentageToDP(11.5),
        flexDirection: "row",
        alignItems: "center",
        //justifyContent:"center",
        //backgroundColor:"red"
    },

})

export default Card;