import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
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
                    source={{ uri: props.animalImg }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        // height: Platform.OS === 'android' ? heightPercentageToDP(22) : heightPercentageToDP(24),
        flex:0,
        marginBottom: heightPercentageToDP(1),
        //backgroundColor:"red"
    },
    title: {
        fontSize: widthPercentageToDP(4.5),
        color: blue,
        fontFamily: "Montserrat-SemiBold"
    },
    img: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(16),
        marginTop: heightPercentageToDP(1),
        borderRadius: widthPercentageToDP(5)
    }
})

export default Card;