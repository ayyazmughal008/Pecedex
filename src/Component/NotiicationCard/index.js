import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/AntDesign'


const Card = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Text style={styles.title}>
                    {props.title}
                </Text>
                <Icon
                    name="delete"
                    color={white}
                    size={25}
                />
            </View>
            <FastImage
                style={styles.line}
                source={require('../../Images/line.png')}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{ width: widthPercentageToDP(80), alignItems: "center" }}>
                <Text style= {styles.description}>
                    {props.description}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        alignItems: "center",
        marginBottom: heightPercentageToDP(3),
        borderRadius: widthPercentageToDP(4),
        backgroundColor: blue
    },
    topView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(5),
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
        //backgroundColor:"red"
    },
    line: {
        width: widthPercentageToDP(65),
        height: heightPercentageToDP(0.1),
        //backgroundColor:"red"
    },
    title: {
        fontSize: widthPercentageToDP(5),
        color: white,
        fontFamily: "Montserrat-Regular"
    },
    description: {
        fontSize: widthPercentageToDP(3.5),
        color: white,
        fontFamily: "Montserrat-Regular",
        textAlign:"justify",
        marginBottom:5
    }
})

export default Card;