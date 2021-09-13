import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet, ActivityIndicator, Alert, PermissionsAndroid } from 'react-native'
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
import { getCountryName, getAllList, postPeciosList, postGenreList, postFriendList, postLogbookImg, updateLogbookData, getDiveCenterDetail } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import Strings from '../../Translation'
import Fontisto from 'react-native-vector-icons/Fontisto'
import ImagePicker from 'react-native-image-crop-picker';
import Picker from '../Profile/Picker'



const LogBook = (props) => {
    const dispatch = useDispatch();
    const newData = props.navigation.getParam('data', '123')
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const countryData = useSelector((state) => state.user.countryData);
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    // new value for suite
    const [suit1, setSuit1] = useState(newData.suitCode === "77" ? true : false)
    const [suit2, setSuit2] = useState(newData.suitCode === "78" ? true : false)
    const [suit3, setSuit3] = useState(newData.suitCode === "75" ? true : false)
    const [suit4, setSuit4] = useState(newData.suitCode === "73" ? true : false)
    const [suitCode, setSuitCode] = useState(newData.suitCode)
    const [suitCode78, setSuitCode78] = useState(!newData.suitCode78 ? "" : newData.suitCode78)
    // new value for dive center items
    const [diveItem1, setDiveItem1] = useState(newData.diveItem1)
    const [diveItem2, setDiveItem2] = useState(newData.diveItem2)
    const [diveItem3, setDiveItem3] = useState(newData.diveItem3)
    const [diveItem4, setDiveItem4] = useState(newData.diveItem4)
    const [diveItem5, setDiveItem5] = useState(newData.diveItem5)
    const [diveItem6, setDiveItem6] = useState(newData.diveItem6)
    const [diveItem7, setDiveItem7] = useState(newData.diveItem7)
    const [diveItem8, setDiveItem8] = useState(newData.diveItem8)
    // new value for weather temperature
    const [weather1, setWeather1] = useState(newData.weather === '55' ? true : false)
    const [weather2, setWeather2] = useState(newData.weather === '48' ? true : false)
    const [weather3, setWeather3] = useState(newData.weather === '54' ? true : false)
    const [weather4, setWeather4] = useState(newData.weather === '53' ? true : false)
    const [weather5, setWeather5] = useState(newData.weather === '52' ? true : false)
    const [weather6, setWeather6] = useState(newData.weather === '50' ? true : false)
    const [weather7, setWeather7] = useState(newData.weather === '49' ? true : false)
    const [weather8, setWeather8] = useState(newData.weather === '51' ? true : false)
    const [weatherCode, setWeatherCode] = useState(newData.weather)
    // value for rest items
    const [waterType, setWaterType] = useState(newData.waterType)
    const [isScuba, setScuba] = useState(newData.scuba)
    const [isRebreader, setRebreader] = useState(newData.rebreader)
    const [isJacket, setJacket] = useState(newData.jacket)
    const [isWing, setWing] = useState(newData.wings)
    const [is12, set12] = useState(newData.bottle12L)
    const [is15, set15] = useState(newData.bottle15L)
    const [isSteel, setSteel] = useState(newData.steel)
    const [isAluminum, setAluminum] = useState(newData.aluminium)
    const [isAir, setAir] = useState(newData.air)
    const [isNitrox, setNitrox] = useState(newData.nitrox)
    const [myDate, setMyDate] = useState(newData.date)
    const [myTime, setMyTime] = useState(newData.time)
    const [StartTime, setStartTime] = useState(newData.startTime)
    const [EndTime, setEndTime] = useState(newData.endTime)
    const [country, setCountry] = useState(newData.country)
    const [typeImpresion, setTypeImpresion] = useState(!newData.typeImression ? "" : newData.typeImression)
    const [maxDeep, setMaxDeep] = useState(newData.maxDeep)
    const [startingBar, setStartingBar] = useState(newData.startBar)
    const [endBar, setEndBar] = useState(newData.endBar)
    const [immersionSite, setImmersionSite] = useState(newData.immersionSite)
    const [opinion, setOpinion] = useState(newData.opinion)
    const [oxygen, setOxygen] = useState(newData.oxygen)
    const [center, setCenter] = useState(newData.center)
    const [centerId, setCenterId] = useState(!newData.centerId ? "" : newData.centerId)
    const [city, setCity] = useState(newData.city)
    const [imagePath, setPath] = useState(newData.image)
    // new value fo logbook
    const [timeDiff, setTimeDiff] = useState(newData.timeDiff)
    const [poblation, setPoblation] = useState(newData.poblation)
    const [type, setType] = useState(newData.type)
    const [current, setCurrent] = useState(newData.current)
    const [access, setAccess] = useState(newData.access)
    const [ballast, setBallast] = useState(newData.ballast)
    const [bottles, setBottles] = useState(newData.bottles)
    const [material, setMaterial] = useState(newData.material)
    const [mix, setMix] = useState(newData.mix)
    const [trimMix1, setTrimMix1] = useState(newData.trimMix1)
    const [trimMix2, setTrimMix2] = useState(newData.trimMix2)
    const [centerTexts, setCenterTexts] = useState(newData.centerTexts)
    // new text values for Genro, Pecios and team selections
    const [peciosText, setPeciosText] = useState("")
    const [animalText, setAnimalText] = useState("")
    const [teamText, setTeamText] = useState("")
    const [centerText, setCenterText] = useState("")
    const [text2, setText2] = useState("")
    const [text, setText] = useState("")
    //  new Value temperature value
    const [temperature, setTemperature] = useState(newData.temperature)
    const [visibility, setVisibility] = useState(newData.visibility)
    const [sweetWater, setSweetWater] = useState(newData.waterType === 'sweet water' ? true : false)
    const [saltWater, setSaltWater] = useState(newData.waterType === 'salt water' ? true : false)
    // new value time Start 
    // all Modal switch handle here with default values
    const [STartTimeModal, setSTartTimeModal] = useState(false)
    const [EndTimeModal, setEndTimeModal] = useState(false)
    const [mapModal, setMapModal] = useState(false)
    const [searchModal, setSearchModal] = useState(false)
    const [cityModal, setCityModal] = useState(false)
    const [peciosModal, setPeciosModal] = useState(false)
    const [animalModal, setAnimalModal] = useState(false)
    const [teamModal, setTeamModal] = useState(false)
    const [centerModal, setCenterModal] = useState(false)
    const [TimePickerModal, setTimePickerModal] = useState(false)
    const [DatePickerModal, setDatePickerModal] = useState(false)
    const [pickerOption, setOption] = useState(false)
    // 
    const [location, setLocation] = useState(newData.location)
    const [response, setResponse] = useState("")
    // tem array for filter searches
    const [cityList, setCityList] = useState([])
    const [cityList2, setCityList2] = useState([])
    const [tempPecios, settempPecios] = useState([])
    const [tempGenre, settempGenre] = useState([])
    const [tempTeam, settempTeam] = useState([])
    const [tempCenter, setTempCenter] = useState([])
    const [countryList, setCountryList] = useState([])
    const [countryList2, setCountryList2] = useState([])

    useEffect(() => {
        dispatch(getCountryName())
        saveAllListData()
    }, [])
    useEffect(() => {
        setCountryList(countryData)
    }, [countryData])
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        if (country) {
            getCityName(country)
        }
    }, [])
    // useEffect(() => {
    //     if (newData) {
    //         setResponse(newData)
    //     }
    // }, [newData])
    const _onSubmit = () => {
        postLogbookApi()
        // console.log("Pecios", response.pecios)
        // console.log("Animal", response.genres)
        // console.log("Teams", response.users)
    }
    // Api response save functions
    const getCenterDetailApi = async (id) => {
        setIsLoading(true)
        await getDiveCenterDetail(id, login.data.id)
        await setIsLoading(false)
    }
    const postLogbookApi = async () => {
        setIsLoading(true)
        await updateLogbookData(
            country,
            city,
            immersionSite,
            myDate,
            myTime,
            location,
            imagePath,
            weatherCode,
            temperature,
            visibility,
            waterType,
            startingBar,
            endBar,
            StartTime,
            EndTime,
            maxDeep,
            typeImpresion,
            suitCode,
            suitCode78,
            isScuba,
            isRebreader,
            isJacket,
            isWing,
            is12,
            is15,
            isSteel,
            isAluminum,
            isAir,
            isNitrox,
            oxygen,
            diveItem1,
            diveItem2,
            diveItem3,
            diveItem4,
            diveItem5,
            diveItem6,
            diveItem7,
            diveItem8,
            response.pecios,
            response.genres,
            response.users,
            center,
            centerId,
            opinion,
            login.data.id,
            newData.id,
            poblation,
            type,
            current,
            access,
            ballast,
            bottles,
            material,
            mix,
            trimMix1,
            trimMix2,
            timeDiff,
            centerTexts
        )
        await setIsLoading(false)
    }
    const saveAllListData = async () => {
        setIsLoading(true)
        let menuData = await getAllList(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const postPeciosApi = async (id, value) => {
        setIsLoading(true)
        let menuData = await postPeciosList(login.data.id, id, value)
        //await setResponse(prevMovies => ({ ...prevMovies, menuData }))
        await setResponse(menuData)
        await settempPecios(menuData.pecios)
        await setIsLoading(false)
    }
    const postGenreApi = async (id, value) => {
        setIsLoading(true)
        let menuData = await postGenreList(login.data.id, id, value)
        //await setResponse(prevMovies => ({ ...prevMovies, menuData }))
        await setResponse(menuData)
        await settempGenre(menuData.genres)
        await setIsLoading(false)
    }
    const postFriendApi = async (id, value) => {
        setIsLoading(true)
        let menuData = await postFriendList(login.data.id, id, value)
        //await setResponse(prevMovies => ({ ...prevMovies, menuData }))
        await setResponse(menuData)
        await settempTeam(menuData.users)
        await setIsLoading(false)
    }
    const postImageApi = async (data) => {
        setIsLoading(true)
        let menuData = await postLogbookImg(data)
        await setPath(menuData.data)
        await setIsLoading(false)
    }
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
    // date functions
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
        var mins = moment.utc(moment(moment(date).format('HH:mm'), "HH:mm").diff(moment(StartTime, "HH:mm"))).format("HH:mm")
        setTimeDiff(mins)
    };
    const showEndTimePicker = () => {
        setEndTimeModal(true)
    };
    const hideEndTimePicker = () => {
        setEndTimeModal(false)
    };
    // toggle functions
    const toggleMap = () => {
        setMapModal(!mapModal)
    }
    const toggleSearch = () => {
        setSearchModal(!searchModal)
    }
    const toggleCity = () => {
        setCityModal(!cityModal)
    }
    const togglePecios = () => {
        setPeciosModal(!peciosModal)
    }
    const toggleAnimal = () => {
        setAnimalModal(!animalModal)
    }
    const toggleTeam = () => {
        setTeamModal(!teamModal)
    }
    const toggleCenter = () => {
        setCenterModal(!centerModal)
    }
    const toggleOption = () => {
        setOption(!pickerOption)
    }
    //  weather selection switch
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
            setWeatherCode("55")
        } else if (value == 2) {
            setWeather1(false)
            setWeather2(true)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
            setWeatherCode("48")
        } else if (value == 3) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(true)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
            setWeatherCode("54")
        } else if (value == 4) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(true)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
            setWeatherCode("53")
        } else if (value == 5) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(true)
            setWeather6(false)
            setWeather7(false)
            setWeather8(false)
            setWeatherCode("52")
        } else if (value == 6) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(true)
            setWeather7(false)
            setWeather8(false)
            setWeatherCode("50")
        } else if (value == 7) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(true)
            setWeather8(false)
            setWeatherCode("49")
        } else if (value == 8) {
            setWeather1(false)
            setWeather2(false)
            setWeather3(false)
            setWeather4(false)
            setWeather5(false)
            setWeather6(false)
            setWeather7(false)
            setWeather8(true)
            setWeatherCode("51")
        }
    }
    // filter functions
    const searchPeciosFilterFunction = text => {
        let temList = response.pecios;
        const newData = temList.filter(item => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        settempPecios(newData)
        setPeciosText(text)
    };
    const searchAnimalFilterFunction = text => {
        let temList = response.genres;
        const newData = temList.filter(item => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        settempGenre(newData)
        setAnimalText(text)
    };
    const searchTeamFilterFunction = text => {
        let temList = response.users;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        settempTeam(newData)
        setTeamText(text)
    };
    const searchCenterFilterFunction = text => {
        let temList = response.centers;
        const newData = temList.filter(item => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        //setCountryList(data => ([data, ...newData]));
        setTempCenter(newData)
        setCenterText(text)
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
    // filter functions for multiple selections
    const renderSelection = (({ item, index }) => {
        return (
            <View style={stylesProps.imageView}>
                <View style={stylesProps.row}>
                    <FastImage
                        source={{ uri: item.image }}
                        style={styles.imgModel}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={stylesProps.title}>
                        {item.title}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (item.isSelected === 'no') {
                            postPeciosApi(item.id, "yes")
                        } else {
                            postPeciosApi(item.id, "no")
                        }
                    }}>
                    {item.isSelected === 'no' ?
                        <Fontisto
                            name="checkbox-passive"
                            color={blue}
                            size={30}
                        />
                        : <Fontisto
                            name="checkbox-active"
                            color={blue}
                            size={30}
                        />
                    }
                </TouchableOpacity>
            </View>
        )
    })
    const renderAnimalSelection = (({ item, index }) => {
        return (
            <View style={stylesProps.imageView}>
                <View style={stylesProps.row}>
                    <FastImage
                        source={{ uri: item.image }}
                        style={styles.imgModel}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                    <Text style={stylesProps.title}>
                        {item.title}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (item.isSelected === 'no') {
                            postGenreApi(item.id, "yes")
                        } else {
                            postGenreApi(item.id, "no")
                        }
                    }}>
                    {item.isSelected === 'no' ?
                        <Fontisto
                            name="checkbox-passive"
                            color={blue}
                            size={30}
                        />
                        : <Fontisto
                            name="checkbox-active"
                            color={blue}
                            size={30}
                        />
                    }
                </TouchableOpacity>
            </View>
        )
    })
    const renderTeamSelection = (({ item, index }) => {
        return (
            <View style={stylesProps.imageView}>
                <View style={stylesProps.row}>
                    {!item.image ?
                        <FastImage
                            source={require('../../Images/profile_img5.png')}
                            style={styles.imgModel}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        : <FastImage
                            source={{ uri: item.image }}
                            style={styles.imgModel}
                            resizeMode={FastImage.resizeMode.cover}
                        />}
                    <Text style={stylesProps.title}>
                        {item.name}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (item.isSelected === 'no') {
                            postFriendApi(item.id, "yes")
                        } else {
                            postFriendApi(item.id, "no")
                        }
                    }}>
                    {item.isSelected === 'no' ?
                        <Fontisto
                            name="checkbox-passive"
                            color={blue}
                            size={30}
                        />
                        : <Fontisto
                            name="checkbox-active"
                            color={blue}
                            size={30}
                        />
                    }
                </TouchableOpacity>
            </View>
        )
    })
    const renderCenterItem = (({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setCenter(item.logo)
                    setCenterId(item.id)
                    toggleCenter()
                }}
                style={stylesProps.textStyle}>
                <Text style={stylesProps.txt}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    })
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
    const imageModel = (({ item, index }) => {
        if (item.isSelected === 'yes') {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (item.activities) {
                            props.navigation.navigate("DiveCenter", {
                                data: item
                            })
                        } else if (item.qualities) {
                            props.navigation.navigate('Detail', {
                                data: item
                            })
                        } else if (item.fcm) {
                            console.log("Users");
                        } else {
                            props.navigation.navigate("PeciosDetail", {
                                data: item
                            })
                        }
                    }}
                    style={styles.modelView}>
                    {!item.image ?
                        <FastImage
                            source={require('../../Images/profile_img5.png')}
                            style={styles.imgModel}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        : <FastImage
                            source={{ uri: item.image }}
                            style={styles.imgModel}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    }
                    <Text style={styles.title}>
                        {!item.title ? item.name : item.title}
                    </Text>
                </TouchableOpacity>
            )
        }

    })
    // camera functions
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    'title': 'Pecedex',
                    'message': 'Pecedex App needs access to your camera ' +
                        'so you can take pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                _onLunchCamera();
            } else {
                console.log("Camera permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }
    const _onLunchCamera = () => {
        let data = "";
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(response => {
            console.log(response)
            data = {
                'uri': response.path,
                'type': response.mime,
                'name': Date.now() + '_Pecedex.png',
            }
            postImageApi(data);
            setOption(false);
            //console.log(data)
        })
            .catch(err => {
                console.log(err);
            })
    }
    const _onLunchGallery = () => {
        let data = "";
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            data = {
                'uri': image.path,
                'type': image.mime,
                'name': Date.now() + '_Pecedex.png',
            }
            postImageApi(data);
            setOption(false);
            //console.log(data)
        }).catch(error => {
            console.log(error);
        })
    }
    // drop down options
    const diveType = [
        {
            label: Strings.Baptism,
            value: Strings.Baptism
        },
        {
            label: Strings.Diving_Course,
            value: Strings.Diving_Course
        },
        {
            label: Strings.Naturalistic_Dive,
            value: Strings.Naturalistic_Dive
        },
        {
            label: Strings.Wreck_Dive,
            value: Strings.Wreck_Dive
        },
        {
            label: Strings.Cave_Dive,
            value: Strings.Cave_Dive
        },
        {
            label: Strings.Cold_Weather_Dive,
            value: Strings.Cold_Weather_Dive
        },
        {
            label: Strings.Night_Dive,
            value: Strings.Night_Dive
        },
        {
            label: Strings.Others,
            value: Strings.Others
        }

    ]
    const Type = [
        {
            label: Strings.sea,
            value: Strings.sea
        },
        {
            label: Strings.river,
            value: Strings.river
        },
        {
            label: Strings.other,
            value: Strings.other
        },

    ]
    const Current = [
        {
            label: Strings.none,
            value: Strings.none
        },
        {
            label: Strings.slight,
            value: Strings.slight
        },
        {
            label: Strings.moderate,
            value: Strings.moderate
        },
        {
            label: Strings.strong,
            value: Strings.strong
        },

    ]
    const Access = [
        {
            label: Strings.coast,
            value: Strings.coast
        },
        {
            label: Strings.boat,
            value: Strings.boat
        },
        {
            label: Strings.other,
            value: Strings.other
        },
    ]
    const Material = [
        {
            label: Strings.Steel,
            value: Strings.Steel
        },
        {
            label: Strings.Aluminum,
            value: Strings.Aluminum
        },
        {
            label: Strings.other,
            value: Strings.other
        },
    ]
    const Mix = [
        {
            label: Strings.Air,
            value: Strings.Air
        },
        {
            label: Strings.Nitrox,
            value: Strings.Nitrox
        },
        {
            label: Strings.Trimix_Mix,
            value: Strings.Trimix_Mix
        },
    ]

    return (
        <View style={[styles.container, { alignItems: "center" }]}>
            {!imagePath ?
                <FastImage
                    source={require('../../Images/logbookImage.jpg')}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.cover}
                />
                : <View style={styles.uploadImageView}>
                    <FastImage
                        source={{ uri: imagePath }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={styles.top}
                    />
                </View>
            }
            <FastImage
                source={require('../../Images/BG.png')}
                resizeMode={FastImage.resizeMode.stretch}
                style={styles.bgImg}>
                <KeyboardAwareScrollView>
                    <View style={{ flex: 1, alignItems: "center" }}>
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.LOCATION}
                            </Text>
                        </View>
                        <View style={[styles.logView, {
                            height: heightPercentageToDP(30),
                            marginTop: heightPercentageToDP(2),
                            justifyContent: "center",
                            backgroundColor: blue
                        }]}>
                            <View style={[styles.innerLogView, { height: heightPercentageToDP(25) }]}>
                                <View style={styles.left}>
                                    <Text style={[styles.smallTxt, { color: black }]}>
                                        {Strings.country}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => toggleSearch()}
                                    >
                                        <Text style={[styles.smallTxt, { color: white }]}>
                                            {!country ? Strings.Select_Country : country}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.smallTxt, { color: black, marginTop: 10, }]}>
                                        {Strings.city}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => !country ? Alert.alert("", Strings.Please_select_the_Country_name_first)
                                            : toggleCity()
                                        }
                                    >
                                        <Text style={[styles.smallTxt, { color: white }]}>
                                            {!city ? Strings.select_city : city}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={{ marginTop: heightPercentageToDP(0.5), }}>
                                        <Text style={[styles.smallTxt, { color: black }]}>
                                            {Strings.population}{" :"}
                                        </Text>
                                        <TextInput
                                            style={[styles.smallInput, { paddingLeft: 5, marginTop: heightPercentageToDP(-1) }]}
                                            placeholder={Strings.population}
                                            placeholderTextColor={white}
                                            value={poblation}
                                            onChangeText={text => setPoblation(text)}
                                        />
                                    </View>
                                    <View style={{ marginTop: heightPercentageToDP(-7), }}>
                                        <Text style={[styles.smallTxt, { color: black }]}>
                                            {Strings.immersion_site}{" :"}
                                        </Text>
                                        <TextInput
                                            style={[styles.smallInput, { paddingTop: 0, paddingBottom: 0, marginTop: heightPercentageToDP(-1.5) }]}
                                            placeholder={Strings.immersion_site}
                                            placeholderTextColor={white}
                                            value={immersionSite}
                                            onChangeText={text => setImmersionSite(text)}
                                        />
                                    </View>
                                </View>
                                <View style={styles.right}>
                                    <View>
                                        <Text style={[styles.smallTxt, { color: black }]}>
                                            {Strings.date}{" :"}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => showDatePicker()}
                                        >
                                            <Text style={[styles.smallTxt, { color: white }]}>
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
                                            {Strings.time}{":"}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => showTimePicker()}
                                        >
                                            <Text style={[styles.smallTxt, { color: white }]}>
                                                {!myTime ? "HH-MM " + Strings.time : myTime}
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
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.sideButton, { top: "20%" }]}
                                onPress={() => toggleOption()}
                            >
                                <FastImage
                                    source={require('../../Images/45.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => toggleMap()}
                                style={[styles.sideButton, { top: "50%" }]}>
                                <FastImage
                                    source={require('../../Images/44.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.ENVIRONMENT}
                            </Text>
                        </View>
                        <View style={[styles.logView2, {
                            height: heightPercentageToDP(42),
                            marginTop: heightPercentageToDP(2),
                            backgroundColor: blue
                        }]}>
                            <View style={{ marginTop: heightPercentageToDP(1), flexDirection: "row", alignItems: "center", width: "90%" }}>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(1)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather1 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather1 ? require('../../Images/55.png')
                                            : require('../../Images/55-1.png')}
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(2)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather2 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather2 ? require('../../Images/48.png')
                                            : require('../../Images/48-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(3)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather3 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather3 ? require('../../Images/54.png')
                                            : require('../../Images/54-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(4)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather4 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather4 ? require('../../Images/53.png')
                                            : require('../../Images/53-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: heightPercentageToDP(1), flexDirection: "row", alignItems: "center", width: "90%" }}>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(5)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather5 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather5 ? require('../../Images/52.png')
                                            : require('../../Images/52-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(6)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather6 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather6 ? require('../../Images/50.png')
                                            : require('../../Images/50-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(7)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather7 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather7 ? require('../../Images/49.png')
                                            : require('../../Images/49-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => _onWeatherSelection(8)}
                                    style={[styles.weatherBtn, {
                                        //backgroundColor: weather8 ? blue : "#cccccc"
                                    }]}>
                                    <FastImage
                                        source={weather8 ? require('../../Images/51.png')
                                            : require('../../Images/51-1.png')
                                        }
                                        resizeMode={FastImage.resizeMode.cover}
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: heightPercentageToDP(1) }}>
                                <Text style={[styles.smallTxt, { color: black, marginLeft: 15, }]}>
                                    {Strings.Water_temperature}{" : "}
                                </Text>
                                <TextInput
                                    style={[styles.smallInput, { height: "70%", width: "12%", paddingTop: 0, paddingBottom: 0, }]}
                                    placeholder="10"
                                    placeholderTextColor={white}
                                    keyboardType="numeric"
                                    value={temperature}
                                    //onValueChange={}
                                    onChangeText={text => setTemperature(text)}
                                />
                                <Text style={[styles.smallTxt, { color: black, }]}>
                                    {"*C"}
                                </Text>
                            </View>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", marginTop: heightPercentageToDP(1) }}>
                                <Text style={[styles.smallTxt, { color: black, marginLeft: 15, }]}>
                                    {Strings.Visibility}{" : "}
                                </Text>
                                <TextInput
                                    style={[styles.smallInput, { height: "70%", width: "12%", paddingTop: 0, paddingBottom: 0, }]}
                                    placeholder={"7"}
                                    placeholderTextColor={white}
                                    keyboardType="numeric"
                                    value={visibility}
                                    //onValueChange={}
                                    onChangeText={text => setVisibility(text)}
                                />
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {Strings.meters}
                                </Text>
                            </View>
                            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", }}>
                                <Text onPress={() => {
                                    setSweetWater(true)
                                    setSaltWater(false)
                                    setWaterType("sweet water")
                                }}
                                    style={[styles.smallTxt, { color: sweetWater ? white : black, marginLeft: widthPercentageToDP(4), marginTop: heightPercentageToDP(1), marginBottom: heightPercentageToDP(1) }]}>
                                    {Strings.sweet_water}{" / "}
                                    <Text
                                        onPress={() => {
                                            setSweetWater(false)
                                            setSaltWater(true)
                                            setWaterType("salt water")
                                        }}
                                        style={[styles.smallTxt, { color: saltWater ? white : black }]}>
                                        {Strings.salt_water}
                                    </Text>
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", height: "12%", marginLeft: widthPercentageToDP(4), }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {Strings.type}{" :"}
                                </Text>
                                <View style={{ width: language === 'es' ? "67%" : "87%", height: "100%", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: Strings.type,
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={type}
                                        style={pickerStyle}
                                        onValueChange={value => {
                                            setType(value)
                                        }}
                                        items={Type}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", height: "12%", marginLeft: widthPercentageToDP(8), marginTop: -5 }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {Strings.currents}{" :"}
                                </Text>
                                <View style={{ width: language === 'es' ? "83%" : "86%", height: "100%", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: Strings.currents,
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={current}
                                        style={pickerStyle}
                                        onValueChange={value => {
                                            setCurrent(value)
                                        }}
                                        items={Current}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.IMMERSION}
                            </Text>
                        </View>
                        <View style={[styles.logView, {
                            height: heightPercentageToDP(33),
                            marginTop: heightPercentageToDP(2),
                            backgroundColor: blue
                        }]}>
                            <View style={[styles.innerLogView, { height: heightPercentageToDP(17), marginTop: heightPercentageToDP(2), justifyContent: "space-around" }]}>
                                <View style={styles.left2}>
                                    <FastImage
                                        source={require('../../Images/oxygen.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        style={{ width: "15%", height: "50%", marginLeft: 8 }}
                                    />
                                    <View style={{ width: "65%", height: "70%", marginLeft: 5 }}>
                                        <Text style={[styles.tinyText, { color: black }]}>
                                            {Strings.starting_bar}{":"}
                                        </Text>
                                        <TextInput
                                            style={styles.tinyInput}
                                            placeholder={"0"}
                                            value={startingBar}
                                            placeholderTextColor={white}
                                            keyboardType="number-pad"
                                            onChangeText={text => setStartingBar(text)}
                                        />
                                        <Text style={[styles.tinyText, { color: black }]}>
                                            {Strings.final_bars}{":"}
                                        </Text>
                                        <TextInput
                                            style={styles.tinyInput}
                                            placeholder={"70"}
                                            value={endBar}
                                            placeholderTextColor={white}
                                            keyboardType="number-pad"
                                            onChangeText={text => setEndBar(text)}
                                        />
                                        <Text style={[styles.tinyText, { color: black }]}>
                                            {Strings.consumed}{":"}
                                        </Text>
                                        <Text style={[styles.tinyText, { color: white }]}>
                                            {parseInt(startingBar) - parseInt(endBar)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.right2}>
                                    <FastImage
                                        source={require('../../Images/57.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        style={{ width: "33%", height: "45%", marginLeft: 8 }}
                                    />
                                    <View style={{ width: "50%", height: "90%", marginLeft: 5 }}>
                                        <Text style={[styles.tinyText, { color: black }]}>
                                            {Strings.start_time}{":"}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => showStartTimePicker()}
                                        >
                                            <Text style={[styles.tinyText, { color: white }]}>
                                                {!StartTime ? "00:00 h" : StartTime}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={[styles.tinyText, { color: black }]}>
                                            {Strings.end_time}{":"}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => showEndTimePicker()}
                                        >
                                            <Text style={[styles.tinyText, { color: white }]}>
                                                {!EndTime ? "00:00 h" : EndTime}
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={[styles.tinyText, { color: black }]}>
                                            {Strings.b_time}{":"}
                                        </Text>
                                        <Text style={[styles.tinyText, { color: white }]}>
                                            {timeDiff}
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
                            <View style={{ flexDirection: "row", alignItems: "center", width: "97%", marginTop: heightPercentageToDP(1) }}>
                                <Text style={[styles.smallTxt, { color: black, marginLeft: 15 }]}>
                                    {Strings.max_deep}{" : "}
                                </Text>
                                <TextInput
                                    style={styles.tinyInput2}
                                    placeholder={"7"}
                                    value={maxDeep}
                                    placeholderTextColor={white}
                                    keyboardType="number-pad"
                                    onChangeText={text => setMaxDeep(text)}
                                />
                                <Text style={[styles.smallTxt, { color: black, }]}>
                                    {Strings.meters}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", height: "13%", width: "90%" }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {Strings.type_of_dives}{" :"}
                                </Text>
                                <View style={{ width: language === 'es' ? "65%" : "70%", height: "100%", justifyContent: "center", }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: Strings.type_of_dives,
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={typeImpresion}
                                        style={pickerStyle}
                                        onValueChange={value => {
                                            setTypeImpresion(value)
                                        }}
                                        items={diveType}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", height: "13%", width: "90%" }}>
                                <Text style={[styles.smallTxt, { color: black }]}>
                                    {Strings.access}{" :"}
                                </Text>
                                <View style={{ width: "50%", height: "100%", justifyContent: "center" }}>
                                    <RNPickerSelect
                                        placeholder={{
                                            label: Strings.access,
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={access}
                                        style={pickerStyle}
                                        onValueChange={value => {
                                            setAccess(value)
                                        }}
                                        items={Access}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.TEAM}
                            </Text>
                        </View>
                        <View style={[styles.logView, {
                            height: !isScuba ? heightPercentageToDP(60) : heightPercentageToDP(78),
                            marginTop: heightPercentageToDP(2),
                            backgroundColor: blue
                        }]}>
                            <View style={styles.scubaView}>
                                <View style={{ width: "25%", height: "90%", alignItems: "center", }}>
                                    <TouchableOpacity
                                        style={{ width: "100%", height: "65%", }}
                                        onPress={() => {
                                            setSuit1(true)
                                            setSuit2(false)
                                            setSuit3(false)
                                            setSuit4(false)
                                            setSuitCode("77")
                                        }}
                                    >
                                        <FastImage
                                            source={suit1 ? require('../../Images/77.png') : require('../../Images/76.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.tinyText, { color: suit1 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.costume}
                                    </Text>
                                    <Text style={[styles.tinyText, { color: suit1 ? black : white, textAlign: "center" }]}>
                                        {Strings.short}
                                    </Text>
                                </View>
                                <View style={{ width: "25%", height: "90%", alignItems: "center", }}>
                                    <TouchableOpacity
                                        style={{ width: "100%", height: "65%", }}
                                        onPress={() => {
                                            setSuit1(false)
                                            setSuit2(true)
                                            setSuit3(false)
                                            setSuit4(false)
                                            setSuitCode("78")
                                        }}
                                    >
                                        <FastImage
                                            source={suit2 ? require('../../Images/78.png') : require('../../Images/79.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.tinyText, { color: suit2 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.costume}
                                    </Text>
                                    <Text style={[styles.tinyText, { color: suit2 ? black : white, textAlign: "center" }]}>
                                        {Strings.damp}
                                    </Text>
                                    {/* <Text style={[styles.tinyText, { color: blue2, textAlign: "center", marginTop: 5 }]}>
                                    {"7 mm"}
                                </Text> */}
                                    {suit2 &&
                                        <TextInput
                                            style={{
                                                width: "100%",
                                                height: "20%",
                                                paddingTop: 0,
                                                paddingBottom: 0,
                                                fontSize: widthPercentageToDP(2.5),
                                                fontFamily: "Montserrat-SemiBold",
                                                color: white,
                                                paddingLeft: 0,
                                                //backgroundColor:"red"
                                            }}
                                            placeholder="7 mm"
                                            placeholderTextColor={white}
                                            textAlign="center"
                                            keyboardType="number-pad"
                                            value={suitCode78}
                                            onChangeText={text => setSuitCode78(text)}
                                        />
                                    }
                                </View>
                                <View style={{ width: "25%", height: "90%", alignItems: "center", }}>
                                    <TouchableOpacity
                                        style={{ width: "100%", height: "65%", }}
                                        onPress={() => {
                                            setSuit1(false)
                                            setSuit2(false)
                                            setSuit3(true)
                                            setSuit4(false)
                                            setSuitCode("75")
                                        }}
                                    >
                                        <FastImage
                                            source={suit3 ? require('../../Images/75.png') : require('../../Images/74.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.tinyText, { color: suit3 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.costume}
                                    </Text>
                                    <Text style={[styles.tinyText, { color: suit3 ? black : white, textAlign: "center" }]}>
                                        {Strings.semi_dry}
                                    </Text>
                                </View>
                                <View style={{ width: "25%", height: "90%", alignItems: "center", }}>
                                    <TouchableOpacity
                                        style={{ width: "100%", height: "65%", }}
                                        onPress={() => {
                                            setSuit1(false)
                                            setSuit2(false)
                                            setSuit3(false)
                                            setSuit4(true)
                                            setSuitCode("73")
                                        }}
                                    >
                                        <FastImage
                                            source={suit4 ? require('../../Images/suit2.png') : require('../../Images/suit1.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                            style={{ width: "100%", height: "100%" }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={[styles.tinyText, { color: suit4 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.costume}
                                    </Text>
                                    <Text style={[styles.tinyText, { color: suit4 ? black : white, textAlign: "center" }]}>
                                        {Strings.dried}
                                    </Text>
                                </View>
                            </View>
                            <Text
                                onPress={() => {
                                    setScuba(true)
                                    setRebreader(false)
                                }}
                                style={[styles.smallTxt, { color: isScuba ? white : black, marginTop: 10 }]}>
                                {Strings.scuba}{" / "}
                                <Text
                                    onPress={() => {
                                        setScuba(false)
                                        setRebreader(true)
                                    }}
                                    style={[styles.smallTxt, { color: isRebreader ? white : black }]}>
                                    {Strings.rebreader}
                                </Text>
                            </Text>
                            {isScuba &&
                                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center" }}>
                                    <Text style={[styles.smallTxt, { color: black, marginLeft: 6 }]}>
                                        {Strings.ballast}{" : "}
                                    </Text>
                                    <TextInput
                                        style={styles.tinyInput2}
                                        placeholder={"7"}
                                        value={ballast}
                                        placeholderTextColor={white}
                                        keyboardType="number-pad"
                                        onChangeText={text => setBallast(text)}
                                    />
                                    <Text style={[styles.smallTxt, { color: black, }]}>
                                        {"kilos"}
                                    </Text>
                                </View>
                            }
                            {isScuba &&
                                <View style={styles.innerLogView3}>
                                    <FastImage
                                        source={require('../../Images/oxygen.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                        style={{ width: "12%", height: "70%", marginLeft: 8 }}
                                    />
                                    <View style={{ width: "80%", height: "100%", marginLeft: widthPercentageToDP(4) }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                                            <Text style={[styles.smallTxt, { color: black, }]}>
                                                {Strings.bottle}{" : "}
                                            </Text>
                                            <TextInput
                                                style={styles.tinyInput2}
                                                placeholder={"7"}
                                                value={bottles}
                                                placeholderTextColor={white}
                                                keyboardType="number-pad"
                                                onChangeText={text => setBottles(text)}
                                            />
                                            <Text style={[styles.smallTxt, { color: black, }]}>
                                                {"Liter"}
                                            </Text>
                                        </View>
                                        <View style={styles.sampleViews2}>
                                            <Text style={[styles.smallTxt, { color: black }]}>
                                                {Strings.material}{" :"}
                                            </Text>
                                            <View style={{ width: "70%", height: "100%", justifyContent: "center" }}>
                                                <RNPickerSelect
                                                    placeholder={{
                                                        label: Strings.material,
                                                        value: null,
                                                        color: "#000"
                                                    }}
                                                    value={material}
                                                    style={pickerStyle}
                                                    onValueChange={value => {
                                                        setMaterial(value)
                                                    }}
                                                    items={Material}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.sampleViews2}>
                                            <Text style={[styles.smallTxt, { color: black }]}>
                                                {Strings.mix}{" :"}
                                            </Text>
                                            <View style={{ width: language === 'es' ? "74%" : "85%", height: "100%", justifyContent: "center" }}>
                                                <RNPickerSelect
                                                    placeholder={{
                                                        label: Strings.mix,
                                                        value: null,
                                                        color: "#000"
                                                    }}
                                                    value={mix}
                                                    style={pickerStyle}
                                                    onValueChange={value => {
                                                        setMix(value)
                                                    }}
                                                    items={Mix}
                                                />
                                            </View>
                                        </View>
                                        {mix === "Nitrox" &&
                                            <View style={styles.sampleViews}>
                                                <Text style={[styles.smallTxt, { color: black }]}>
                                                    {"% 02"}
                                                </Text>
                                                <TextInput
                                                    style={[styles.tinyInput2, { height: "100%", marginLeft: widthPercentageToDP(3), color: white, width: "30%" }]}
                                                    placeholder="xxx"
                                                    value={oxygen}
                                                    placeholderTextColor={white}
                                                    keyboardType="number-pad"
                                                    onChangeText={text => setOxygen(text)}
                                                />
                                                <Text style={[styles.smallTxt, { color: black }]}>
                                                    {Strings.oxygen}
                                                </Text>
                                            </View>
                                        }
                                        {mix === "Trimix Mix" &&
                                            <View style={styles.sampleViews}>
                                                <TextInput
                                                    style={[styles.tinyInput2, { height: "100%", marginLeft: widthPercentageToDP(3), color: white, width: "15%" }]}
                                                    placeholder="xx"
                                                    placeholderTextColor={white}
                                                    value={trimMix1}
                                                    keyboardType="number-pad"
                                                    onChangeText={text => setTrimMix1(text)}
                                                />
                                                <Text style={[styles.smallTxt, { color: black }]}>
                                                    {"/"}
                                                </Text>
                                                <TextInput
                                                    style={[styles.tinyInput2, { height: "100%", marginLeft: widthPercentageToDP(3), color: white, width: "30%" }]}
                                                    placeholder="xx"
                                                    value={trimMix2}
                                                    placeholderTextColor={white}
                                                    keyboardType="number-pad"
                                                    onChangeText={text => setTrimMix2(text)}
                                                />
                                            </View>
                                        }
                                    </View>
                                </View>
                            }
                            <View style={[styles.innerLogView, { height: heightPercentageToDP(8), marginTop: 10, justifyContent: "space-between", width: widthPercentageToDP(80) }]}>
                                <TouchableOpacity
                                    style={{ width: "17%", height: "90%" }}
                                    onPress={() => {
                                        if (diveItem1) {
                                            setDiveItem1(false)
                                        } else {
                                            setDiveItem1(true)
                                        }
                                    }}

                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem1 ? require('../../Images/63.png') : require('../../Images/62.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem1 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.dive_computer}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "15%", height: "85%" }}
                                    onPress={() => {
                                        if (diveItem2) {
                                            setDiveItem2(false)
                                        } else {
                                            setDiveItem2(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem2 ? require('../../Images/58.png') : require('../../Images/59.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem2 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.compass}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "18%", height: "85%" }}
                                    onPress={() => {
                                        if (diveItem3) {
                                            setDiveItem3(false)
                                        } else {
                                            setDiveItem3(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem3 ? require('../../Images/71.png') : require('../../Images/70.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem3 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.torch}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "17%", height: "90%" }}
                                    onPress={() => {
                                        if (diveItem4) {
                                            setDiveItem4(false)
                                        } else {
                                            setDiveItem4(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem4 ? require('../../Images/68.png') : require('../../Images/69.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem4 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.dive_hood}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.innerLogView, { height: heightPercentageToDP(8), marginTop: heightPercentageToDP(8), justifyContent: "space-between", width: widthPercentageToDP(80) }]}>
                                <TouchableOpacity
                                    style={{ width: "15%", height: "90%" }}
                                    onPress={() => {
                                        if (diveItem5) {
                                            setDiveItem5(false)
                                        } else {
                                            setDiveItem5(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem5 ? require('../../Images/67.png') : require('../../Images/66.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem5 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.buoy}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "17%", height: "90%" }}
                                    onPress={() => {
                                        if (diveItem6) {
                                            setDiveItem6(false)
                                        } else {
                                            setDiveItem6(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem6 ? require('../../Images/61.png') : require('../../Images/60.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem6 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.knife}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "20%", height: "90%" }}
                                    onPress={() => {
                                        if (diveItem7) {
                                            setDiveItem7(false)
                                        } else {
                                            setDiveItem7(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem7 ? require('../../Images/65.png') : require('../../Images/64.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem7 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.gloves}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ width: "19%", height: "90%" }}
                                    onPress={() => {
                                        if (diveItem8) {
                                            setDiveItem8(false)
                                        } else {
                                            setDiveItem8(true)
                                        }
                                    }}
                                >
                                    <FastImage
                                        style={{ width: "100%", height: "100%" }}
                                        source={diveItem8 ? require('../../Images/sharkskin2.png') : require('../../Images/sharkskin1.png')}
                                        resizeMode={FastImage.resizeMode.stretch}
                                    />
                                    <Text style={[styles.tinyText, { color: diveItem8 ? black : white, textAlign: "center", marginTop: 5 }]}>
                                        {Strings.Shark_skin_suit}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.PECIOS}
                            </Text>
                        </View>
                        <View style={styles.sankSelectionView}>
                            <Text style={[styles.smallTxt, { color: black }]}>
                                {""}
                            </Text>
                            <TouchableOpacity
                                onPress={() => togglePecios()}
                            >
                                <Text style={[styles.smallTxt, { color: blue }]}>
                                    {Strings.select_pecios}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {!response || !response.pecios.length ?
                            <View />
                            : <FlatList
                                data={response.pecios}
                                showsVerticalScrollIndicator={false}
                                numColumns={4}
                                listKey={(item, index) => `_key${index.toString()}`}
                                style={{ width: widthPercentageToDP(90) }}
                                keyExtractor={(item, index) => "unique" + index}
                                renderItem={imageModel}
                            />}
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.ANIMAL}
                            </Text>
                        </View>
                        <View style={styles.sankSelectionView}>
                            <Text style={[styles.smallTxt, { color: black }]}>
                                {""}
                            </Text>
                            <TouchableOpacity
                                onPress={() => toggleAnimal()}
                            >
                                <Text style={[styles.smallTxt, { color: blue }]}>
                                    {Strings.select_animal}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {!response || !response.genres.length ?
                            <View />
                            : <FlatList
                                data={response.genres}
                                showsVerticalScrollIndicator={false}
                                numColumns={4}
                                listKey={(item, index) => `_key${index.toString()}`}
                                style={{ width: widthPercentageToDP(90) }}
                                keyExtractor={(item, index) => "unique" + index}
                                renderItem={imageModel}
                            />}
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.CLASSMATES}
                            </Text>
                        </View>
                        <View style={styles.sankSelectionView}>
                            <Text style={[styles.smallTxt, { color: black }]}>
                                {""}
                            </Text>
                            <TouchableOpacity
                                onPress={() => toggleTeam()}
                            >
                                <Text style={[styles.smallTxt, { color: blue }]}>
                                    {Strings.select_team}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {!response || !response.users.length ?
                            <View />
                            : <FlatList
                                data={response.users}
                                showsVerticalScrollIndicator={false}
                                numColumns={4}
                                listKey={(item, index) => `_key${index.toString()}`}
                                style={{ width: widthPercentageToDP(90) }}
                                keyExtractor={(item, index) => "unique" + index}
                                renderItem={imageModel}
                            />
                        }
                        <View style={styles.titleView}>
                            <Text style={styles.titleTxt}>
                                {Strings.SEARCH_CENTER}
                            </Text>
                        </View>
                        <View style={styles.sankSelectionView}>
                            <Text style={[styles.smallTxt, { color: black }]}>
                                {""}
                            </Text>
                            <TouchableOpacity
                                onPress={() => toggleCenter()}
                            >
                                <Text style={[styles.smallTxt, { color: blue }]}>
                                    {Strings.select_center}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.writeView, {
                            justifyContent: !center ? "space-between" : null,
                        }]}>
                            <View style={styles.modelView}>
                                {!center ?
                                    <FastImage
                                        source={require('../../Images/fish2.jpg')}
                                        style={styles.imgModel}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                    : <FastImage
                                        source={{ uri: "http://199.247.13.90/" + center.logo }}
                                        style={styles.imgModel}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                }
                                <Text style={styles.title}>
                                    {Strings.madrid_diving}
                                </Text>
                            </View>
                            {center ?
                                <TouchableOpacity
                                    onPress={() => {
                                        getCenterDetailApi(center.id)
                                    }}
                                    style={[styles.centerView, {
                                        marginLeft: center ? widthPercentageToDP(10) : 0
                                    }]}>
                                    <FastImage
                                        source={{ uri: "http://199.247.13.90/" + center.stamp }}
                                        style={{ width: "90%", height: "90%" }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </TouchableOpacity>
                                : <TextInput
                                    style={styles.input}
                                    placeholder="Sello"
                                    placeholderTextColor={black}
                                    textAlign="center"
                                    value={centerTexts}
                                    onChangeText={text => setCenterTexts(text)}
                                />
                            }
                        </View>
                        <View style={styles.observationView}>
                            <Text style={[styles.smallTxt, { color: white, marginTop: heightPercentageToDP(1) }]}>
                                {Strings.observations}
                            </Text>
                            <TextInput
                                style={[styles.input2, { color: white }]}
                                placeholder={Strings.write_anything}
                                placeholderTextColor={"#cccc"}
                                value={opinion}
                                textAlign="center"
                                onChangeText={text => setOpinion(text)}
                            />
                        </View>
                        <TouchableOpacity
                            style={[styles.btn, { alignSelf: "center" }]}
                            onPress={() => { _onSubmit() }}
                        >
                            <Text style={styles.btnText}>
                                {Strings.SAVE}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                <View style={{ height: heightPercentageToDP(8) }} />
                <Tab
                    homeClick={() => props.navigation.dispatch(HomeAction)}
                    profileClick={() => props.navigation.dispatch(profileAction)}
                    settingClick={() => props.navigation.dispatch(settingAction)}
                    mapClick={() => props.navigation.dispatch(mapAction)}
                    notiClick={() => props.navigation.dispatch(notificationAction)}
                />
                {mapModal &&
                    <SafeAreaView style={styles.container}>
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
                    </SafeAreaView>
                }
                {searchModal &&
                    <SafeAreaView style={styles.container}>
                        <Modal
                            animationType={"fade"}
                            transparent={false}
                            visible={searchModal}
                            onRequestClose={() => { console.log("Modal has been closed.") }}
                        >
                            <View style={[styles.modalView2, {
                                marginTop: Platform.OS === 'ios' ? heightPercentageToDP(3.5) : 0
                            }]}>
                                <SearchBar
                                    placeholder="Search country..."
                                    lightTheme
                                    round
                                    value={text}
                                    onChangeText={text => searchFilterFunction(text)}
                                    autoCorrect={false}
                                    containerStyle={{ width: widthPercentageToDP(95), backgroundColor: white }}
                                //style={{}}
                                />
                                {!countryList || !countryList.length ?
                                    <View />
                                    : <FlatList
                                        data={!text ? countryList : countryList2}
                                        contentContainerStyle={{ marginBottom: heightPercentageToDP(5), flexGrow: 1 }}
                                        keyExtractor={(item, index) => "Unique" + index}
                                        ItemSeparatorComponent={renderSeparator}
                                        renderItem={renderItem}
                                    />}
                            </View>
                        </Modal>
                    </SafeAreaView>
                }
                {cityModal &&
                    <SafeAreaView style={styles.container}>
                        <Modal
                            animationType={"fade"}
                            transparent={false}
                            visible={cityModal}
                            onRequestClose={() => { console.log("Modal has been closed.") }}
                        >
                            <View style={[styles.modalView2, {
                                marginTop: Platform.OS === 'ios' ? heightPercentageToDP(3.5) : 0
                            }]}>
                                <SearchBar
                                    placeholder="Search city..."
                                    lightTheme
                                    round
                                    value={text2}
                                    onChangeText={text => cityFilterFunction(text)}
                                    autoCorrect={false}
                                    containerStyle={{ width: widthPercentageToDP(95), backgroundColor: white }}
                                //style={{}}
                                />
                                {!cityList || !cityList.length ?
                                    <View />
                                    : <FlatList
                                        data={!text2 ? cityList : cityList2}
                                        contentContainerStyle={{ marginBottom: heightPercentageToDP(5), flexGrow: 1 }}
                                        keyExtractor={(item, index) => "Unique" + index}
                                        ItemSeparatorComponent={renderSeparator}
                                        renderItem={renderItem2}
                                    />}
                            </View>
                        </Modal>
                    </SafeAreaView>
                }
                {peciosModal &&
                    <SafeAreaView style={styles.container}>
                        <Modal
                            animationType={"fade"}
                            transparent={false}
                            visible={peciosModal}
                            onRequestClose={() => { console.log("Modal has been closed.") }}
                        >
                            <View style={[styles.modalView2, {
                                marginTop: Platform.OS === 'ios' ? heightPercentageToDP(3.5) : 0
                            }]}>
                                <View style={styles.row}>
                                    <SearchBar
                                        placeholder={Strings.select_pecios}
                                        lightTheme
                                        round
                                        value={peciosText}
                                        onChangeText={text => searchPeciosFilterFunction(text)}
                                        autoCorrect={false}
                                        containerStyle={{ width: widthPercentageToDP(80), backgroundColor: white }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => togglePecios()}
                                    >
                                        <Text style={stylesProps.txt}>
                                            {"Close"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {!response || !response.pecios.length ?
                                    <View />
                                    : <FlatList
                                        data={!peciosText ? response.pecios : tempPecios}
                                        contentContainerStyle={{ marginBottom: heightPercentageToDP(5), flexGrow: 1 }}
                                        keyExtractor={(item, index) => "Unique" + index}
                                        ItemSeparatorComponent={renderSeparator}
                                        renderItem={renderSelection}
                                    />}
                                {isLoading &&
                                    <ActivityIndicator
                                        size="large"
                                        color={black}
                                        style={styles.loading}
                                    />
                                }
                            </View>
                        </Modal>
                    </SafeAreaView>
                }
                {animalModal &&
                    <SafeAreaView style={styles.container}>
                        <Modal
                            animationType={"fade"}
                            transparent={false}
                            visible={animalModal}
                            onRequestClose={() => { console.log("Modal has been closed.") }}
                        >
                            <View style={[styles.modalView2, {
                                marginTop: Platform.OS === 'ios' ? heightPercentageToDP(3.5) : 0
                            }]}>
                                <View style={styles.row}>
                                    <SearchBar
                                        placeholder={Strings.select_animal}
                                        lightTheme
                                        round
                                        value={animalText}
                                        onChangeText={text => searchAnimalFilterFunction(text)}
                                        autoCorrect={false}
                                        containerStyle={{ width: widthPercentageToDP(80), backgroundColor: white }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => toggleAnimal()}
                                    >
                                        <Text style={stylesProps.txt}>
                                            {"Close"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {!response || !response.genres.length ?
                                    <View />
                                    : <FlatList
                                        data={!animalText ? response.genres : tempGenre}
                                        contentContainerStyle={{ marginBottom: heightPercentageToDP(5), flexGrow: 1 }}
                                        keyExtractor={(item, index) => "Unique" + index}
                                        ItemSeparatorComponent={renderSeparator}
                                        renderItem={renderAnimalSelection}
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
                        </Modal>
                    </SafeAreaView>
                }
                {teamModal &&
                    <SafeAreaView style={styles.container}>
                        <Modal
                            animationType={"fade"}
                            transparent={false}
                            visible={teamModal}
                            onRequestClose={() => { console.log("Modal has been closed.") }}
                        >
                            <View style={[styles.modalView2, {
                                marginTop: Platform.OS === 'ios' ? heightPercentageToDP(3.5) : 0
                            }]}>
                                <View style={styles.row}>
                                    <SearchBar
                                        placeholder={Strings.select_team}
                                        lightTheme
                                        round
                                        value={teamText}
                                        onChangeText={text => searchTeamFilterFunction(text)}
                                        autoCorrect={false}
                                        containerStyle={{ width: widthPercentageToDP(80), backgroundColor: white }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => toggleTeam()}
                                    >
                                        <Text style={stylesProps.txt}>
                                            {"Close"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {!response || !response.users.length ?
                                    <View />
                                    : <FlatList
                                        data={!teamText ? response.users : tempTeam}
                                        contentContainerStyle={{ marginBottom: heightPercentageToDP(5), flexGrow: 1 }}
                                        keyExtractor={(item, index) => "Unique" + index}
                                        ItemSeparatorComponent={renderSeparator}
                                        renderItem={renderTeamSelection}
                                    />}
                            </View>
                            {isLoading &&
                                <ActivityIndicator
                                    size="large"
                                    color={black}
                                    style={styles.loading}
                                />
                            }
                        </Modal>
                    </SafeAreaView>
                }
                {centerModal &&
                    <SafeAreaView style={styles.container}>
                        <Modal
                            animationType={"fade"}
                            transparent={false}
                            visible={centerModal}
                            onRequestClose={() => { console.log("Modal has been closed.") }}
                        >
                            <View style={[styles.modalView2, {
                                marginTop: Platform.OS === 'ios' ? heightPercentageToDP(3.5) : 0
                            }]}>
                                <View style={styles.row}>
                                    <SearchBar
                                        placeholder={Strings.select_center}
                                        lightTheme
                                        round
                                        value={centerText}
                                        onChangeText={text => searchCenterFilterFunction(text)}
                                        autoCorrect={false}
                                        containerStyle={{ width: widthPercentageToDP(80), backgroundColor: white }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => toggleCenter()}
                                    >
                                        <Text style={stylesProps.txt}>
                                            {"Close"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                {!response || !response.centers.length ?
                                    <View />
                                    : <FlatList
                                        data={!centerText ? response.centers : tempCenter}
                                        contentContainerStyle={{ marginBottom: heightPercentageToDP(5), flexGrow: 1 }}
                                        keyExtractor={(item, index) => "Unique" + index}
                                        ItemSeparatorComponent={renderSeparator}
                                        renderItem={renderCenterItem}
                                    />
                                }
                            </View>
                            {isLoading &&
                                <ActivityIndicator
                                    size="large"
                                    color={black}
                                    style={styles.loading}
                                />
                            }
                        </Modal>
                    </SafeAreaView>
                }
                {pickerOption &&
                    <Picker
                        isDialogOpen={pickerOption}
                        cancelClick={() => {
                            if (Platform.OS === 'ios') {
                                _onLunchCamera();
                                //toggleOption()

                            } else {
                                toggleOption(),
                                    requestCameraPermission()
                            }
                        }}
                        okClick={() => {
                            if (Platform.OS === 'ios') {
                                _onLunchGallery();
                                //toggleOption()

                            } else {
                                toggleOption(),
                                    _onLunchGallery()
                            }
                        }}
                        title={Strings.popup_logbook}
                        closeBox={() => toggleOption()}
                    />
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
            </FastImage>
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
    },
    title: {
        fontSize: widthPercentageToDP(4),
        color: black,
        fontFamily: "Montserrat-SemiBold",
        marginLeft: widthPercentageToDP(2)
    },
    imageView: {
        width: widthPercentageToDP(90),
        height: heightPercentageToDP(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2)
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(10),
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
        //paddingHorizontal: 10,
        //backgroundColor: 'red',
        borderRadius: 5,
    },
    modalViewBottom: {
        backgroundColor: "#DCDCDC"
    }
};


export default LogBook;