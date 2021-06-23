import React from 'react'
import { View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'

const SurveyItems = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.startView}>
                <TouchableOpacity
                    onPress={props.clickHandler1}
                >
                    <FastImage
                        source={
                            props.value === 1 ?
                                require('../../Images/star.png')
                                : props.value === 2 ?
                                    require('../../Images/star.png')
                                    : props.value === 3 ?
                                        require('../../Images/star.png')
                                        : props.value === 4 ?
                                            require('../../Images/star.png')
                                            : props.value === 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.clickHandler2}
                >
                    <FastImage
                        source={
                            props.value === 1 ?
                                require('../../Images/silver_star.png')
                                : props.value === 2 ?
                                    require('../../Images/star.png')
                                    : props.value === 3 ?
                                        require('../../Images/star.png')
                                        : props.value === 4 ?
                                            require('../../Images/star.png')
                                            : props.value === 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.clickHandler3}
                >
                    <FastImage
                        source={
                            props.value === 1 ?
                                require('../../Images/silver_star.png')
                                : props.value === 2 ?
                                    require('../../Images/silver_star.png')
                                    : props.value === 3 ?
                                        require('../../Images/star.png')
                                        : props.value === 4 ?
                                            require('../../Images/star.png')
                                            : props.value === 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.clickHandler4}
                >
                    <FastImage
                        source={
                            props.value === 1 ?
                                require('../../Images/silver_star.png')
                                : props.value === 2 ?
                                    require('../../Images/silver_star.png')
                                    : props.value === 3 ?
                                        require('../../Images/silver_star.png')
                                        : props.value === 4 ?
                                            require('../../Images/star.png')
                                            : props.value === 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.clickHandler5}
                >
                    <FastImage
                        source={
                            props.value === 1 ?
                                require('../../Images/silver_star.png')
                                : props.value === 2 ?
                                    require('../../Images/silver_star.png')
                                    : props.value === 3 ?
                                        require('../../Images/silver_star.png')
                                        : props.value === 4 ?
                                            require('../../Images/silver_star.png')
                                            : props.value === 5 ?
                                                require('../../Images/star.png')
                                                : require('../../Images/silver_star.png')
                        }
                        resizeMode={FastImage.resizeMode.stretch}
                        style={styles.img}
                    />
                </TouchableOpacity>
            </View>
            <TextInput
                placeholder="Please write your review"
                placeholderTextColor="#000"
                style={styles.input}
                numberOfLines={5}
                multiline
                editable={true}
                autoCapitalize="none"
                keyboardType="email-address"
                value={props.networkText}
                onChangeText={props.onChangeTextHandler}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: heightPercentageToDP(25),
        width: widthPercentageToDP(100),
        alignItems: 'center',
        marginTop: widthPercentageToDP(2)
    },
    input: {
        width: widthPercentageToDP(85),
        height: widthPercentageToDP(20),
        textAlignVertical: "top",
        padding: widthPercentageToDP(2),
        color: "#000",
        fontFamily: "Montserrat-Regular",
        fontSize: widthPercentageToDP(4),
        borderWidth: widthPercentageToDP(0.1),
        borderColor: "#000"
        //backgroundColor:"red"
    },
    startView: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        width: widthPercentageToDP(85),
        marginTop: widthPercentageToDP(2),
        marginBottom: widthPercentageToDP(2),
        justifyContent: "space-between"
    },
    img: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
    }
})

export default SurveyItems;
