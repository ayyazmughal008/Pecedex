import React, { Component } from 'react';
import { View, Modal, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { blue, green, white } from '../../config/color'
import RNPickerSelect from 'react-native-picker-select';
import Strings from '../../Translation'

const DialogBox = (props) => {
    return (
        <Modal
            transparent={true}
            visible={props.isDialogOpen}
            animationType="fade"
            onRequestClose={() => {
                console.log('alert close')
            }}
        >
            <TouchableOpacity
                style={styles.modalMain2}
                onPress={props.closeBox2}
            >
                <View style={styles.quesBox}>
                    <View style={styles.inputDropdownView}>
                        {!props.certificateResponse || !props.certificateResponse.data.length ?
                            <RNPickerSelect
                                placeholder={{
                                    label: Strings.certificate,
                                    value: null,
                                    color: "#000"
                                }}
                                value={props.certificate}
                                style={pickerStyle}
                                onValueChange={props.setCertificate}
                                items={[{ label: "value", value: "value" }]}
                            />
                            : <RNPickerSelect
                                placeholder={{
                                    label: Strings.certificate,
                                    value: null,
                                    color: "#000"
                                }}
                                value={props.certificate}
                                style={pickerStyle}
                                onValueChange={props.setCertificate}
                                items={props.certificateResponse.data}
                            />}
                    </View>
                    {!props.certificate ?
                        <View />
                        : props.certificate === "Others" ?
                            <View style={styles.inputDropdownView}>
                                <TextInput
                                    placeholder={"Degree"}
                                    placeholderTextColor="#ffff"
                                    style={styles.input}
                                    value={props.degree}
                                    onChangeText={props.setDegree}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            : <View style={styles.inputDropdownView}>
                                {!props.DegreeResponse || !props.DegreeResponse.data.length ?
                                    <RNPickerSelect
                                        placeholder={{
                                            label: "Degree",
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={props.degree}
                                        style={pickerStyle}
                                        onValueChange={props.setDegree}
                                        items={[{ label: "value", value: "value" }]}
                                    />
                                    : <RNPickerSelect
                                        placeholder={{
                                            label: "Degree",
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={props.degree}
                                        style={pickerStyle}
                                        onValueChange={props.setDegree}
                                        items={props.DegreeResponse.data}
                                    />}
                            </View>
                    }
                    {!props.certificate ?
                        <View />
                        : <TouchableOpacity
                            style={styles.inputView}
                            onPress={props.updateCertDegree}
                        >
                            <Text style={styles.btnText}>
                                {Strings.update}
                            </Text>
                        </TouchableOpacity>}
                </View>
            </TouchableOpacity>
        </Modal>
    )

}


const styles = StyleSheet.create({
    modalMain2: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor:"red"
    },
    inputView: {
        width: widthPercentageToDP(78),
        height: heightPercentageToDP(5.5),
        borderRadius: widthPercentageToDP(7),
        marginBottom: heightPercentageToDP(1),
        backgroundColor: green,
        justifyContent: "center",
        alignItems: "center"
    },
    quesBox: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(23),
        marginLeft: widthPercentageToDP(0),
        borderRadius: widthPercentageToDP(3),
        alignItems: "center",
        backgroundColor: white,
        borderRadius: widthPercentageToDP(5),
        shadowColor: '#000000',
        elevation: 5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.5
    },
    input: {
        width: widthPercentageToDP(75),
        height: heightPercentageToDP(5.5),
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Regular",
        paddingLeft: widthPercentageToDP(5),
        color: white
    },
    btnText: {
        fontSize: widthPercentageToDP(4),
        color: white,
        fontFamily: "Montserrat-Regular"
    },
    inputDropdownView: {
        marginTop: heightPercentageToDP(1),
        width: widthPercentageToDP(78),
        height: heightPercentageToDP(5.5),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(7),
        marginBottom: heightPercentageToDP(1),
        justifyContent: "center"
    },
    bottomView: {
        width: "100%",
        height: "25%",
        flexDirection: "row",
        position: "absolute",
        bottom: "0%",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: blue,
        borderBottomLeftRadius: widthPercentageToDP(5),
        borderBottomRightRadius: widthPercentageToDP(5)
    },
    toptile: {
        width: "100%",
        height: "35%",
        justifyContent: "center",
        borderBottomWidth: widthPercentageToDP(0.1),
        borderBottomColor: "#000"
    },
    toptext: {
        color: "#000",
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-SemiBold",
        paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1)
    },
    centerView: {
        flex: 1
    },
    radioStyle: {
        paddingLeft: widthPercentageToDP(3),
        marginTop: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(1)
    }
})
const pickerStyle = {
    inputIOS: {
        fontSize: widthPercentageToDP(3.7),
        color: white,
        fontWeight: "300",
        fontFamily: "Montserrat-SemiBold",
        //marginTop: 6,
        //justifyContent:"center",
        paddingHorizontal: 10,
        //backgroundColor: 'red',
        borderRadius: 5,
    },
    placeholder: {
        color: white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: widthPercentageToDP(3.7),
    },
    inputAndroid: {
        fontSize: widthPercentageToDP(3.7),
        fontFamily: "Montserrat-SemiBold",
        color: white,
        //paddingHorizontal: -10,
        //backgroundColor: 'red',
        //borderRadius: 5,
    },
    modalViewBottom: {
        backgroundColor: "#DCDCDC"
    }
};

export default DialogBox;