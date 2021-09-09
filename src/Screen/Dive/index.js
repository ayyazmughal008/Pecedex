import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/DiveCard'
import { data } from './data'
import Tab from '../../Component/BottomTab'
import { getUserDives, eraseData, deleteUserDives } from '../../Redux/action'
import { heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Strings from '../../Translation'
import { useSelector, useDispatch } from 'react-redux';
import { black, blue, blue2 } from '../../config/color'
import AwesomeAlert from 'react-native-awesome-alerts';


const Dive = (props) => {
    const language = useSelector((state) => state.user.language);
    const login = useSelector((state) => state.user.login);
    const menuData = useSelector((state) => state.user.menuData);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const [imageId, setId] = useState('')
    const [showAlert, setAlert] = useState(false)
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        getApis();
    }, [])
    useEffect(() => {
        if (imageId) {
            setAlert(true)
        }
    }, [imageId])
    const getApis = async () => {
        setIsLoading(true)
        let menuData = await getUserDives(login.data.id)
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const eraseApis = async () => {
        setIsLoading(true)
        await eraseData(login.data.id)
        await setIsLoading(false)
    }
    const deleteApis = async () => {
        setIsLoading(true)
        await deleteUserDives(login.data.id, imageId)
        await setIsLoading(false)
        getApis()
    }


    return (
        <SafeAreaView style={[styles.container, { alignItems: "center" }]}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
            </FastImage>
            {!Response || !Response.data.length ?
                <View />
                : <FlatList
                    data={Response.data}
                    showsVerticalScrollIndicator={false}
                    listKey={(item, index) => `_key${index.toString()}`}
                    //style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                year={item.year}
                                months={item.months}
                                navigate={props.navigation.navigate}
                                destination="UpdateLogBook"
                                //longPress = {()=> setAlert(true)}
                                longPress={imageId => setId(imageId)}
                            />
                        )
                    }}
                />
            }
            <TouchableOpacity
                onPress={() => {
                    if (menuData.logBlock === 'no') {
                        eraseApis()
                    } else {
                        Alert.alert("Permission Denied", "No permission to access this module")
                    }
                }}
                style={styles.roundButton}>
                <Text style={styles.plusText}>
                    {"+"}
                </Text>
            </TouchableOpacity>
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
            {showAlert &&
                <AwesomeAlert
                    show={showAlert}
                    showProgress={false}
                    title={Strings.Alert}
                    message={Strings.delete_dive}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText={Strings.no}
                    confirmText={Strings.Yes_delete_it}
                    confirmButtonColor={blue}
                    cancelButtonColor={blue2}
                    onCancelPressed={() => {
                        setAlert(false);
                    }}
                    onConfirmPressed={() => {
                        setAlert(false);
                        deleteApis()
                    }}
                />
            }
        </SafeAreaView>
    )
}

export default Dive;