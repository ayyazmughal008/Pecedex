import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ActivityIndicator, PermissionsAndroid } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { black, blue, white } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker';
import { postProfileImg, getSeenCount } from '../../Redux/action'
import Picker from './Picker'

const Profile = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [isLoading, setIsLoading] = useState(false)
    const [pickerOption, setOption] = useState(false)
    const [Response, setResponse] = useState('')

    useEffect(() => {
        getCount();
    }, [])
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
            dispatch(postProfileImg(login.data.id, data))
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
            dispatch(postProfileImg(login.data.id, data))
        }).catch(error => {
            console.log(error);
        })
    }
    const getCount = async () => {
        setIsLoading(true)
        let menuData = await getSeenCount(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const toggleOption = () => {
        setOption(!pickerOption)
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={require('../../Images/top.png')}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={styles.profileImgView}>
                    {!login.data.image ?
                        <FastImage
                            style={styles.profileImg}
                            source={require('../../Images/profile_img5.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        : <FastImage
                            style={styles.profileImg}
                            source={{ uri: "http://199.247.13.90/" + login.data.image }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    }
                    <TouchableOpacity
                        onPress={() => {
                            toggleOption()
                        }}
                        style={{
                            position: "absolute",
                            right: "14%",
                            bottom: "5%"
                        }}
                    >
                        <Feather
                            name="edit"
                            color={blue}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.profileView}>
                    <Text style={styles.profileName}>
                        {login.data.name}
                    </Text>
                    <Text style={styles.btnText}>
                        {"PADI advance Open Water Diver"}
                    </Text>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/seaCap.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <Text
                            style={styles.proInfoTile}
                            onPress={() => props.navigation.navigate('Dive')}
                        >
                            {"526 Inmersiones"}
                        </Text>
                    </View>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/fish.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        {!Response ?
                            <Text
                                style={styles.proInfoTile}
                            //onPress={() => props.navigation.navigate('AnimalSeen')} 
                            >
                                {"0 / 0 animal vistos"}
                            </Text>
                            : <Text
                                style={styles.proInfoTile}
                                onPress={() => props.navigation.navigate('AnimalSeen')} >
                                {Response.genresCount}{" / "}{Response.genresCountTotal}{" animal vistos"}
                            </Text>}
                    </View>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/ship.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        {!Response ?
                            <Text
                                style={styles.proInfoTile}
                            //onPress={() => props.navigation.navigate('Pecios')}
                            >
                                {"0 / 0 pecios vistos"}
                            </Text>
                            : <Text
                                style={styles.proInfoTile}
                                onPress={() => props.navigation.navigate('Pecios', {
                                    isSeen: true
                                })}>
                                {Response.peciosCount}{" / "}{Response.peciosCountTotal}{" pecios vistos"}
                            </Text>
                        }
                    </View>
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
                <Text style={[styles.profileName, { color: black, fontSize: widthPercentageToDP(4.5), alignSelf: "center" }]}>
                    {"PUNTUACION"}
                </Text>
                <Text
                    style={[styles.profileName, { color: blue, fontSize: widthPercentageToDP(6.5), alignSelf: "center" }]}
                    onPress={() => props.navigation.navigate('Ranking')}
                >
                    {"000001536"}
                </Text>
                <FastImage
                    source={require('../../Images/line.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
                <Text style={[styles.profileName, {
                    color: blue,
                    marginLeft: widthPercentageToDP(10)
                }]}>
                    {"PHOTOS"}
                </Text>
                <FlatList
                    data={[{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 },]}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", marginTop: 10 }}
                    numColumns={3}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    width: widthPercentageToDP(26),
                                    height: heightPercentageToDP(13),
                                    margin: 5,
                                }}
                                onPress={() => props.navigation.navigate('Detail')}
                            >
                                <FastImage
                                    source={require('../../Images/carocodile.jpg')}
                                    style={{
                                        width: widthPercentageToDP(26),
                                        height: heightPercentageToDP(13),
                                        //margin: 5,
                                        borderRadius: widthPercentageToDP(4)
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                            </TouchableOpacity>
                        )
                    }}
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

export default Profile;