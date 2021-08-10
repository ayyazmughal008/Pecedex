import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { black, blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'



const Card = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                {props.rank == 0 ?
                    <FastImage
                        source={require('../../Images/medal1.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(12),
                            height: heightPercentageToDP(6)
                        }}
                    />
                    : props.rank == 1 ?
                        <FastImage
                            source={require('../../Images/medal2.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(12),
                                height: heightPercentageToDP(6)
                            }}
                        />
                        : props.rank == 2 ?
                            <FastImage
                                source={require('../../Images/medal3.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(12),
                                    height: heightPercentageToDP(6)
                                }}
                            />
                            : props.rank == 3 ?
                                <FastImage
                                    source={require('../../Images/medal4.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{
                                        width: widthPercentageToDP(12),
                                        height: heightPercentageToDP(6)
                                    }}
                                />
                                : props.rank == 4 ?
                                    <FastImage
                                        source={require('../../Images/medal5.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{
                                            width: widthPercentageToDP(12),
                                            height: heightPercentageToDP(6)
                                        }}
                                    />
                                    : props.rank == 5 ?
                                        <FastImage
                                            source={require('../../Images/medal6.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{
                                                width: widthPercentageToDP(12),
                                                height: heightPercentageToDP(6)
                                            }}
                                        />
                                        : props.rank == 6 ?
                                            <FastImage
                                                source={require('../../Images/medal7.png')}
                                                resizeMode={FastImage.resizeMode.contain}
                                                style={{
                                                    width: widthPercentageToDP(12),
                                                    height: heightPercentageToDP(6)
                                                }}
                                            />
                                            : props.rank == 7 ?
                                                <FastImage
                                                    source={require('../../Images/medal8.png')}
                                                    resizeMode={FastImage.resizeMode.contain}
                                                    style={{
                                                        width: widthPercentageToDP(12),
                                                        height: heightPercentageToDP(6)
                                                    }}
                                                />
                                                : props.rank == 8 ?
                                                    <FastImage
                                                        source={require('../../Images/medal9.png')}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                        style={{
                                                            width: widthPercentageToDP(12),
                                                            height: heightPercentageToDP(6)
                                                        }}
                                                    />
                                                    : <FastImage
                                                        source={require('../../Images/medal2.png')}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                        style={{
                                                            width: widthPercentageToDP(12),
                                                            height: heightPercentageToDP(6)
                                                        }}
                                                    />
                }
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
        marginTop: heightPercentageToDP(1)
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
        left: "41%",
        top: "15%"
    }
})

export default Card;