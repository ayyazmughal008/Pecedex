import React, { Component } from 'react';
import { View, Modal, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { blue, white } from '../../config/color'
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
                onPress={props.closeBox}
            >
                <View style={styles.quesBox}>
                    <View style={styles.toptile}>
                        <Text style={styles.toptext}>
                            {props.title}
                        </Text>
                    </View>
                    <View style={styles.bottomView}>
                        <TouchableOpacity
                            onPress={props.cancelClick}
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.btnText}>
                                {Strings.Camera}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={props.okClick}
                            style={{
                                width: "50%",
                                height: "100%",
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text style={styles.btnText}>
                                {Strings.Gallery}
                            </Text>
                        </TouchableOpacity>

                    </View>
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
    quesBox: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(20),
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
    btnText: {
        color: "#ffff",
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Regular",
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

export default DialogBox;