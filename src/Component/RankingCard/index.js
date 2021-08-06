import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { black, blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'



const Card = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <FastImage
                    source={require('../../Images/award.png')}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        width: widthPercentageToDP(12),
                        height: heightPercentageToDP(6)
                    }}
                >
                    <Text style={styles.smallText}>
                        {props.rank}
                    </Text>
                </FastImage>
                <View style={{ width: "100%", marginLeft: widthPercentageToDP(2) }}>
                    <Text style={styles.title}>
                        {props.title}
                    </Text>
                    <Text style={styles.score}>
                        {props.score}
                    </Text>
                </View>

            </View>
            <FastImage
                style={styles.line}
                source={require('../../Images/line.png')}
                resizeMode={FastImage.resizeMode.contain}
            />
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
        //backgroundColor: blue
    },
    topView: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        //backgroundColor:"red"
    },
    line: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(0.2),
        marginTop:heightPercentageToDP(1)
        //backgroundColor:"red"
    },
    title: {
        fontSize: widthPercentageToDP(5),
        color: blue,
        fontFamily: "Montserrat-SemiBold"
    },
    score: {
        fontSize: widthPercentageToDP(5),
        color: black,
        fontFamily: "Montserrat-Regular"
    },
    smallText: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        position: "absolute",
        left:"41%",
        top: "15%"
    }
})

export default Card;