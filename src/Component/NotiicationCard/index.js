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
            </View>
            <FastImage
                style={styles.line}
                source={require('../../Images/line.png')}
                resizeMode={FastImage.resizeMode.contain}
            />
            <View style={{ width: widthPercentageToDP(80), alignItems: "center", alignSelf: "center" }}>
                <Text style={styles.description}>
                    {props.description}
                </Text>
            </View>
            <Text style={styles.dateTxt}>
                {props.date}
            </Text>
            <Icon
                name="delete"
                color={white}
                size={25}
                onPress={props.deleteNotifications}
                style={{
                    position: "absolute",
                    top: "4%",
                    right: "2%",
                    zIndex: 3
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        //alignItems: "center",
        marginBottom: heightPercentageToDP(3),
        borderRadius: widthPercentageToDP(4),
        backgroundColor: blue
    },
    topView: {
        width: widthPercentageToDP(75),
        flex: 0,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        //backgroundColor:"red"
    },
    line: {
        width: widthPercentageToDP(65),
        height: heightPercentageToDP(0.2),
        alignSelf: "center",
        marginTop: heightPercentageToDP(0.5)
        //backgroundColor:"red"
    },
    title: {
        fontSize: widthPercentageToDP(5),
        color: white,
        fontFamily: "Montserrat-Regular",
        paddingTop: heightPercentageToDP(1)
    },
    description: {
        fontSize: widthPercentageToDP(3.5),
        color: white,
        fontFamily: "Montserrat-Regular",
        textAlign: "justify",
        marginBottom: 5
    },
    dateTxt: {
        fontSize: widthPercentageToDP(3),
        color: white,
        fontFamily: "Montserrat-Regular",
        // position: "absolute",
        // bottom: "1%",
        // right: "3%",
        textAlign: "right",
        padding: widthPercentageToDP(1),
        marginRight: widthPercentageToDP(1)

    }
})

export default Card;