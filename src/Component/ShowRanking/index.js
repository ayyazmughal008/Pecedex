import React from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { black, blue } from '../../config/color'

const SurveyItems = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.profileName}>
                {props.name}
            </Text>
            <View style={styles.startView}>
                <View>
                    <FastImage
                        source={
                            props.value == 1 ?
                                require('../../Images/star.png')
                                : props.value == 2 ?
                                    require('../../Images/star.png')
                                    : props.value == 3 ?
                                        require('../../Images/star.png')
                                        : props.value == 4 ?
                                            require('../../Images/star.png')
                                            : props.value == 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </View>
                <View>
                    <FastImage
                        source={
                            props.value == 1 ?
                                require('../../Images/silver_star.png')
                                : props.value == 2 ?
                                    require('../../Images/star.png')
                                    : props.value == 3 ?
                                        require('../../Images/star.png')
                                        : props.value == 4 ?
                                            require('../../Images/star.png')
                                            : props.value == 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </View>
                <View>
                    <FastImage
                        source={
                            props.value == 1 ?
                                require('../../Images/silver_star.png')
                                : props.value == 2 ?
                                    require('../../Images/silver_star.png')
                                    : props.value == 3 ?
                                        require('../../Images/star.png')
                                        : props.value == 4 ?
                                            require('../../Images/star.png')
                                            : props.value == 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </View>
                <View>
                    <FastImage
                        source={
                            props.value == 1 ?
                                require('../../Images/silver_star.png')
                                : props.value == 2 ?
                                    require('../../Images/silver_star.png')
                                    : props.value == 3 ?
                                        require('../../Images/silver_star.png')
                                        : props.value == 4 ?
                                            require('../../Images/star.png')
                                            : props.value == 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </View>
                <View>
                    <FastImage
                        source={
                            props.value == 1 ?
                                require('../../Images/silver_star.png')
                                : props.value == 2 ?
                                    require('../../Images/silver_star.png')
                                    : props.value == 3 ?
                                        require('../../Images/silver_star.png')
                                        : props.value == 4 ?
                                            require('../../Images/silver_star.png')
                                            : props.value == 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </View>
            </View>
            <Text style={styles.input}>
                {props.comment}
            </Text>
            <FastImage
                source={require('../../Images/line.png')}
                style={styles.line}
                resizeMode={FastImage.resizeMode.stretch}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        width: widthPercentageToDP(100),
        alignItems: 'center',
        marginTop: widthPercentageToDP(2)
    },
    input: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        margin: 5,
        alignSelf: "center",
    },
    startView: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: widthPercentageToDP(50),
        marginTop: widthPercentageToDP(2),
        marginBottom: widthPercentageToDP(2),
        justifyContent: "space-between"
    },
    img: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
    },
    profileName: {
        fontSize: widthPercentageToDP(6),
        fontFamily: "Montserrat-SemiBold",
        margin: 5,
        alignSelf: "center",
        color: blue
    },
    line: {
        width: widthPercentageToDP(75),
        height: heightPercentageToDP(0.3),
        alignSelf: "center",
        marginTop: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
    },
})

export default SurveyItems;
