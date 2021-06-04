import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { blue, lightRed, green, white, black } from '../../config/color'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    top: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(12),
        justifyContent: "center",
        alignItems: "center"
    },
    logView: {
        width: widthPercentageToDP(90),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        alignItems: "center"
    },
    innerLogView: {
        width: widthPercentageToDP(80),
        flexDirection: "row",
        alignItems: "center"
    },
    left: {
        width: "50%",
        height: "100%",
        //backgroundColor:"red",
        //justifyContent: "center"
    },
    right: {
        width: "50%",
        height: "100%",
        //backgroundColor:"yellow"
    },
    smallTxt: {
        fontSize: widthPercentageToDP(3.7),
        fontFamily: "Montserrat-SemiBold",
    },
    weatherBtn: {
        width: widthPercentageToDP(17),
        height: heightPercentageToDP(7.5),
        //backgroundColor: blue,
        borderRadius: widthPercentageToDP(3),
        marginLeft: widthPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center"
    },
    tinyText:{
        fontSize: widthPercentageToDP(2.5),
        fontFamily: "Montserrat-SemiBold",
    }
})