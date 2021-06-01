import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'

const Card = (props) => {
    return (
        <View style={styles.container}>
            <FastImage
                style={styles.img}
                source={props.animalImg}
                resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.right}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Text style={styles.shortTitle}>
                    {props.shortText}
                </Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(15),
        marginBottom: heightPercentageToDP(3),
        borderRadius: widthPercentageToDP(5),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: blue
    },
    title: {
        fontSize: widthPercentageToDP(4.5),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        marginTop: heightPercentageToDP(1)
    },
    shortTitle: {
        fontSize: widthPercentageToDP(4),
        color: white,
        fontFamily: "Montserrat-Regular",
        marginTop: heightPercentageToDP(1)
    },
    img: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(15),
        borderTopLeftRadius: widthPercentageToDP(5),
        borderBottomLeftRadius: widthPercentageToDP(5)
    },
    right: {
        width: "100%",
        height: "100%",
        marginLeft: widthPercentageToDP(2.5)
    }
})

export default Card;