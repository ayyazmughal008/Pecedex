import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { black, blue, green, white } from '../../config/color'
import { userRegister, getUserCertificate, getUserDegree } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import { temLogin } from '../../Redux/action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import RNPickerSelect from 'react-native-picker-select';

const Register = (props) => {
    const dispatch = useDispatch();
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [certificate, setCertificate] = useState("")
    const [degree, setDegree] = useState("")
    const [email, setEMail] = useState("")
    const [passVisible, setPassVisible] = useState(true)
    const language = useSelector((state) => state.user.language);
    const [isLoading, setIsLoading] = useState(false)
    const [Response, setResponse] = useState('')
    const [DegreeResponse, setDegreeResponse] = useState('')
    const showPassword = () => {
        setPassVisible(!passVisible)
    }
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])

    const _onRegister = () => {
        const validate = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!name) {
            Alert.alert("", Strings.reg1)
            return
        }
        if (!certificate) {
            Alert.alert("", Strings.reg2)
            return
        }
        if (!degree) {
            Alert.alert("", Strings.reg3)
            return
        }
        if (!validate.test(email)) {
            Alert.alert("", Strings.reg4)
            return
        }
        if (password.length < 7) {
            Alert.alert("", Strings.reg5)
            return
        }

        dispatch(userRegister(
            name,
            email,
            password,
            certificate,
            degree
        ))
    }
    useEffect(() => {
        getCertificateApi()
    }, [])
    const getCertificateApi = async () => {
        setIsLoading(true)
        let menuData = await getUserCertificate()
        await setResponse(menuData)
        await setIsLoading(false)
    }
    const getDegreeApi = async (id) => {
        //console.log("come", id)
        setIsLoading(true)
        let menuData = await getUserDegree(id)
        await setDegreeResponse(menuData)
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                style={styles.bgImg}
                source={require('../../Images/b_ground.jpg')}
                resizeMode={FastImage.resizeMode.cover}
            >
                <View style={{ flex: 1 }}>
                    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={[styles.loginView, {
                            height: heightPercentageToDP(45),
                        }]}>
                            <Text style={[styles.loginTitle, { margin: 10, alignSelf: "center" }]}>
                                {Strings.Signup}
                            </Text>
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder={Strings.name}
                                    placeholderTextColor="#ffff"
                                    style={styles.input}
                                    onChangeText={text => setName(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.inputDropdownView}>
                                {!Response || !Response.data.length ?
                                    <View />
                                    : <RNPickerSelect
                                        placeholder={{
                                            label: Strings.certificate,
                                            value: null,
                                            color: "#000"
                                        }}
                                        value={certificate}
                                        style={pickerStyle}
                                        onValueChange={(value, index) => {
                                            if (index !== 0) {
                                                setCertificate(value),
                                                    getDegreeApi(Response.data[index - 1].id)
                                            }
                                        }}
                                        items={Response.data}
                                    />
                                }
                            </View>
                            {!certificate ?
                                <View />
                                : certificate === "Others" ?
                                    <View style={styles.inputDropdownView}>
                                        <TextInput
                                            placeholder={"Degree"}
                                            placeholderTextColor="#ffff"
                                            style={styles.input}
                                            onChangeText={text => setDegree(text)}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    : <View style={styles.inputDropdownView}>
                                        {!DegreeResponse || !DegreeResponse.data.length ?
                                            <View />
                                            : <RNPickerSelect
                                                placeholder={{
                                                    label: "Degree",
                                                    value: null,
                                                    color: "#000"
                                                }}
                                                value={degree}
                                                style={pickerStyle}
                                                onValueChange={value => {
                                                    setDegree(value)
                                                }}
                                                items={DegreeResponse.data}
                                            />}
                                    </View>
                            }
                            <View style={styles.inputView}>
                                <TextInput
                                    placeholder={Strings.email}
                                    placeholderTextColor="#ffff"
                                    style={styles.input}
                                    onChangeText={text => setEMail(text)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={[styles.inputView, {
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between"
                            }]}>
                                <TextInput
                                    placeholder={Strings.password}
                                    placeholderTextColor="#ffff"
                                    style={styles.input2}
                                    onChangeText={text => setPassword(text)}
                                    secureTextEntry={passVisible}
                                    password={passVisible}
                                    //keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                <View style={styles.viewPass}>
                                    <Text style={[styles.btnText, {
                                        fontSize: widthPercentageToDP(6),
                                        marginBottom: 6
                                    }]}>
                                        {"|"}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => showPassword()}
                                    >
                                        {!passVisible ?
                                            <Icon
                                                name="eye-slash"
                                                color="#ffff"
                                                size={25}
                                                style={{ marginLeft: 5 }}
                                            />
                                            : <Icon
                                                name="eye"
                                                color="#ffff"
                                                size={25}
                                                style={{ marginLeft: 5 }}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.inputView, {
                                    backgroundColor: green,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }]}
                                onPress={() => _onRegister()}
                            >
                                <Text style={styles.btnText}>
                                    {Strings.register}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAwareScrollView>
                </View>
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
        </SafeAreaView>
    )
}
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
        //paddingHorizontal: -10,
        //backgroundColor: 'red',
        //borderRadius: 5,
    },
    modalViewBottom: {
        backgroundColor: "#DCDCDC"
    }
};

export default Register