import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator, PermissionsAndroid, Dimensions } from 'react-native'
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
import Carousel from 'react-native-snap-carousel';
const SLIDER_WIDTH = Dimensions.get('window').width;
const { width } = Dimensions.get('window');
import Video from 'react-native-video'


const GenreDetail = (props) => {
    const dispatch = useDispatch();
    const data = props.navigation.getParam('data', "12")
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [pickerOption, setOption] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isStart, setSTart] = useState(false)
    const [activeSlid, setActiveSlid] = useState(0);
    useEffect(() => {
        console.log("My Activie Slide", activeSlid)
    }, [activeSlid])
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    const getApis = async () => {
        setIsLoading(true)
        await postGenerSeen(data.id, login.data.id)
        await setIsLoading(false)
    }
    const _renderItem = (({ item, index }) => {
        return (
            <View style={{ alignItems: "center", marginRight: widthPercentageToDP(1), marginTop: heightPercentageToDP(1) }}>
                <FastImage
                    source={{ uri: item.image }}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        width: widthPercentageToDP(10),
                        height: heightPercentageToDP(5),
                    }}
                />
                <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap', marginTop: 5 }]}>
                    {item.text}
                </Text>

            </View>
        )
    })
    const shareImage = async () => {
        const shareOptions = {
            title: 'PECEDEX',
            message: data.share.info,
            failOnCancel: false,
            url: "http://199.247.13.90/" + data.share.image,
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
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ alignItems: "center" }}>
                <View style={{
                    width: "100%",
                    height: heightPercentageToDP(35),
                }}>
                    {/* <SliderBox
                        ImageComponent={FastImage}
                        images={data.images}
                        sliderBoxHeight={heightPercentageToDP(35)}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor={blue}
                        // ImageComponentStyle={{
                        //     opacity: 0.8,
                        //     backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        // }}
                        inactiveDotColor={white}
                        dotStyle={{
                            width: 13,
                            height: 13,
                            borderRadius: 13,
                            marginHorizontal: -7,
                            padding: 0,
                            margin: 0
                        }}
                    /> */}
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
                </View>
                <View style={styles.shareView}>
                    <View style={{ width: "45%", height: "100%", justifyContent: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                getApis()
                            }}
                            style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/85.png')}
                                resizeMode={FastImage.resizeMode.stretch}
                                style={{
                                    width: widthPercentageToDP(14),
                                    height: heightPercentageToDP(5.5),
                                    marginLeft:widthPercentageToDP(3)
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "40%", height: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
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
                                shareImage()
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
                <Text style={styles.smallText}>
                    {data.description}
                </Text>
                <View style={{
                    alignSelf: "center", width: widthPercentageToDP(80), flexDirection: "row", alignItems: "center", justifyContent: "space-around"
                }}>
                    <FastImage
                        source={require('../../Images/139.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/140.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/141.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/142.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/143.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={{ width: widthPercentageToDP(90), height: widthPercentageToDP(0.5), alignSelf: "center", marginTop: 15, marginBottom: 10 }}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <FlatList
                    data={data.icons}
                    numColumns={4}
                    contentContainerStyle={{ marginTop: heightPercentageToDP(1) }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={_renderItem}
                />

            </KeyboardAwareScrollView>
            <View style={{ height: heightPercentageToDP(7) }} />
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