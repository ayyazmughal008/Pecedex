import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, PermissionsAndroid, Dimensions, ScrollView, Alert, Platform } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { SliderBox } from "react-native-image-slider-box";
import { black, blue, blue2, white } from '../../config/color'
import { postGenerSeen, postGenerImg } from '../../Redux/action'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Share from 'react-native-share';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector, useDispatch } from 'react-redux';
import Picker from '../Profile/Picker'
import Strings from '../../Translation'
import { media } from './data'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Carousel, { Pagination } from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
import Video from 'react-native-video'
import RNFetchBlob from "rn-fetch-blob";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import PagerView from 'react-native-pager-view';


const GenreDetail = (props) => {
    const dispatch = useDispatch();
    const data = props.navigation.getParam('data', "12")
    const position = props.navigation.getParam('position', 0)
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [pickerOption, setOption] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState("")
    const [isStart, setSTart] = useState(false)
    const [imagePath, setImagePath] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [activeSlid, setActiveSlid] = useState(0);
    const [itemId, setItemId] = useState('none')
    const [pageSelected, setPageSelected] = useState(position)
    const viewPager = useRef();

    useEffect(() => {
        getCurrentImage()
    }, [activeSlid])
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        getApis("yes", data[pageSelected].id)
    }, [pageSelected])
    useEffect(() => {
        if (pageSelected) {
            //console.log(activeSlid)
        }
    }, [pageSelected])
    const convertImageToBase64 = async (url) => {
        let URL = encodeURI(url)
        console.log('==>', URL)
        setIsLoading(true)
        const fs = RNFetchBlob.fs;
        let Path = null;
        await RNFetchBlob.config({
            fileCache: true
        })
            .fetch("GET", URL)
            // the image is now dowloaded to device's storage
            .then(resp => {
                // the image path you can use it directly with Image component
                Path = resp.path();
                return resp.readFile("base64");
            })
            .then(base64Data => {
                setIsLoading(false)
                // here's base64 encoded image
                shareImage(base64Data)
                //console.log("Image converted to base64");
                //console.log(base64Data);
                // remove the file from storage
                return fs.unlink(Path);
            });
    }
    const getApis = async (value, id) => {
        setIsLoading(true)
        let seenData = await postGenerSeen(id, login.data.id, value)
        await setResponse(seenData)
        await setIsLoading(false)
    }
    const _renderItem = (({ item, index }) => {
        return (
            <View style={{
                width: widthPercentageToDP(48),
                height: Platform.OS === 'ios' ? heightPercentageToDP(7) : heightPercentageToDP(5),
                margin: widthPercentageToDP(0.5),
                //marginRight: widthPercentageToDP(2),
                //backgroundColor:"red"
            }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    <View style={{ width: "30%", height: "100%", justifyContent: "center", alignItems: "center" }}>
                        <FastImage
                            source={{ uri: item.image }}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: "60%",
                                height: "80%"
                            }}
                        />
                    </View>
                    {/* <View style={{ width: "70%", height: "100%", alignItems: "flex-start", justifyContent: "center", flexDirection: "row" }}> */}
                    <Text style={{
                        fontSize: widthPercentageToDP(2.5),
                        flex: 1,
                        flexWrap: 'wrap',
                        flexShrink: 1,
                        flexGrow: 1,
                        fontFamily: "Montserrat-SemiBold",
                        //padding: widthPercentageToDP(1),
                        //backgroundColor:"red",
                        flexShrink: 1,
                    }}>
                        {item.text}
                    </Text>
                    {/* </View> */}
                </View>
            </View>
        )
    })
    const shareImage = async (base64) => {
        const shareOptions = {
            title: 'PECEDEX',
            message: 'PECEDEX ' + data[pageSelected].share.info,
            url: `data:image/png;base64,${base64}`,
            failOnCancel: false,
        };
        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(ShareResponse)
            //setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            //setResult('error: '.concat(getErrorString(error)));
        }
    };
    const toggleOption = () => {
        setOption(!pickerOption)
    }
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
        let data2 = "";
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(response => {
            console.log(response)
            data2 = {
                'uri': response.path,
                'type': response.mime,
                'name': Date.now() + '_Pecedex.png',
            }
            dispatch(postGenerImg(login.data.id, itemId, data2));
            setOption(false);
        })
            .catch(err => {
                console.log(err);
            })
    }
    const _onLunchGallery = () => {
        let data2 = "";
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log(image);
            data2 = {
                'uri': image.path,
                'type': image.mime,
                'name': Date.now() + '_Pecedex.png',
            }
            dispatch(postGenerImg(login.data.id, itemId, data2));
            setOption(false);
        }).catch(error => {
            console.log(error);
        })
    }
    const onBuffer = (isBuffering) => {
        if (isBuffering) {
            setSTart(true)
        } else {
            setSTart(false)
        }
    }
    const _renderSlider = (({ item, index }) => {
        if (item.mediaType === 'image') {
            return (
                <FastImage
                    source={{ uri: item.url }}
                    style={{ width: "100%", height: "100%", }}
                    resizeMode={FastImage.resizeMode.cover}
                />
            )
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Video
                        source={{ uri: item.url }}  // Can be a URL or a local file.
                        //ref={(ref) => { this.player = ref }}  // Store reference
                        resizeMode={"cover"}
                        paused={index !== activeSlid ? true : false}
                        onLoadStart={setSTart(true)}
                        onLoad={setSTart(false)}
                        onBuffer={onBuffer()}
                        onError={error => console.log(error)}
                        controls={false}
                        style={{ backgroundColor: "black", width: "100%", height: "100%" }}
                    />
                    {isStart &&
                        <ActivityIndicator
                            size="large"
                            color={white}
                            style={{
                                position: 'absolute',
                                top: 70,
                                left: 70,
                                right: 70,
                                height: 50,
                            }}
                        />
                    }
                </View>
            )
        }

    })
    const getCurrentImage = async () => {
        await data[pageSelected].media.forEach((item, index) => {
            if (index == activeSlid) {
                if (item.mediaType === "image") {
                    setImageUrl(item.url)
                }
            }
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: "100%",
                height: heightPercentageToDP(39),
            }}>
                <Carousel
                    layout={'default'}
                    data={data[pageSelected].media}
                    renderItem={_renderSlider}
                    sliderWidth={(width)}
                    itemWidth={(width)}
                    removeClippedSubviews={false}
                    loopClonesPerSide={data[pageSelected].media.length}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    firstItem={activeSlid}
                    //enableSnap = {false}
                    //initialScrollIndex={activeSlid}
                    onSnapToItem={num => setActiveSlid(num)}
                    onBeforeSnapToItem={event => setActiveSlid(event)}
                //onScroll={event => console.log("onScroll", event)}
                />
                <TouchableOpacity
                    onPress={() => {
                        if (!login.data.paid) {
                            props.navigation.navigate('Subscription')
                        } else {
                            setItemId(data[pageSelected].id)
                            toggleOption()
                        }
                    }}
                    style={{
                        position: "absolute",
                        bottom: "4%",
                        right: "4%",
                        zIndex: 3
                    }}>
                    <FastImage
                        source={require('../../Images/84.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ width: widthPercentageToDP(8), height: widthPercentageToDP(8) }}
                    />
                </TouchableOpacity>
                {Platform.OS === 'ios' &&
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{
                            position: "absolute",
                            left: "4%",
                            top: "5%",
                            zIndex: 3
                        }}
                    >
                        <AntDesign
                            name="arrowleft"
                            color={blue2}
                            size={40}
                        />
                    </TouchableOpacity>}
                <View style={styles.tabBar}>
                    <Pagination
                        containerStyle={[styles.tabsContainer,
                        {
                            width: data[pageSelected].media.length <= 1 ?
                                widthPercentageToDP(15)
                                : data[pageSelected].media.length <= 2 ?
                                    widthPercentageToDP(17)
                                    : data[pageSelected].media.length <= 3 ?
                                        widthPercentageToDP(18)
                                        : data[pageSelected].media.length <= 4 ?
                                            widthPercentageToDP(23)
                                            : data[pageSelected].media.length <= 5 ?
                                                widthPercentageToDP(26)
                                                : data[pageSelected].media.length <= 6 ?
                                                    widthPercentageToDP(29)
                                                    : data[pageSelected].media.length <= 7 ?
                                                        widthPercentageToDP(32)
                                                        : data[pageSelected].media.length <= 8 ?
                                                            widthPercentageToDP(35)
                                                            : data[pageSelected].media.length <= 9 ?
                                                                widthPercentageToDP(37)
                                                                : data[pageSelected].media.length <= 10 ?
                                                                    widthPercentageToDP(40)
                                                                    : data[pageSelected].media.length <= 11 ?
                                                                        widthPercentageToDP(43)
                                                                        : data[pageSelected].media.length <= 12 ?
                                                                            widthPercentageToDP(45)
                                                                            : data[pageSelected].media.length <= 13 ?
                                                                                widthPercentageToDP(47)
                                                                                : data[pageSelected].media.length <= 14 ?
                                                                                    widthPercentageToDP(50)
                                                                                    : data[pageSelected].media.length <= 15 ?
                                                                                        widthPercentageToDP(53)
                                                                                        : data[pageSelected].media.length <= 55 ?
                                                                                            widthPercentageToDP(31)
                                                                                            : widthPercentageToDP(60)
                        }
                        ]}
                        renderDots={activeIndex => (
                            data[pageSelected].media.map((screen, i) => (
                                <View
                                    style={{ flex: 1, alignItems: 'center' }}
                                    key={i}>
                                    <View
                                        style={{
                                            width: widthPercentageToDP(2),
                                            height: widthPercentageToDP(2),
                                            borderRadius: widthPercentageToDP(2) / 2,
                                            backgroundColor: activeIndex === i ? blue : white,
                                            //marginHorizontal: widthPercentageToDP(-20)
                                        }}
                                    />
                                </View>
                            ))
                        )}
                        activeDotIndex={activeSlid}
                        dotsLength={data[pageSelected].media.length}
                    />
                </View>
            </View>
            <PagerView
                initialPage={pageSelected}
                ref={viewPager}
                onPageSelected={e => {
                    setPageSelected(e.nativeEvent.position);
                    setActiveSlid(0)
                }}
                setPage={pageSelected}
                transitionStyle="scroll"
                style={{
                    width: "100%",
                    height: "60%",
                }}>
                {data.map((item, index) => {
                    if (item.ad) {
                        return
                    } {
                        return (
                            <View key={"unique" + index}
                                style={{ flexGrow: 1 }}>
                                <View style={styles.shareView}>
                                    <View style={{ width: "45%", height: "100%", flexDirection: "row", alignItems: "center" }}>
                                        {!Response ?
                                            <FastImage
                                                source={require('../../Images/85.png')}
                                                resizeMode={FastImage.resizeMode.stretch}
                                                style={{
                                                    width: widthPercentageToDP(14),
                                                    height: widthPercentageToDP(10),
                                                    marginLeft: widthPercentageToDP(3)
                                                }}
                                            />
                                            : <TouchableOpacity
                                                onPress={() => {
                                                    getApis("no", item.id);
                                                }}
                                                style={styles.shareButton}>
                                                <FastImage
                                                    source={Response.seen === 'yes' ?
                                                        require('../../Images/85.png')
                                                        : require('../../Images/camera.png')}
                                                    resizeMode={FastImage.resizeMode.stretch}
                                                    style={{
                                                        width: widthPercentageToDP(14),
                                                        height: widthPercentageToDP(10),
                                                        marginLeft: widthPercentageToDP(3)
                                                    }}
                                                />
                                            </TouchableOpacity>}
                                    </View>
                                    <View style={{ width: "45%", height: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!item.videoLink) {
                                                    console.log(item.videoLink)
                                                } else {
                                                    Linking.openURL(item.videoLink);
                                                }
                                            }}
                                            style={styles.shareButton}>
                                            <FastImage
                                                source={require('../../Images/86.png')}
                                                resizeMode={FastImage.resizeMode.contain}
                                                style={{
                                                    width: widthPercentageToDP(8),
                                                    height: heightPercentageToDP(4),
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                if (!item.wlink) {
                                                    console.log(item.wlink)
                                                } else {
                                                    Linking.openURL(item.wlink);
                                                }
                                            }}
                                            style={styles.shareButton}>
                                            <FastImage
                                                source={require('../../Images/87.png')}
                                                resizeMode={FastImage.resizeMode.contain}
                                                style={{
                                                    width: widthPercentageToDP(8),
                                                    height: heightPercentageToDP(4),
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                convertImageToBase64(imageUrl)
                                            }}
                                            style={[styles.shareButton, { marginRight: 5 }]}>
                                            <FastImage
                                                source={require('../../Images/88.png')}
                                                resizeMode={FastImage.resizeMode.contain}
                                                style={{
                                                    width: widthPercentageToDP(8),
                                                    height: heightPercentageToDP(4),
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={styles.proInfoTile2}>
                                    {item.title}
                                </Text>
                                <Text style={[styles.smallText, {
                                    fontFamily: "MontserratAlternates-BoldItalic"
                                }]}>
                                    {item.short}
                                </Text>
                                <View style={{
                                    width: item.qualities.length < 2
                                        ? "15%"
                                        : item.qualities.length < 4 ?
                                            "40%"
                                            : "80%",
                                    height: heightPercentageToDP(4),
                                    marginTop: heightPercentageToDP(1),
                                    alignItems: "center",
                                    alignSelf: "center"
                                    //backgroundColor: "red"
                                }}>
                                    <ScrollView
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                                        {item.qualities.map((item, index) => {
                                            return (
                                                <TouchableOpacity
                                                    key={"unique" + index}
                                                    onPress={() => {
                                                        Alert.alert("", item.title)
                                                    }}>
                                                    <FastImage
                                                        source={{ uri: item.image }}
                                                        resizeMode={FastImage.resizeMode.contain}
                                                        style={{
                                                            width: widthPercentageToDP(8),
                                                            height: heightPercentageToDP(4),
                                                            marginLeft: widthPercentageToDP(3),
                                                            marginRight: widthPercentageToDP(3),
                                                        }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>

                                </View>
                                <FastImage
                                    source={require('../../Images/line.png')}
                                    style={{
                                        width: widthPercentageToDP(90),
                                        height: widthPercentageToDP(0.5),
                                        alignSelf: "center",
                                        marginTop: heightPercentageToDP(1),
                                        //marginBottom: heightPercentageToDP(1)
                                    }}
                                    resizeMode={FastImage.resizeMode.stretch}
                                />
                                <FlatList
                                    key={'h'}
                                    data={item.icons}
                                    numColumns={2}
                                    bounces={false}
                                    style={{ alignSelf: "center" }}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => "unique" + index}
                                    renderItem={_renderItem}
                                />
                            </View>
                        )
                    }

                })
                }
            </PagerView>
            <View style={{ height: heightPercentageToDP(5) }} />
            <Tab
                homeClick={() => props.navigation.dispatch(HomeAction)}
                profileClick={() => props.navigation.dispatch(profileAction)}
                settingClick={() => props.navigation.dispatch(settingAction)}
                mapClick={() => props.navigation.dispatch(mapAction)}
                notiClick={() => props.navigation.dispatch(notificationAction)}
            />
            {isLoading &&
                <ActivityIndicator
                    size="large"
                    color={black}
                    style={styles.loading}
                />
            }
            {AuthLoading &&
                <ActivityIndicator
                    size="large"
                    color={black}
                    style={styles.loading}
                />
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
                    title={Strings.popup_animales}
                    closeBox={() => toggleOption()}
                />
            }
        </SafeAreaView>
    )
}

export default GenreDetail;