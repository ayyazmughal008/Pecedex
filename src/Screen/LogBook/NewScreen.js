import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue, blue2, white, } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { data } from './data'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import RNPickerSelect from 'react-native-picker-select';
import { SearchBar } from 'react-native-elements'
import { getCountryName } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';

const NewScreen = (props) => {
    const dispatch = useDispatch();
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const countryData = useSelector((state) => state.user.countryData);
    const [isLoading, setIsLoading] = useState(false)
    const [country, setCountry] = useState("")
    const [text, setText] = useState("")
    const [countryList, setCountryList] = useState([])
    const [countryList2, setCountryList2] = useState([])
    const [city, setCity] = useState("")
    const [text2, setText2] = useState("")
    const [cityList, setCityList] = useState([])
    const [cityList2, setCityList2] = useState([])
    const [searchModal, setSearchModal] = useState(false)
    const [cityModal, setCityModal] = useState(false)
    const [seaSalinty, setSalinty] = useState("")
    const [typeDive, setTypeDive] = useState("")
    const [temperature, setTemperature] = useState("")
    const [animal, setAnimal] = useState("")

    useEffect(() => {
        dispatch(getCountryName())
    }, [])
    useEffect(() => {
        setCountryList(countryData)
    }, [countryData])
    const getCityName = (country) => {
        setIsLoading(true)
        fetch("https://countriesnow.space/api/v0.1/countries/cities", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                country: country
            })
        })
            .then(res => res.json())
            .then(json => {
                setIsLoading(false)
                console.log(json)
                if (json.error == false) {
                    setCityList(json.data)
                } else {
                    alert(json.error)
                }
            })
            .catch(error => {
                setIsLoading(false)
                console.log("response error ===>", error)
            })
    }
    const toggleSearch = () => {
        setSearchModal(!searchModal)
    }
    const toggleCity = () => {
        setCityModal(!cityModal)
    }
    const renderItem = (({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setCountry(item.name)
                    getCityName(item.name)
                    toggleSearch()
                }}
                style={stylesProps.textStyle}>
                <Text style={stylesProps.txt}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    })
    const renderItem2 = (({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setCity(item)
                    toggleCity()
                }}
                style={stylesProps.textStyle}>
                <Text style={stylesProps.txt}>
                    {item}
                </Text>
            </TouchableOpacity>
        )
    })
    const renderSeparator = () => {
        return (
            <View
                style={{
                    height: widthPercentageToDP(0.2),
                    width: widthPercentageToDP(80),
                    backgroundColor: "#000",
                }}
            />
        );
    };
    const searchFilterFunction = text => {
        let temList = countryList;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setCountryList2(newData)
        setText(text)
    };
    const cityFilterFunction = text => {
        let temList = cityList;
        const newData = temList.filter(item => {
            const itemData = item ? item.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setCityList2(newData)
        setText2(text)
    };

    return (
        <View style={[styles.container, { alignItems: "center" }]}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={[styles.logView, {
                height: heightPercentageToDP(18),
                marginTop: heightPercentageToDP(2),
                justifyContent: "center",
                //backgroundColor:"red"
            }]}>
                <View style={[styles.innerLogView, { height: heightPercentageToDP(13) }]}>
                    <View style={styles.left}>
                        <View>
                            <Text style={[styles.smallTxt, { color: black }]}>
                                {"Dive name:"}
                            </Text>
                            <Text style={[styles.smallTxt, { color: blue2 }]}>
                                {"XYZ Name"}
                            </Text>
                        </View>
                        <Text style={[styles.smallTxt, { color: black, marginTop: 10 }]}>
                            {"Sea salinity:"}
                        </Text>
                        <View style={{ width: "95%", height: "20%", justifyContent: "center", marginLeft: widthPercentageToDP(-4) }}>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Sea salinity',
                                    value: null,
                                    color: "#000"
                                }}
                                value={seaSalinty}
                                style={pickerStyle}
                                onValueChange={value => {
                                    setSalinty(value)
                                }}
                                items={data.diveType}
                            />
                        </View>
                    </View>
                    <View style={styles.right}>
                        <Text style={[styles.smallTxt, { color: black }]}>
                            {"Pais:"}
                        </Text>
                        <TouchableOpacity
                            onPress={() => toggleSearch()}
                        >
                            <Text style={[styles.smallTxt, { color: blue }]}>
                                {!country ? "Select Country" : country}
                            </Text>
                        </TouchableOpacity>
                        <Text style={[styles.smallTxt, { color: black, marginTop: 10, }]}>
                            {"Cludad:"}
                        </Text>
                        <TouchableOpacity
                            onPress={() => toggleCity()}
                        >
                            <Text style={[styles.smallTxt, { color: blue }]}>
                                {!city ? "Select City" : city}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[styles.sideButton, { top: "10%" }]}>
                    <FastImage
                        source={require('../../Images/45.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ width: "100%", height: "100%" }}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.logView, {
                height: heightPercentageToDP(32),
                //backgroundColor: "red"
            }]}>
                <View style={styles.sampleView}>
                    <Text style={[styles.smallTxt, { color: black }]}>
                        {"Max deep meters:"}
                    </Text>
                    <TextInput
                        style={styles.smallInput2}
                        placeholder="13 meters"
                        placeholderTextColor={blue}
                    />
                </View>
                <View style={styles.sampleView}>
                    <Text style={[styles.smallTxt, { color: black }]}>
                        {"Type of dive:"}
                    </Text>
                    <View style={styles.dropDown}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Sea salinity',
                                value: null,
                                color: "#000"
                            }}
                            value={typeDive}
                            style={pickerStyle}
                            onValueChange={value => {
                                setTypeDive(value)
                            }}
                            items={data.diveType}
                        />
                    </View>
                </View>
                <View style={styles.sampleView}>
                    <Text style={[styles.smallTxt, { color: black }]}>
                        {"Water temperature:"}
                    </Text>
                    <View style={styles.dropDown}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Choose Temperature',
                                value: null,
                                color: "#000"
                            }}
                            value={temperature}
                            style={pickerStyle}
                            onValueChange={value => {
                                setTemperature(value)
                            }}
                            items={data.diveType}
                        />
                    </View>
                </View>
                <View style={styles.sampleView}>
                    <Text style={[styles.smallTxt, { color: black }]}>
                        {"Currents animals:"}
                    </Text>
                    <View style={styles.dropDown}>
                        <RNPickerSelect
                            placeholder={{
                                label: 'Choose Animal',
                                value: null,
                                color: "#000"
                            }}
                            value={animal}
                            style={pickerStyle}
                            onValueChange={value => {
                                setAnimal(value)
                            }}
                            items={data.diveType}
                        />
                    </View>
                </View>
            </View>
            <View style={{ height: heightPercentageToDP(7) }} />
            <Tab
                homeClick={() => props.navigation.dispatch(HomeAction)}
                profileClick={() => props.navigation.dispatch(profileAction)}
                settingClick={() => props.navigation.dispatch(settingAction)}
                mapClick={() => props.navigation.dispatch(mapAction)}
                notiClick={() => props.navigation.dispatch(notificationAction)}
            />
            {searchModal &&
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={searchModal}
                    onRequestClose={() => { console.log("Modal has been closed.") }}
                >
                    <View style={styles.modalView2}>
                        <View style={stylesProps.container}>
                            <SearchBar
                                placeholder="Search country..."
                                lightTheme
                                round
                                value={text}
                                onChangeText={text => searchFilterFunction(text)}
                                autoCorrect={false}
                                containerStyle={{ width: widthPercentageToDP(95) }}
                            //style={{}}
                            />
                            {!countryList || !countryList.length ?
                                <View />
                                : <FlatList
                                    data={!text ? countryList : countryList2}
                                    contentContainerStyle={{ alignItems: "center", marginBottom: heightPercentageToDP(5) }}
                                    keyExtractor={(item, index) => "Unique" + index}
                                    ItemSeparatorComponent={renderSeparator}
                                    renderItem={renderItem}
                                />}
                        </View>
                    </View>
                </Modal>
            }
            {cityModal &&
                <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={cityModal}
                    onRequestClose={() => { console.log("Modal has been closed.") }}
                >
                    <View style={styles.modalView2}>
                        <View style={stylesProps.container}>
                            <SearchBar
                                placeholder="Search city..."
                                lightTheme
                                round
                                value={text2}
                                onChangeText={text => cityFilterFunction(text)}
                                autoCorrect={false}
                                containerStyle={{ width: widthPercentageToDP(95) }}
                            //style={{}}
                            />
                            {!cityList || !cityList.length ?
                                <View />
                                : <FlatList
                                    data={!text2 ? cityList : cityList2}
                                    contentContainerStyle={{ alignItems: "center", marginBottom: heightPercentageToDP(5) }}
                                    keyExtractor={(item, index) => "Unique" + index}
                                    ItemSeparatorComponent={renderSeparator}
                                    renderItem={renderItem2}
                                />}
                        </View>
                    </View>
                </Modal>
            }
            {AuthLoading &&
                <ActivityIndicator
                    size="large"
                    color={black}
                    style={styles.loading}
                />
            }
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={black}
                    style={styles.loading}
                />
            }
        </View>
    )
}
const stylesProps = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        alignItems: "center",
        flex: 0
    },
    textStyle: {
        width: widthPercentageToDP(85),
        height: heightPercentageToDP(5),
        justifyContent: "center",
    },
    txt: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold"
    }

})
const pickerStyle = {
    inputIOS: {
        fontSize: widthPercentageToDP(3.7),
        color: blue,
        fontWeight: "300",
        fontFamily: "Montserrat-SemiBold",
        //marginTop: 6,
        //justifyContent:"center",
        paddingHorizontal: 10,
        //backgroundColor: 'red',
        borderRadius: 5,
    },
    placeholder: {
        color: blue,
        fontFamily: "Montserrat-SemiBold",
        fontSize: widthPercentageToDP(3.7),
    },
    inputAndroid: {
        fontSize: widthPercentageToDP(3.7),
        fontFamily: "Montserrat-SemiBold",
        color: blue,
        //paddingHorizontal: -10,
        //backgroundColor: 'red',
        //borderRadius: 5,
    },
    modalViewBottom: {
        backgroundColor: "#DCDCDC"
    }
};

export default NewScreen;