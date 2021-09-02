import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, PermissionsAndroid, Dimensions, ScrollView, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { SliderBox } from "react-native-image-slider-box";
import { black, blue, white } from '../../config/color'
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
import Carousel, { Pagination } from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
import Video from 'react-native-video'
import RNFetchBlob from "rn-fetch-blob";


const GenreDetail = (props) => {
    const dispatch = useDispatch();
    const data = props.navigation.getParam('data', "12")
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [pickerOption, setOption] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState(false)
    const [isStart, setSTart] = useState(false)
    const [imagePath, setImagePath] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [activeSlid, setActiveSlid] = useState(0);
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
        getApis("yes")
    }, [])
    // useEffect(() => {
    //     convertImageToBase64(imageUrl)
    // }, [imageUrl])
    const convertImageToBase64 = async (url) => {
        console.log(url)
        setIsLoading(true)
        const fs = RNFetchBlob.fs;
        let Path = null;
        await RNFetchBlob.config({
            fileCache: true
        })
            .fetch("GET", url)
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
    const getApis = async (value) => {
        setIsLoading(true)
        let seenData = await postGenerSeen(data.id, login.data.id, value)
        await setResponse(seenData)
        await setIsLoading(false)
    }
    const _renderItem = (({ item, index }) => {
        return (
            <View style={{
                width: widthPercentageToDP(48),
                height: heightPercentageToDP(5),
                marginTop: heightPercentageToDP(1),
                marginRight: widthPercentageToDP(2),
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
                    <View style={{ width: "70%", height: "100%", alignItems: "flex-start", justifyContent: "center", }}>
                        <Text style={{
                            fontSize: widthPercentageToDP(2.8),
                            flex: 0,
                            flexWrap: 'wrap',
                            textAlign: "left",
                            fontFamily: "Montserrat-SemiBold",
                            padding: 3
                        }}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </View>
        )
    })
    const shareImage = async (base64) => {
        const shareOptions = {
            title: 'PECEDEX',
            message: 'PECEDEX ' + data.share.info,
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
            dispatch(postGenerImg(login.data.id, data.id, data2))
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
            dispatch(postGenerImg(login.data.id, data.id, data2))
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
        await data.media.forEach((item, index) => {
            if (index == activeSlid) {
                if (item.mediaType === "image") {
                    setImageUrl(item.url)
                }
            }
        });
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
                <View style={{
                    width: "100%",
                    height: heightPercentageToDP(39),
                }}>
                    <Carousel
                        layout={'default'}
                        data={data.media}
                        renderItem={_renderSlider}
                        sliderWidth={(width)}
                        itemWidth={(width)}
                        onSnapToItem={(index) => setActiveSlid(index)}
                    />
                    <TouchableOpacity
                        onPress={() => toggleOption()}
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
                    <View style={styles.tabBar}>
                        <Pagination
                            containerStyle={[styles.tabsContainer, {
                                width: data.media.length < 4 ?
                                    widthPercentageToDP(25)
                                    : data.media.length < 10 ?
                                        widthPercentageToDP(30)
                                        : widthPercentageToDP(60)
                            }]}
                            renderDots={activeIndex => (
                                data.media.map((screen, i) => (
                                    <View
                                        style={{ flex: 1, alignItems: 'center' }}
                                        key={i}>
                                        <View
                                            style={{
                                                width: widthPercentageToDP(2),
                                                height: widthPercentageToDP(2),
                                                borderRadius: widthPercentageToDP(2) / 2,
                                                backgroundColor: activeIndex === i ? blue : white,
                                                marginHorizontal: widthPercentageToDP(-4)
                                            }}
                                        />
                                    </View>
                                ))
                            )}
                            activeDotIndex={activeSlid}
                            dotsLength={data.media.length}
                        />
                    </View>
                </View>
                <View style={styles.shareView}>
                    <View style={{ width: "45%", height: "100%", flexDirection: "row", alignItems: "center" }}>
                        {!Response ?
                            <FastImage
                                source={require('../../Images/85.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(14),
                                    height: heightPercentageToDP(5),
                                    marginLeft: widthPercentageToDP(3)
                                }}
                            />
                            : <TouchableOpacity
                                onPress={() => {
                                    getApis("no")
                                }}
                                style={styles.shareButton}>
                                <FastImage
                                    source={Response.seen === 'yes' ?
                                        require('../../Images/85.png')
                                        : require('../../Images/camera.png')}
                                    resizeMode={FastImage.resizeMode.stretch}
                                    style={{
                                        width: widthPercentageToDP(14),
                                        height: heightPercentageToDP(5),
                                        marginLeft: widthPercentageToDP(3)
                                    }}
                                />
                            </TouchableOpacity>}
                    </View>
                    <View style={{ width: "48%", height: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                        <TouchableOpacity
                            onPress={() => {
                                Linking.openURL(data.videoLink);
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
                        <TouchableOpacity style={styles.shareButton}>
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
                    {data.title}
                </Text>
                <Text style={[styles.smallText, {
                    fontFamily: "MontserratAlternates-BoldItalic"
                }]}>
                    {data.short}
                </Text>
                <View style={{
                    width: data.qualities.length < 2
                        ? "15%"
                        : data.qualities.length < 4 ?
                            "40%"
                            : "80%",
                    height: heightPercentageToDP(4),
                    marginTop: heightPercentageToDP(1),
                    alignItems: "center",
                    //backgroundColor: "red"
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                        {data.qualities.map((item, index) => {
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
                    data={data.icons}
                    numColumns={2}
                    style={{ width: widthPercentageToDP(100), }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={_renderItem}
                />

            </KeyboardAwareScrollView>
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
                        toggleOption()
                        requestCameraPermission()
                    }}
                    okClick={() => {
                        toggleOption()
                        _onLunchGallery()
                    }}
                    title="Seleccione la opción para la foto de perfil"
                    closeBox={() => toggleOption()}
                />
            }
        </SafeAreaView>
    )
}

export default GenreDetail;