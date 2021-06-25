import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet, ActivityIndicator, Alert } from 'react-native'
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
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { SearchBar } from 'react-native-elements'
import { getCountryName } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';


const LogBook = (props) => {
    const dispatch = useDispatch();
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const countryData = useSelector((state) => state.user.countryData);
    const [isLoading, setIsLoading] = useState(false)
    const [isScuba, setScuba] = useState(false)
    const [isRebreader, setRebreader] = useState(false)
    const [isJacket, setJacket] = useState(false)
    const [isWing, setWing] = useState(false)
    const [is12, set12] = useState(false)
    const [is15, set15] = useState(false)
    const [isSteel, setSteel] = useState(false)
    const [isAluminum, setAluminum] = useState(false)
    const [isAir, setAir] = useState(false)
    const [isNitrox, setNitrox] = useState(false)
    const [myDate, setMyDate] = useState("")
    const [myTime, setMyTime] = useState("")
    const [country, setCountry] = useState("")
    const [text, setText] = useState("")
    const [countryList, setCountryList] = useState([])
    const [countryList2, setCountryList2] = useState([])
    const [city, setCity] = useState("")
    const [text2, setText2] = useState("")
    const [cityList, setCityList] = useState([])
    const [cityList2, setCityList2] = useState([])
    const [TimePickerModal, setTimePickerModal] = useState(false)
    const [DatePickerModal, setDatePickerModal] = useState(false)
    // new value for weather temperature
    const [weather1, setWeather1] = useState(false)
    const [weather2, setWeather2] = useState(false)
    const [weather3, setWeather3] = useState(false)
    const [weather4, setWeather4] = useState(false)
    const [weather5, setWeather5] = useState(false)
    const [weather6, setWeather6] = useState(false)
    const [weather7, setWeather7] = useState(false)
    const [weather8, setWeather8] = useState(false)
    //  new Value temperature value
    const [temperature, setTemperature] = useState("")
    const [visibility, setVisibility] = useState("")
    const [sweetWater, setSweetWater] = useState(false)
    const [saltWater, setSaltWater] = useState(false)
    // new value time Start 
    const [StartTime, setStartTime] = useState("")
    const [EndTime, setEndTime] = useState("")
    const [STartTimeModal, setSTartTimeModal] = useState(false)
    const [EndTimeModal, setEndTimeModal] = useState(false)
    const [mapModal, setMapModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [cityModal, setCityModal] = useState(false)
    const [location, setLocation] = useState("")
    // new data for suite 

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
    const imageModel = (({ item, index }) => {
        return (
            <View style={styles.modelView}>
                <FastImage
                    source={item.img}
                    style={styles.imgModel}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.title}>
                    {item.title}
                </Text>
                {/* <Text style={styles.date}>
                    {item.date}
                </Text> */}
            </View>
        )
    })
    const handleConfirm = (date) => {
        setMyTime(moment(date).format('HH:mm') + " horas")
        hideTimePicker();
    };
    const showTimePicker = () => {
        setTimePickerModal(true)
    };
    const hideTimePicker = () => {
        setTimePickerModal(false)
    };
    // for date function
    const handleConfirmDate = (date) => {
        setMyDate(moment(date).format('DD-MMM-YYYY'))
        hideDatePicker();
    };
    const showDatePicker = () => {
        setDatePickerModal(true)
    };
    const hideDatePicker = () => {
        setDatePickerModal(false)
    };
    // new function for start and time
    const handleConfirmStartTime = (date) => {
        setStartTime(moment(date).format('HH:mm') + " h")
        hideStartTimePicker();
    };
    const showStartTimePicker = () => {
        setSTartTimeModal(true)
    };
    const hideStartTimePicker = () => {
        setSTartTimeModal(false)
    };
    const handleConfirmEndTime = (date) => {
        setEndTime(moment(date).format('HH:mm') + " h")
        hideEndTimePicker();
    };
    const showEndTimePicker = () => {
        setEndTimeModal(true)
    };
    const hideEndTimePicker = () => {
        setEndTimeModal(false)
    };
    const toggleMap = () => {
        setMapModal(!mapModal)
    }
    const toggleSearch = () => {
        setSearchModal(!searchModal)
    }
    const toggleCity = () => {
        setCityModal(!cityModal)
    }
    const _onWeatherSelection = (value) => {
        if (value == 1) {
            setWeather1(true)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
        } else if (value == 2) {
            setWeather1(false)
            setWeather2(true)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
        } else if (value == 3) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(true)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
        } else if (value == 4) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(true)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
        } else if (value == 5) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(true)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
        } else if (value == 6) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(true)
            setWeather7(false)
            setWeather8(false)
        } else if (value == 7) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(true)
            setWeather8(false)
        } else if (value == 8) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(true)
        }
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
            <KeyboardAwareScrollView>
                <View style={{ flex: 1 }}>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"LOCATION"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <View style={[styles.logView, {
                        height: heightPercentageToDP(25),
                        marginTop: heightPercentageToDP(2),
                        justifyContent: "center",
                    }]}>
                        <View style={[styles.innerLogView, { height: heightPercentageToDP(20) }]}>
                            <View style={styles.left}>
                                <View>
                                    <Text style={[styles.smallTxt, { color: black }]}>
                                        {"Fecha:"}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => showDatePicker()}
                                    >
                                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                                            {!myDate ? "DD-MM-YYYY" : myDate}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={DatePickerModal}
                                        mode="date"
                                        is24Hour={true}
                                        onConfirm={handleConfirmDate}
                                        onCancel={hideDatePicker}
                                    />
                                </View>
                                <View style={{ marginTop: 10, }}>
                                    <Text style={[styles.smallTxt, { color: black }]}>
                                        {"Hora:"}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => showTimePicker()}
                                    >
                                        <Text style={[styles.smallTxt, { color: blue2 }]}>
                                            {!myTime ? "HH-MM horas" : myTime}
                                        </Text>
                                    </TouchableOpacity>
                                    <DateTimePickerModal
                                        isVisible={TimePickerModal}
                                        mode="time"
                                        is24Hour={true}
                                        onConfirm={handleConfirm}
                                        onCancel={hideTimePicker}
                                    />
                                </View>
                                <View style={{ marginTop: 10, }}>
                                    <Text style={[styles.smallTxt, { color: black }]}>
                                        {"Lugar de inmersion :"}
                                    </Text>
                                    <TextInput
                                        style={[styles.smallInput, { paddingTop: 0, paddingBottom: 0, }]}
                                        placeholder="Lugar de inmersion"
                                        placeholderTextColor={blue}
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
                                    onPress={() => !country ? Alert.alert("", "Please select the Country name first")
                                        : toggleCity()
                                    }
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
                        <TouchableOpacity
                            onPress={() => toggleMap()}
                            style={[styles.sideButton, { top: "40%" }]}>
                            <FastImage
                                source={require('../../Images/44.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"ENVIRONMENT"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <View style={[styles.logView, {
                        height: heightPercentageToDP(30),
                        marginTop: heightPercentageToDP(2),
                        //backgroundColor: blue2
                    }]}>
                        <View style={{ marginTop: heightPercentageToDP(0), flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(1)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather1 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/55.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(2)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather2 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/48.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(3)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather3 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/54.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(4)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather4 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/53.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: heightPercentageToDP(1), flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(5)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather5 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/52.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(6)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather6 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/50.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(7)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather7 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/49.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => _onWeatherSelection(8)}
                                style={[styles.weatherBtn, {
                                    backgroundColor: weather8 ? blue : "#cccccc"
                                }]}>
                                <FastImage
                                    source={require('../../Images/51.png')}
                                    resizeMode={FastImage.resizeMode.cover}
                                    style={{ width: "90%", height: "90%" }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", }}>
                            <Text style={[styles.smallTxt, { color: black, marginLeft: 15, }]}>
                                {"Temperatura del agua : "}
                            </Text>
                            <TextInput
                                style={[styles.smallInput, { height: "70%", paddingTop: 0, paddingBottom: 0, }]}
                                placeholder="10 *C"
                                placeholderTextColor={blue}
                                //keyboardType="numeric"
                                value={temperature}
                                //onValueChange={}
                                onChangeText={text => setTemperature(text)}
                            />
                        </View>
                        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", }}>
                            <Text style={[styles.smallTxt, { color: black, marginLeft: 15, }]}>
                                {"Visibilidad : "}
                            </Text>
                            <TextInput
                                style={[styles.smallInput, { height: "70%", paddingTop: 0, paddingBottom: 0, }]}
                                placeholder="5 metros"
                                placeholderTextColor={blue}
                                keyboardType="numeric"
                                value={visibility}
                                //onValueChange={}
                                onChangeText={text => setVisibility(text)}
                            />
                        </View>
                        <Text
                            onPress={() => {
                                setSweetWater(true)
                                setSaltWater(false)
                            }}
                            style={[styles.smallTxt, { color: sweetWater ? blue2 : black, marginLeft: 15, marginTop: 10 }]}>
                            {"Agua dulce / "}
                            <Text
                                onPress={() => {
                                    setSweetWater(false)
                                    setSaltWater(true)
                                }}
                                style={[styles.smallTxt, { color: saltWater ? blue2 : black }]}>
                                {"Agua salada"}
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"IMMERSION"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <View style={[styles.logView, {
                        height: heightPercentageToDP(25),
                        marginTop: heightPercentageToDP(2),
                    }]}>
                        <View style={[styles.innerLogView, { height: heightPercentageToDP(15), marginTop: heightPercentageToDP(2), justifyContent: "space-between" }]}>
                            <View style={[styles.left, { width: "48%", backgroundColor: blue2, borderRadius: widthPercentageToDP(6), flexDirection: "row", alignItems: "center" }]}>
                                <FastImage
                                    source={require('../../Images/56.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={{ width: "42%", height: "59%", marginLeft: 8 }}
                                />
                                <View style={{ width: "50%", height: "70%", marginLeft: 5 }}>
                                    <Text style={[styles.tinyText, { color: black }]}>
                                        {"Bares inciales:"}
                                    </Text>
                                    <TextInput
                                        style={styles.tinyInput}
                                        placeholder={"0"}
                                        placeholderTextColor={white}
                                        keyboardType="number-pad"
                                    />
                                    <Text style={[styles.tinyText, { color: black }]}>
                                        {"Bares finales:"}
                                    </Text>
                                    <TextInput
                                        style={styles.tinyInput}
                                        placeholder={"70"}
                                        placeholderTextColor={white}
                                        keyboardType="number-pad"
                                    />
                                    <Text style={[styles.tinyText, { color: black }]}>
                                        {"Consumidos:"}
                                    </Text>
                                    <Text style={[styles.tinyText, { color: white }]}>
                                        {"130"}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.right, { width: "48%", backgroundColor: blue2, borderRadius: widthPercentageToDP(6), flexDirection: "row", alignItems: "center" }]}>
                                <FastImage
                                    source={require('../../Images/57.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={{ width: "38%", height: "60%", marginLeft: 8 }}
                                />
                                <View style={{ width: "50%", height: "70%", marginLeft: 5 }}>
                                    <Text style={[styles.tinyText, { color: black }]}>
                                        {"Hora inicio:"}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => showStartTimePicker()}
                                    >
                                        <Text style={[styles.tinyText, { color: white }]}>
                                            {!StartTime ? "00:00 h" : StartTime}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.tinyText, { color: black }]}>
                                        {"Hora fin:"}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => showEndTimePicker()}
                                    >
                                        <Text style={[styles.tinyText, { color: white }]}>
                                            {!EndTime ? "00:00 h" : EndTime}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.tinyText, { color: black }]}>
                                        {"Tiempo de fondo:"}
                                    </Text>
                                    <Text style={[styles.tinyText, { color: white }]}>
                                        {"01:11"}
                                    </Text>
                                    {/* Modal View */}
                                    <DateTimePickerModal
                                        isVisible={STartTimeModal}
                                        mode="time"
                                        is24Hour={true}
                                        onConfirm={handleConfirmStartTime}
                                        onCancel={hideStartTimePicker}
                                    />
                                    <DateTimePickerModal
                                        isVisible={EndTimeModal}
                                        mode="time"
                                        is24Hour={true}
                                        onConfirm={handleConfirmEndTime}
                                        onCancel={hideEndTimePicker}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                            <Text style={[styles.smallTxt, { color: black, marginLeft: 15 }]}>
                                {"Profundidad Maxima : "}
                            </Text>
                            <TextInput
                                style={styles.tinyInput2}
                                placeholder={"0 metros"}
                                placeholderTextColor={blue}
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", height: "20%", }}>
                            <Text style={[styles.smallTxt, { color: black }]}>
                                {"Tipo de inmersion :"}
                            </Text>
                            <View style={{ width: "50%", height: "100%", justifyContent: "center" }}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'inmersion',
                                        value: null,
                                        color: "#000"
                                    }}
                                    value={city}
                                    style={pickerStyle}
                                    onValueChange={value => {
                                        setCity(value)
                                    }}
                                    items={data.diveType}
                                />
                            </View>
                        </View>

                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"DIVING CENTER"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <View style={[styles.logView, {
                        height: heightPercentageToDP(79),
                        marginTop: heightPercentageToDP(2),
                        //backgroundColor: blue2
                    }]}>
                        <View style={{ width: "100%", height: heightPercentageToDP(22), flexDirection: "row", alignItems: "center", marginTop: heightPercentageToDP(2), justifyContent: "space-between" }}>
                            <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                                <TouchableOpacity
                                    style={{ width: "100%", height: "65%", }}
                                >
                                    <FastImage
                                        source={require('../../Images/79.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                    {"Traje"}
                                </Text>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                    {"humedo"}
                                </Text>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                    {"7 mm"}
                                </Text>
                            </View>
                            <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                                <TouchableOpacity
                                    style={{ width: "100%", height: "65%", }}
                                >
                                    <FastImage
                                        source={require('../../Images/76.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                    {"Traje"}
                                </Text>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                    {"humedo"}
                                </Text>
                            </View>
                            <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                                <TouchableOpacity
                                    style={{ width: "100%", height: "65%", }}
                                >
                                    <FastImage
                                        source={require('../../Images/74.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                    {"Traje"}
                                </Text>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                    {"humedo"}
                                </Text>
                            </View>
                            <View style={{ width: "25%", height: "100%", alignItems: "center", }}>
                                <TouchableOpacity
                                    style={{ width: "100%", height: "65%", }}
                                >
                                    <FastImage
                                        source={require('../../Images/72.png')}
                                        resizeMode={FastImage.resizeMode.contain}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                    {"Traje"}
                                </Text>
                                <Text style={[styles.tinyText, { color: blue2, textAlign: "center" }]}>
                                    {"humedo"}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.innerLogView2, {}]}>
                            <FastImage
                                source={require('../../Images/149.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{ width: "25%", height: "70%", marginLeft: 8 }}
                            />
                            <View style={{ width: "70%", height: "70%", marginLeft: 5, }}>
                                <Text
                                    onPress={() => {
                                        setScuba(true)
                                        setRebreader(false)
                                    }}
                                    style={[styles.smallTxt, { color: isScuba ? white : black, marginLeft: 15, marginTop: 10 }]}>
                                    {"Scuba / "}
                                    <Text
                                        onPress={() => {
                                            setScuba(false)
                                            setRebreader(true)
                                        }}
                                        style={[styles.smallTxt, { color: isRebreader ? white : black }]}>
                                        {"Rebreader"}
                                    </Text>
                                </Text>
                                {isScuba &&
                                    <Text
                                        onPress={() => {
                                            setJacket(true)
                                            setWing(false)
                                        }}
                                        style={[styles.smallTxt, { color: isJacket ? white : black, marginLeft: 15, marginTop: 10 }]}>
                                        {"Jacket / "}
                                        <Text
                                            onPress={() => {
                                                setJacket(false)
                                                setWing(true)
                                            }}
                                            style={[styles.smallTxt, { color: isWing ? white : black }]}>
                                            {"Wing"}
                                        </Text>
                                    </Text>
                                }
                            </View>
                        </View>
                        {isScuba &&
                            <View style={styles.innerLogView2}>
                                <FastImage
                                    source={require('../../Images/56.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={{ width: "30%", height: "70%", marginLeft: 8 }}
                                />
                                <View style={{ width: "50%", height: "70%", marginLeft: 5 }}>
                                    <Text style={[styles.smallTxt, { color: black, marginLeft: 15, marginTop: 10 }]}>
                                        {"Botella "}
                                        <Text
                                            onPress={() => {
                                                set12(true)
                                                set15(false)
                                            }}
                                            style={[styles.smallTxt, { color: is12 ? white : black }]}>
                                            {"12L / "}
                                            <Text
                                                onPress={() => {
                                                    set12(false)
                                                    set15(true)
                                                }}
                                                style={[styles.smallTxt, { color: is15 ? white : black }]}
                                            >
                                                {"15L"}
                                            </Text>
                                        </Text>
                                    </Text>
                                    <Text
                                        onPress={() => {
                                            setSteel(true)
                                            setAluminum(false)
                                        }}
                                        style={[styles.smallTxt, { color: isSteel ? white : black, marginLeft: 15, marginTop: 5 }]}>
                                        {"Steel / "}
                                        <Text
                                            onPress={() => {
                                                setSteel(false)
                                                setAluminum(true)
                                            }}
                                            style={[styles.smallTxt, { color: isAluminum ? white : black }]}>
                                            {"Aluminum"}
                                        </Text>
                                    </Text>
                                    <Text
                                        onPress={() => {
                                            setAir(true)
                                            setNitrox(false)
                                        }}
                                        style={[styles.smallTxt, { color: isAir ? white : black, marginLeft: 15, marginTop: 5 }]}>
                                        {"Air / "}
                                        <Text
                                            onPress={() => {
                                                setAir(false)
                                                setNitrox(true)
                                            }}
                                            style={[styles.smallTxt, { color: isNitrox ? white : black }]}>
                                            {"Nitrox"}
                                        </Text>
                                    </Text>
                                    {isNitrox &&
                                        <View style={{ flexDirection: "row", alignItems: "center", height: "30%", width: "100%", marginLeft: 15, }}>
                                            <Text style={[styles.smallTxt, { color: black }]}>
                                                {"%"}
                                            </Text>
                                            <TextInput
                                                style={[styles.tinyInput2, { height: "100%", marginLeft: widthPercentageToDP(3), color: white, width: "30%" }]}
                                                placeholder="xxx"
                                                placeholderTextColor={white}
                                                keyboardType="number-pad"
                                            />
                                            <Text style={[styles.smallTxt, { color: black }]}>
                                                {"oxygen"}
                                            </Text>
                                        </View>}
                                </View>
                            </View>}
                        <View style={[styles.innerLogView, { height: heightPercentageToDP(8), marginTop: 10, justifyContent: "space-between", width: widthPercentageToDP(80) }]}>
                            <TouchableOpacity style={{ width: "12%", height: "90%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/62.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "14%", height: "85%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/59.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "14%", height: "85%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/70.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "13%", height: "90%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/69.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.innerLogView, { height: heightPercentageToDP(8), marginTop: 20, justifyContent: "space-between", width: widthPercentageToDP(80) }]}>
                            <TouchableOpacity style={{ width: "13%", height: "90%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/66.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "13%", height: "90%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/60.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "17%", height: "90%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/64.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: "13%", height: "90%" }}>
                                <FastImage
                                    style={{ width: "100%", height: "100%" }}
                                    source={require('../../Images/76.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <Text style={[styles.tinyText, { color: "#a9a9a9", textAlign: "center", marginTop: 5 }]}>
                                    {"Text"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"HEADING"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <FlatList
                        data={data.heading}
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        listKey={(item, index) => `_key${index.toString()}`}
                        //style={{ alignSelf: "center" }}
                        keyExtractor={(item, index) => "unique" + index}
                        renderItem={imageModel}
                    />
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"ANIMAL"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <FlatList
                        data={data.animal}
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        listKey={(item, index) => `_key${index.toString()}`}
                        //style={{ alignSelf: "center" }}
                        keyExtractor={(item, index) => "unique" + index}
                        renderItem={imageModel}
                    />
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"TEAM"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <FlatList
                        data={data.team}
                        showsVerticalScrollIndicator={false}
                        numColumns={4}
                        listKey={(item, index) => `_key${index.toString()}`}
                        //style={{ alignSelf: "center" }}
                        keyExtractor={(item, index) => "unique" + index}
                        renderItem={imageModel}
                    />
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"CLASSMATES"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <View style={styles.writeView}>
                        <View style={styles.modelView}>
                            <FastImage
                                source={require('../../Images/fish2.jpg')}
                                style={styles.imgModel}
                                resizeMode={FastImage.resizeMode.cover}
                            />
                            <Text style={styles.title}>
                                {"Madrid Buceo"}
                            </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Sello"
                            placeholderTextColor={black}
                            textAlign="center"
                        />
                    </View>
                    <View style={styles.titleView}>
                        <Text style={styles.titleTxt}>
                            {"HEADING"}
                        </Text>
                        <FastImage
                            source={require('../../Images/line_right.png')}
                            style={styles.line}
                            resizeMode={FastImage.resizeMode.stretch}
                        />
                    </View>
                    <TextInput
                        style={styles.input2}
                        placeholder="Observaciones"
                        placeholderTextColor={black}
                        textAlign="center"
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => { }}
                    >
                        <Text style={styles.btnText}>
                            {"GUARDAR"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
            <View style={{ height: heightPercentageToDP(7) }} />
            <Tab
                homeClick={() => props.navigation.dispatch(HomeAction)}
                profileClick={() => props.navigation.dispatch(profileAction)}
                settingClick={() => props.navigation.dispatch(settingAction)}
                mapClick={() => props.navigation.dispatch(mapAction)}
                notiClick={() => props.navigation.dispatch(notificationAction)}
            />
            {mapModal &&
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={mapModal}
                    onRequestClose={() => { console.log("Modal has been closed.") }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.map}>
                            <MapView
                                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={styles.map2}
                                region={{
                                    // latitude: parseFloat(this.state.lat),
                                    // longitude: parseFloat(this.state.long),
                                    // latitudeDelta: 0.0043,
                                    // longitudeDelta: 0.0034
                                    latitude: 40.416775,
                                    longitude: -3.703790,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                                onPress={(e) => setLocation(e.nativeEvent.coordinate)}
                            >
                                {!location ?
                                    <View />
                                    : <Marker
                                        coordinate={{
                                            latitude: parseFloat(location.latitude),
                                            longitude: parseFloat(location.longitude),
                                        }}
                                    />
                                }
                            </MapView>
                            <TouchableOpacity
                                style={styles.mapCloseBtn}
                                onPress={() => toggleMap()}
                            >
                                <EvilIcons
                                    name="close"
                                    color="#fff"
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
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
        paddingHorizontal: 10,
        //backgroundColor: 'red',
        borderRadius: 5,
    },
    modalViewBottom: {
        backgroundColor: "#DCDCDC"
    }
};


export default LogBook;