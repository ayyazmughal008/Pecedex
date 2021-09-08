import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { black, blue, blue2, white } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import UpdateCert from './UpdateCertificate'
import { useSelector, useDispatch } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker';
import { postProfileImg, getSeenCount, getUserCertificate, getUserDegree, updateDegrees, deleteUploadImage } from '../../Redux/action'
import Picker from './Picker'
import Strings from '../../Translation'
import AwesomeAlert from 'react-native-awesome-alerts';

const Profile = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [isLoading, setIsLoading] = useState(false)
    const [pickerOption, setOption] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [Response, setResponse] = useState('')
    const [certificateResponse, setCertificateResponse] = useState('')
    const [DegreeResponse, setDegreeResponse] = useState('')
    const [certificate, setCertificate] = useState('')
    const [degree, setDegree] = useState('')
    const [imageId, setId] = useState('')
    const [showAlert, setAlert] = useState(false)
    const language = useSelector((state) => state.user.language);
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
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
    const deleteApi = async (id) => {
        setIsLoading(true)
        await deleteUploadImage(login.data.id, id)
        await setIsLoading(false)
        getCount()
    }
    const toggleOption = () => {
        setOption(!pickerOption)
    }
    const toggleCertificate = () => {
        setIsDialogOpen(!isDialogOpen)
    }
    useEffect(() => {
        getCertificateApi()
    }, [])
    const getCertificateApi = async () => {
        setIsLoading(true)
        let menuData = await getUserCertificate()
        await setCertificateResponse(menuData)
        await setIsLoading(false)
    }
    const getDegreeApi = async (id) => {
        setIsLoading(true)
        let menuData = await getUserDegree(id)
        await setDegreeResponse(menuData)
        await setIsLoading(false)
    }
    const toggleAlert = () => {
        setAlert(!showAlert)
    }
    return (
        <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                <FastImage
                    source={require('../../Images/22.png')}
                    style={styles.top2}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={[styles.profileImgView, {
                    marginTop: heightPercentageToDP(-14)
                }]}>
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
                <View style={[styles.profileView, {
                    height: heightPercentageToDP(30),
                }]}>
                    <TouchableOpacity
                        onPress={() => {
                            toggleCertificate()
                        }}
                        style={{
                            position: "absolute",
                            right: "4%",
                            top: "18%",
                            zIndex: 3
                        }}
                    >
                        <Feather
                            name="edit"
                            color={white}
                            size={25}
                        />
                    </TouchableOpacity>
                    <Text style={styles.profileName}>
                        {login.data.name}
                    </Text>
                    <Text style={[styles.btnText, {
                        paddingLeft: widthPercentageToDP(4),
                        paddingRight: widthPercentageToDP(10),
                        textAlign: "center"
                    }]}>
                        {login.data.certificate}{" "}{login.data.degree}
                    </Text>
                    <View style={styles.profileInfo}>
                        <FastImage
                            source={require('../../Images/seaCap.png')}
                            style={{ width: 35, height: 35 }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text
                            style={styles.proInfoTile}
                            onPress={() => props.navigation.navigate('Dive')}
                        >
                            {!Response ? "0 " + Strings.dives : Response.divesTotal + " " + Strings.dives}
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
                                {"0 / 0 "}{Strings.animal_vistos}
                            </Text>
                            : <Text
                                style={styles.proInfoTile}
                                onPress={() => props.navigation.navigate('AnimalSeen')} >
                                {Response.genresCount}{" / "}{Response.genresCountTotal}{" "} {Strings.animal_vistos}
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
                                {"0 / 0 "}{Strings.pecios_vistos}
                            </Text>
                            : <Text
                                style={styles.proInfoTile}
                                onPress={() => props.navigation.navigate('Pecios', {
                                    isSeen: true
                                })}>
                                {Response.peciosCount}{" / "}{Response.peciosCountTotal}{" "}{Strings.pecios_vistos}
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
                    {Strings.PUNCTUATION}
                </Text>
                {!Response ?
                    <Text
                        style={[styles.profileName, { color: blue, fontSize: widthPercentageToDP(6.5), alignSelf: "center" }]}
                        onPress={() => props.navigation.navigate('Ranking')}
                    >
                        {"0"}
                    </Text>
                    : <Text
                        style={[styles.profileName, { color: blue, fontSize: widthPercentageToDP(6.5), alignSelf: "center" }]}
                        onPress={() => props.navigation.navigate('Ranking')}
                    >
                        {Response.scoreTotal}
                    </Text>
                }
                <FastImage
                    source={require('../../Images/line.png')}
                    resizeMode={FastImage.resizeMode.stretch}
                    style={styles.line}
                />
                <Text style={[styles.profileName, {
                    color: blue,
                    alignSelf: "flex-start",
                    marginLeft: widthPercentageToDP(8)
                }]}>
                    {Strings.PHOTOS}
                </Text>
                {!Response || !Response.photos.length ?
                    <View />
                    : <FlatList
                        data={Response.photos}
                        showsVerticalScrollIndicator={false}
                        style={{ marginTop: 10, width: widthPercentageToDP(85) }}
                        //contentContainerStyle={{ alignItems: "center" }}
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
                                    onPress={() => props.navigation.navigate('Detail', {
                                        data: item.genre
                                    })}
                                    delayLongPress={1000}
                                    onLongPress={() => {
                                        setAlert(true);
                                        setId(item.id)
                                    }}>
                                    <FastImage
                                        source={{ uri: item.image }}
                                        style={{
                                            width: widthPercentageToDP(26),
                                            height: heightPercentageToDP(13),
                                            borderRadius: widthPercentageToDP(4)
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                    />
                                </TouchableOpacity>
                            )
                        }}
                    />}
            </KeyboardAwareScrollView>
            <View style={{ height: heightPercentageToDP(8) }} />
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
            {isDialogOpen &&
                <UpdateCert
                    isDialogOpen={isDialogOpen}
                    closeBox2={() => toggleCertificate()}
                    certificateResponse={certificateResponse}
                    certificate={certificate}
                    setCertificate={(value, index) => {
                        // setCertificate(value);
                        // getDegreeApi(id);
                        if (index !== 0) {
                            setCertificate(value),
                                getDegreeApi(certificateResponse.data[index - 1].id)
                        }
                    }}
                    DegreeResponse={DegreeResponse}
                    degree={degree}
                    setDegree={value => {
                        setDegree(value)
                    }}
                    updateCertDegree={() => {
                        if (!degree) {
                            Alert.alert("", "Seleccione cualquier título")
                            return
                        }
                        toggleCertificate();
                        dispatch(updateDegrees(login.data.id, certificate, degree));
                    }}
                />
            }
            {showAlert &&
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title="Alert"
                    message="Do you really want to delete the image?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="No"
                    confirmText="Yes, delete it"
                    confirmButtonColor={blue}
                    cancelButtonColor={blue2}
                    onCancelPressed={() => {
                        setAlert(false);
                    }}
                    onConfirmPressed={() => {
                        setAlert(false);
                        deleteApi(imageId);
                    }}
                />
            }
        </SafeAreaView>
    )
}

export default Profile;