import { StyleSheet, Platform } from 'react-native'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { blue, lightRed, green, white, black, blue2 } from '../../config/color'

export const styles = StyleSheet.create({
    container: {
        flex: 1
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
    bgImg: {
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "88%",
        bottom: "0%",
        //backgroundColor:"red"
    },
    top: {
        width: widthPercentageToDP(100),
        height: Platform.OS === 'android' ? heightPercentageToDP(14) : heightPercentageToDP(16),
        //justifyContent: "center",
        alignItems: "center"
    },
    logView: {
        width: widthPercentageToDP(90),
        //backgroundColor: blue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        alignItems: "center"
    },
    logView2: {
        width: widthPercentageToDP(90),
        //backgroundColor: blue,
        borderRadius: widthPercentageToDP(5),
        alignSelf: "center",
        alignItems: "center"
    },
    innerLogView: {
        width: widthPercentageToDP(90),
        flexDirection: "row",
        alignItems: "center"
    },
    innerLogView2: {
        height: heightPercentageToDP(16),
        width: widthPercentageToDP(90),
        borderRadius: widthPercentageToDP(5),
        alignItems: "center",
        backgroundColor: blue2,
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(1)
    },
    innerLogView3: {
        height: heightPercentageToDP(14),
        width: widthPercentageToDP(70),
        alignItems: "center",
        backgroundColor: blue2,
        flexDirection: "row",
        marginTop: heightPercentageToDP(1)
    },
    left: {
        width: "50%",
        height: "100%",
        marginLeft: widthPercentageToDP(1),
        //backgroundColor:"red",
        //justifyContent: "center"
    },
    right: {
        width: "50%",
        height: "100%",
        //backgroundColor:"yellow"
    },
    left2: {
        width: "50%",
        height: "100%",
        marginLeft: widthPercentageToDP(1),
        width: "45%",
        backgroundColor: blue2,
        borderRadius: widthPercentageToDP(6),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    right2: {
        //width: "50%",
        height: "100%",
        width: "45%",
        backgroundColor: blue2,
        borderRadius: widthPercentageToDP(6),
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between"
    },
    smallTxt: {
        fontSize: widthPercentageToDP(3.7),
        fontFamily: "Montserrat-SemiBold",
        fontWeight: "normal"
    },
    weatherBtn: {
        width: widthPercentageToDP(16.5),
        height: widthPercentageToDP(16.5),
        //backgroundColor: "#cccccc",
        borderRadius: widthPercentageToDP(3),
        marginLeft: widthPercentageToDP(2),
        justifyContent: "center",
        alignItems: "center"
    },
    tinyText: {
        fontSize: widthPercentageToDP(2.9),
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
        right: "0%",
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
        height: heightPercentageToDP(16),
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
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
    centerView: {
        width: widthPercentageToDP(35),
        height: widthPercentageToDP(35),
        borderRadius: widthPercentageToDP(4),
        backgroundColor: blue2,
        justifyContent: "center",
        alignItems: "center"
    },
    observationView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(14),
        backgroundColor: blue,
        alignItems: "center",
        alignSelf: "center",
        borderRadius: widthPercentageToDP(4),
        marginTop: heightPercentageToDP(2)
    },
    input2: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(13),
        textAlignVertical: "top",
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        padding: widthPercentageToDP(1)
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
    smallInput: {
        color: white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: widthPercentageToDP(3.7),
        width: "100%",
        height: "45%",
        //backgroundColor: "red",
        //marginTop: 5,
        paddingTop: 0,
        paddingBottom: 0,
    },
    smallInput2: {
        color: white,
        fontFamily: "Montserrat-SemiBold",
        fontSize: widthPercentageToDP(3.7),
        width: "100%",
        height: "55%",
        //backgroundColor: "red",
        //marginTop: 5,
        paddingTop: 0,
        paddingBottom: 0,
    },
    tinyInput: {
        width: "100%",
        height: "20%",
        //backgroundColor:"red",
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: "Montserrat-SemiBold",
        color: white,
        fontSize: widthPercentageToDP(2.5),
        paddingLeft: 0
    },
    tinyInput2: {
        width: "10%",
        height: "80%",
        //backgroundColor: "red",
        paddingTop: 0,
        paddingBottom: 0,
        fontFamily: "Montserrat-SemiBold",
        color: white,
        fontSize: widthPercentageToDP(3.7),
        paddingLeft: 0
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        //flexDirection: "column"
    },
    modalView2: {
        flex: 1,
        alignItems: 'center',
        //marginTop:heightPercentageToDP(5)
        //justifyContent: "center",
        //flexDirection: "column"
    },
    map: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(70),
        alignItems: "center",
        justifyContent: "center"
    },
    map2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    mapCloseBtn: {
        position: "absolute",
        left: "0%",
        top: "-2%",
        width: widthPercentageToDP(5),
        height: widthPercentageToDP(5),
        borderRadius: widthPercentageToDP(5) / 2,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center"
    },
    sampleView: {
        width: "100%",
        //margin: heightPercentageToDP(1.5),
        height: heightPercentageToDP(8),
        //backgroundColor:"yellow"
    },
    dropDown: {
        width: "80%",
        height: "55%",
        justifyContent: "center",
        marginLeft: widthPercentageToDP(-4)
    },
    sankSelectionView: {
        width: widthPercentageToDP(90),
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: widthPercentageToDP(100),
        justifyContent: "space-around"
    },
    uploadImageView: {
        width: "100%",
        height: heightPercentageToDP(7),
        //backgroundColor:"red"
    },
    sampleViews: {
        flexDirection: "row",
        alignItems: "center",
        height: "30%",
        width: "100%",
        //marginLeft: 15,
    },
    sampleViews2: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        height: "20%",
    },
    scubaView: {
        width: "100%",
        height: heightPercentageToDP(20),
        flexDirection: "row",
        alignItems: "center",
        marginTop: heightPercentageToDP(2),
        justifyContent: "space-between",

    },
    suitView: {
        width: "25%",
        height: heightPercentageToDP(20),
        alignItems: "center",
        //backgroundColor: "red",
        justifyContent: "center"
    }

})