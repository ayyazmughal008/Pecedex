import { StyleSheet, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../Component/MakeMeResponsive'
import { blue, lightRed, green, white, black, darkBlue } from '../config/color'

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
    bgImg2: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: Platform.OS === "ios" ? "96%" : "92%",
        bottom: "0%",
        //backgroundColor:"red"
    },
    topImg: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(55),
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
    loginView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(40),
        alignSelf: "center",
        position: "absolute",
        bottom: "0%",
        alignItems: "center",
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
    inputDropdownView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(5.5),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(7),
        marginBottom: heightPercentageToDP(1),
        justifyContent: "center"
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
    searchText: {
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
        height: heightPercentageToDP(11),
        //justifyContent: "center",
        alignItems: "center"
    },
    top2: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(20),
        justifyContent: "center",
        alignItems: "center"
    },
    profileImgView: {
        width: widthPercentageToDP(35),
        height: widthPercentageToDP(35),
        borderRadius: widthPercentageToDP(35) / 2,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: heightPercentageToDP(-5),
        //backgroundColor: "red"
    },
    profileImg: {
        width: widthPercentageToDP(34),
        height: widthPercentageToDP(34),
        borderRadius: widthPercentageToDP(34) / 2,
    },
    profileView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(27),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        marginTop: heightPercentageToDP(2),
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
    proInfoTile2: {
        fontSize: widthPercentageToDP(5),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        alignSelf: "center",
        color: blue,
        marginTop: 10
        //marginLeft: widthPercentageToDP(5)
    },
    proInfoTile3: {
        fontSize: widthPercentageToDP(5.5),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        marginLeft: widthPercentageToDP(5)
    },
    headerTitle: {
        fontSize: widthPercentageToDP(5.5),
        color: white,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        padding: widthPercentageToDP(2)
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
    smallText3: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "center",
        alignSelf: "center",
        padding: widthPercentageToDP(1)
    },
    description: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        textAlign: "justify",
        alignSelf: "center",
        padding: widthPercentageToDP(1),
        paddingLeft: widthPercentageToDP(4),
        paddingRight: widthPercentageToDP(4)
    },
    mapBottom: {
        width: widthPercentageToDP(40),
        alignSelf: "center",
        position: "absolute",
        right: "2%",
        bottom: "10%",
        borderRadius: widthPercentageToDP(4),
        backgroundColor: 'transparent',
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
        width: widthPercentageToDP(90),
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
        // marginTop: heightPercentageToDP(1),
        // marginBottom: heightPercentageToDP(1)
    },
    commentView: {
        width: widthPercentageToDP(80),
        height: heightPercentageToDP(13),
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        //backgroundColor:"red",
        //marginTop: heightPercentageToDP(1)
    },
    squre: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
        borderWidth: widthPercentageToDP(0.5),
        borderColor: blue,
        borderRadius: widthPercentageToDP(2),
        alignSelf: "center",
        marginLeft: widthPercentageToDP(2)
    },
    diveLogo: {
        width: widthPercentageToDP(20),
        height: heightPercentageToDP(10),
        position: "absolute",
        top: "1%",
        right: "1%",
        borderRadius: widthPercentageToDP(2),
        borderWidth: widthPercentageToDP(0.2),
        borderColor: blue
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
        height: "90%"
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
    waveView: {
        marginTop: heightPercentageToDP(2),
        height: heightPercentageToDP(8),
        width: widthPercentageToDP(90),
        borderTopWidth: widthPercentageToDP(0.6),
        borderBottomWidth: widthPercentageToDP(0.6),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        borderColor: blue,
        justifyContent: "center"
    },
    smallIcon: {
        width: widthPercentageToDP(13),
        height: widthPercentageToDP(13)
    },
    difficultBarView: {
        //marginTop: heightPercentageToDP(1),
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(4),
        flexDirection: "row",
        alignSelf: "center"
    },
    barValue: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    viewLine: {
        marginTop: heightPercentageToDP(3),
        height: heightPercentageToDP(10),
        width: widthPercentageToDP(90),
        borderTopWidth: widthPercentageToDP(0.6),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        borderColor: blue,
        justifyContent: "center"
    },
    serachView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(5.5),
        backgroundColor: blue,
        borderRadius: widthPercentageToDP(7),
        marginBottom: heightPercentageToDP(1),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        alignSelf: "center",
        marginTop: heightPercentageToDP(2)
    },
    shortcutView: {
        width: widthPercentageToDP(90),
        flex: 0,
        backgroundColor: darkBlue,
        borderRadius: widthPercentageToDP(4),
        alignSelf: "center",
        marginTop: heightPercentageToDP(2),
        justifyContent: "center",
        marginTop: heightPercentageToDP(5)
    },
    shortCutTxt: {
        fontSize: widthPercentageToDP(3.5),
        fontFamily: "Montserrat-SemiBold",
        color: white,
        padding: widthPercentageToDP(1)
    },
    tabBar: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'transparent'
    },
    tabsContainer: {
        flexDirection: 'row',
        height: 50,
        paddingTop: 0,
        paddingBottom: 0,
        alignSelf: "center",
        //backgroundColor:"red"
    },
    socialImages: {
        width: widthPercentageToDP(10),
        height: heightPercentageToDP(4),
    },
    roundButton: {
        width: widthPercentageToDP(20),
        height: widthPercentageToDP(20),
        borderRadius: widthPercentageToDP(20) / 2,
        backgroundColor: blue,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: "10%",
        right: "4%",
        zIndex: 3
    },
    plusText: {
        fontSize: widthPercentageToDP(10),
        fontFamily: "Montserrat-SemiBold",
        color: white
    },
})