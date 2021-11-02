import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { black, blue, blue2, white } from '../../config/color'
import { getDivesDetails } from '../../Redux/action'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import { useSelector, useDispatch } from 'react-redux';
import AwesomeAlert from 'react-native-awesome-alerts';

const Card = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [imageId, setId] = useState('')
    const [showAlert, setAlert] = useState(false)
    const login = useSelector((state) => state.user.login);

    const getApis = async (diveId) => {
        setIsLoading(true)
        await getDivesDetails(diveId, login.data.id)
        await setIsLoading(false)
    }
    const imageModel = (({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    // props.navigate(props.destination, {
                    //     data: item
                    // })
                    getApis(item.id)
                }}
                delayLongPress={1000}
                onLongPress={() => props.longPress(item.id)}
                style={styles.modelView}>
                {item.image ?
                    <FastImage
                        source={{ uri: item.image }}
                        style={styles.imgModel}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    : <FastImage
                        source={require('../../Images/108.png')}
                        style={styles.imgModel}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                }
                <Text style={styles.title}>
                    {item.country}
                </Text>
                <Text style={styles.title}>
                    {item.city}
                </Text>
                <Text style={styles.date}>
                    {item.date}
                </Text>
            </TouchableOpacity>
        )
    })

    return (
        <View style={styles.container}>
            <View style={styles.yearView}>
                <FastImage
                    source={require('../../Images/line_left.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
                <Text style={styles.yearText}>
                    {props.year}
                </Text>
                <FastImage
                    source={require('../../Images/line_right.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
                {isLoading &&
                    <ActivityIndicator
                        size="large"
                        color={black}
                        style={styles.loading}
                    />
                }
                {showAlert &&
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="Alert"
                        message="Do you really want to delete the dives?"
                        closeOnTouchOutside={false}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="No"
                        confirmText="Yes, delete it"
                        confirmButtonColor={blue}
                        cancelButtonColor={blue2}
                        onCancelPressed={() => {
                            setAlert(false);
                        }}
                        onConfirmPressed={() => {
                            setAlert(false);
                            //deleteApi(imageId);
                        }}
                    />
                }
            </View>
            {!props.months || !props.months.length ?
                <View />
                : props.months.map((item, index) => {
                    return (
                        <View
                            key={"unique" + index}
                            style={{
                                width: widthPercentageToDP(90),
                                flex: 1,
                                marginTop: heightPercentageToDP(1)
                            }}>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center" }}>
                                <Text style={styles.mothText}>
                                    {item.month}
                                </Text>
                                <FastImage
                                    source={require('../../Images/line_right.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={styles.lineRight}
                                />
                            </View>
                            <FlatList
                                data={item.imageModel}
                                showsVerticalScrollIndicator={false}
                                //style={{ alignSelf: "center" }}
                                listKey={(item, index) => `_key${index.toString() + "1"}`}
                                numColumns={3}
                                keyExtractor={(item, index) => "unique" + index}
                                renderItem={imageModel}
                            />
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(90),
        flex: 0,
        marginBottom: heightPercentageToDP(1),
        alignItems: "center",
    },
    yearView: {
        width: widthPercentageToDP(90),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    line: {
        width: widthPercentageToDP(35),
        height: heightPercentageToDP(0.3)
    },
    lineRight: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(0.1)
    },
    modelView: {
        width: widthPercentageToDP(28),
        flex:0,
        borderRadius: widthPercentageToDP(4),
        alignItems: "center",
        backgroundColor: blue,
        margin: widthPercentageToDP(1)
    },
    imgModel: {
        width: widthPercentageToDP(28),
        height: heightPercentageToDP(13),
        borderRadius: widthPercentageToDP(4),
    },
    title: {
        fontSize: widthPercentageToDP(3),
        color: white,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        //marginTop: heightPercentageToDP(0.1)
    },
    date: {
        fontSize: widthPercentageToDP(3),
        color: white,
        fontFamily: "Montserrat-Regular",
        marginTop: heightPercentageToDP(0.5),
        marginBottom: heightPercentageToDP(0.5),
    },
    yearText: {
        fontSize: widthPercentageToDP(6),
        color: blue,
        fontFamily: "Montserrat-SemiBold",
    },
    mothText: {
        fontSize: widthPercentageToDP(4),
        color: blue,
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: widthPercentageToDP(1)
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default Card;