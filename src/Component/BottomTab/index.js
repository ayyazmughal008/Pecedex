import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { black, blue, white } from '../../config/color'
import { widthPercentageToDP, heightPercentageToDP } from '../MakeMeResponsive'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon4 from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Strings from '../../Translation'




const Card = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.midView}>
                <TouchableOpacity
                    style={[styles.itemView, {
                        //backgroundColor: "red"
                    }]}
                    onPress={props.profileClick}
                >
                    <Icon4 name="user" color={white} size={25} />
                    <Text style={styles.smallText}>
                        {Strings.profile}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.homeClick}
                    style={[styles.itemView, {
                        //backgroundColor: "pink"
                    }]}
                >
                    <Icon4 name="home" color={white} size={25} />
                    <Text style={styles.smallText}>
                        {Strings.home}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.settingClick}
                    style={[styles.itemView, {
                        //backgroundColor: "green",
                        width:"23%"
                    }]}
                >
                    <Feather name="settings" color={white} size={25} />
                    <Text style={styles.smallText}>
                        {Strings.setting}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.mapClick}
                    style={[styles.itemView, {
                        //backgroundColor: "blue"
                    }]}
                >
                    <Icon name="map-marker-alt" color={white} size={25} />
                    <Text style={styles.smallText}>
                        {Strings.map}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={props.notiClick}
                    style={[styles.itemView, {
                        width:"23%"
                        //backgroundColor: "yellow"
                    }]}
                >
                    <Icon2 name="notifications" color={white} size={25} />
                    <Text style={styles.smallText}>
                        {Strings.notification}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(8),
        position: "absolute",
        bottom: "0%",
        justifyContent: "center",
        backgroundColor: blue,
        alignItems:"center"
        //backgroundColor: blue
    },
    midView: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        flexDirection: "row",
        //backgroundColor:"red",
        justifyContent: 'center',
    },
    itemView: {
        width: "18%",
        height: "100%",
        alignItems: "center",
        justifyContent:"center"
    },
    smallText: {
        color: white,
        alignSelf: "center",
        fontFamily: "Montserrat-Regular",
        fontSize: widthPercentageToDP(3)
    }
})

export default Card;