import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { blue } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'

const Card = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <TouchableOpacity
                onPress={props.clickHandler}
            >
                <FastImage
                    style={styles.img}
                    source={props.animalImg}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(22),
        marginBottom: heightPercentageToDP(3)
    },
    title: {
        fontSize: widthPercentageToDP(4.5),
        color: blue,
        fontFamily: "Montserrat-SemiBold"
    },
    img: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(18),
        marginTop: heightPercentageToDP(2),
        borderRadius:widthPercentageToDP(5)
    }
})

export default Card;