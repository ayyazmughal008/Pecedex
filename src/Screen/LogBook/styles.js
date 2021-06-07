import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { blue, lightRed, green, white, black, blue2 } from '../../config/color'

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
        //backgroundColor: blue,
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
        height: heightPercentageToDP(8),
        backgroundColor: "#cccccc",
        borderRadius: widthPercentageToDP(3),
        marginLeft: widthPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center"
    },
    tinyText: {
        fontSize: widthPercentageToDP(2.5),
        fontFamily: "Montserrat-SemiBold",
    },
    tinyText2: {
        fontSize: widthPercentageToDP(3),
        fontFamily: "Montserrat-SemiBold",
    },
    titleView: {
        width: widthPercentageToDP(90),
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: heightPercentageToDP(2)
    },
    titleTxt: {
        fontSize: widthPercentageToDP(5.5),
        fontFamily: "Montserrat-SemiBold",
        color: blue
    },
    line: {
        width: widthPercentageToDP(65),
        height: heightPercentageToDP(0.3),
        marginLeft: widthPercentageToDP(0.5)
    },
    sideButton: {
        position: "absolute",
        right: "5%",
        zIndex: 3,
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13)
    },
    modelView: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(14),
        borderRadius: widthPercentageToDP(6),
        alignItems: "center",
        backgroundColor: blue,
        margin: widthPercentageToDP(1)
    },
    imgModel: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(10),
        borderRadius: widthPercentageToDP(4),
    },
    title: {
        fontSize: widthPercentageToDP(2.5),
        color: white,
        textAlign: "center",
        fontFamily: "Montserrat-SemiBold",
        marginTop: heightPercentageToDP(0.5)
    },
    date: {
        fontSize: widthPercentageToDP(2.5),
        color: white,
        fontFamily: "Montserrat-Regular",
        marginTop: heightPercentageToDP(0.5)
    },
    writeView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(14),
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: heightPercentageToDP(1)
    },
    input: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(14),
        textAlignVertical: "top",
        backgroundColor: "#cccccc",
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
    },
    input2: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(14),
        textAlignVertical: "top",
        backgroundColor: "#cccccc",
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        alignSelf: "center",
        marginTop: heightPercentageToDP(1),
    },
    btn: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(5.5),
        backgroundColor: green,
        borderRadius: widthPercentageToDP(7),
        marginBottom: heightPercentageToDP(1),
        marginTop: heightPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        fontSize: widthPercentageToDP(4),
        color: white,
        fontFamily: "Montserrat-Regular"
        // fontWeight: "bold"
    },
})