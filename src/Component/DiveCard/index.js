import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native'
import { blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'

const Card = (props) => {

    const imageModel = (({ item, index }) => {
        return (
            <View style={styles.modelView}>
                {item.image ?
                    <FastImage
                        source={{ uri: item.image }}
                        style={styles.imgModel}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    : <FastImage
                        source={require('../../Images/108.png')}
                        style={styles.imgModel}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
                <Text style={styles.title}>
                    {"Pecedex"}
                </Text>
                <Text style={styles.date}>
                    {item.date}
                </Text>
            </View>
        )
    })

    return (
        <View style={styles.container}>
            <View style={styles.yearView}>
                <FastImage
                    source={require('../../Images/line_left.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
                <Text style={styles.yearText}>
                    {props.year}
                </Text>
                <FastImage
                    source={require('../../Images/line_right.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
            </View>
            {!props.months || !props.months.length ?
                <View />
                : props.months.map((item, index) => {
                    return (
                        <View
                            key={"unique" + index}
                            style={{
                                width: widthPercentageToDP(90),
                                flex: 1,
                                marginTop: heightPercentageToDP(1)
                            }}>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.mothText}>
                                    {item.month}
                                </Text>
                                <FastImage
                                    source={require('../../Images/line_right.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={styles.lineRight}
                                />
                            </View>
                            <FlatList
                                data={item.imageModel}
                                showsVerticalScrollIndicator={false}
                                //style={{ alignSelf: "center" }}
                                listKey={(item, index) => `_key${index.toString() + "1"}`}
                                numColumns={3}
                                keyExtractor={(item, index) => "unique" + index}
                                renderItem={imageModel}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        marginBottom: heightPercentageToDP(1),
        alignItems: "center"
    },
    yearView: {
        width: widthPercentageToDP(90),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    line: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(0.3)
    },
    lineRight: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(0.1)
    },
    modelView: {
        width: widthPercentageToDP(28),
        height: heightPercentageToDP(20),
        borderRadius: widthPercentageToDP(4),
        alignItems: "center",
        backgroundColor: blue,
        margin: widthPercentageToDP(1)
    },
    imgModel: {
        width: widthPercentageToDP(28),
        height: heightPercentageToDP(13),
        borderRadius: widthPercentageToDP(4),
    },
    title: {
        fontSize: widthPercentageToDP(3),
        color: white,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        marginTop: heightPercentageToDP(0.5)
    },
    date: {
        fontSize: widthPercentageToDP(3),
        color: white,
        fontFamily: "Montserrat-Regular",
        marginTop: heightPercentageToDP(0.5)
    },
    yearText: {
        fontSize: widthPercentageToDP(6),
        color: blue,
        fontFamily: "Montserrat-SemiBold",
    },
    mothText: {
        fontSize: widthPercentageToDP(4),
        color: blue,
        fontFamily: "Montserrat-SemiBold",
    }

})

export default Card;