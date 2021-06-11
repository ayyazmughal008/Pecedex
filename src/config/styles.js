import { StyleSheet } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../Component/MakeMeResponsive'
import { blue, lightRed, green, white, black } from '../config/color'

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bgImg: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
    },
    topImg: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(55),
    },
    loginView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(40),
        alignSelf: "center",
        position: "absolute",
        bottom: "2%",
        alignItems: "center"
        //backgroundColor:"red"
    },
    loginTitle: {
        fontSize: widthPercentageToDP(5),
        color: blue,
        fontFamily: "Montserrat-SemiBold",
    },
    notMemberText: {
        fontSize: widthPercentageToDP(4.5),
        color: lightRed,
        fontFamily: "Montserrat-Regular",
        marginTop: heightPercentageToDP(2),
        alignSelf: "center"
    },
    inputView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(5.5),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(7),
        marginBottom: heightPercentageToDP(1)
    },
    input: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(5.5),
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Regular",
        paddingLeft: widthPercentageToDP(5),
        color: white
    },
    input2: {
        width: widthPercentageToDP(75),
        height: heightPercentageToDP(5.5),
        fontSize: widthPercentageToDP(4),
        fontFamily: "Montserrat-Regular",
        paddingLeft: widthPercentageToDP(5),
        color: white
    },
    input3: {
        width: widthPercentageToDP(60),
        height: heightPercentageToDP(5.5),
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-Regular",
        paddingLeft: widthPercentageToDP(5),
        color: black,
        //backgroundColor:"red"
    },
    viewPass: {
        width: widthPercentageToDP(14),
        height: heightPercentageToDP(5.5),
        //justifyContent:"center",
        alignItems: "center",
        flexDirection: "row",
        //backgroundColor:"red",
        borderBottomRightRadius: widthPercentageToDP(7),
        borderTopRightRadius: widthPercentageToDP(7)
    },
    btnText: {
        fontSize: widthPercentageToDP(4),
        color: white,
        fontFamily: "Montserrat-Regular"
        // fontWeight: "bold"
    },
    top: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(12),
        justifyContent: "center",
        alignItems: "center"
    },
    profileImg: {
        width: widthPercentageToDP(35),
        height: widthPercentageToDP(35),
        borderRadius: widthPercentageToDP(35) / 2,
        alignSelf: "center",
        position: "absolute",
        top: "6%"
    },
    profileView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(30),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        marginTop: heightPercentageToDP(12),
        alignItems: "center"
    },
    logView: {
        width: widthPercentageToDP(90),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        alignItems: "center"
    },
    profileName: {
        fontSize: widthPercentageToDP(6),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        margin: 5
    },
    profileInfo: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(5),
        alignSelf: "center",
        //justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        //backgroundColor:"red",
        marginTop: heightPercentageToDP(1)
    },
    proInfoTile: {
        fontSize: widthPercentageToDP(4.5),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        marginLeft: widthPercentageToDP(5)
    },
    shareView: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(7),
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        //backgroundColor:"red"
    },
    shareButton: {
        width: widthPercentageToDP(11),
        height: heightPercentageToDP(5.5),
        //backgroundColor: blue,
        borderRadius: widthPercentageToDP(3),
        marginLeft: widthPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center"
    },
    smallText: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        alignSelf: "center",
        padding: widthPercentageToDP(2)
    },
    smallText2: {
        fontSize: widthPercentageToDP(3),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        alignSelf: "center",
        padding: widthPercentageToDP(2)
    },
    mapBottom: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(10),
        alignSelf: "center",
        position: "absolute",
        bottom: "10%",
        borderRadius: widthPercentageToDP(4),
        backgroundColor: blue,
        justifyContent: "center"
    },
    circle: {
        width: widthPercentageToDP(5),
        height: widthPercentageToDP(5),
        borderRadius: widthPercentageToDP(5) / 2,
        borderWidth: widthPercentageToDP(0.5),
        borderColor: "#cccccc",
        marginLeft: 10
    },
    infoBox: {
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(15),
        alignItems: "center",
        alignSelf: "center",
        //backgroundColor: blue
    },
    infoTxt: {
        fontSize: widthPercentageToDP(3.5),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        marginLeft: widthPercentageToDP(5)
    },
    socialView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(6),
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: heightPercentageToDP(2)
    },
    line: {
        width: widthPercentageToDP(75),
        height: heightPercentageToDP(0.3),
        alignSelf: "center",
        marginTop: heightPercentageToDP(3),
        marginBottom: heightPercentageToDP(1)
    },
    commentView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(13),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        //backgroundColor:"red",
        marginTop: heightPercentageToDP(1)
    },
    squre: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
    },
    starView: {
        width: "70%",
        height: "100%",
        //backgroundColor:"yellow",
        marginLeft: widthPercentageToDP(4),
        justifyContent: "center",
        alignItems: "center"
    },
    star: {
        width: "20%",
        height: "100%"
    },
    commentTxt: {
        fontSize: widthPercentageToDP(4.5),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        marginTop: heightPercentageToDP(1)
    },
    titleView: {
        width: widthPercentageToDP(90),
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: heightPercentageToDP(2)
    },
    titleTxt: {
        fontSize: widthPercentageToDP(4.5),
        fontFamily: "Montserrat-SemiBold",
        color: blue
    },
    line2: {
        width: widthPercentageToDP(65),
        height: heightPercentageToDP(0.3),
        marginLeft: widthPercentageToDP(0.5)
    },
})