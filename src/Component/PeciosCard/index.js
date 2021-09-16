import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'

const Card = (props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={props.clickHandler}
        >
            <FastImage
                style={styles.img}
                source={{ uri: props.animalImg }}
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
            {(props.seen && props.seen === "yes") &&
                <FastImage
                    source={require('../../Images/85.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        width: widthPercentageToDP(8),
                        height: heightPercentageToDP(4),
                        position: "absolute",
                        bottom: "5%",
                        right: "5%"
                    }}
                />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        //height: heightPercentageToDP(13),
        flex: 0,
        marginBottom: heightPercentageToDP(3),
        borderRadius: Platform.OS === 'android' ? widthPercentageToDP(7):widthPercentageToDP(5),
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: blue
    },
    title: {
        width: widthPercentageToDP(55),
        fontSize: widthPercentageToDP(4.5),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        marginTop: heightPercentageToDP(1),
        //backgroundColor:"red",
        // flex:2,
        flexWrap: 'wrap',
        // flexShrink: 1,
        //flexGrow: 1,
        // paddingRight:widthPercentageToDP(5)
    },
    shortTitle: {
        width: widthPercentageToDP(55),
        fontSize: widthPercentageToDP(4),
        color: white,
        fontFamily: "Montserrat-Regular",
        marginTop: heightPercentageToDP(1),
        flexWrap: 'wrap',
    },
    img: {
        width: widthPercentageToDP(30),
        height: Platform.OS === 'android' ? heightPercentageToDP(13):heightPercentageToDP(15),
        borderTopLeftRadius: Platform.OS === 'android' ? widthPercentageToDP(7):widthPercentageToDP(5),
        borderBottomLeftRadius: Platform.OS === 'android' ? widthPercentageToDP(7):widthPercentageToDP(5),
    },
    right: {
        width: "100%",
        height: "100%",
        marginLeft: widthPercentageToDP(2.5)
    }
})

export default Card;