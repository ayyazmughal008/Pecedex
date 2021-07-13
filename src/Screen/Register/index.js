import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { black, blue, green, white } from '../../config/color'
import { userRegister } from '../../Redux/action'
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
    const [email, setEMail] = useState("")
    const [passVisible, setPassVisible] = useState(true)
    const language = useSelector((state) => state.user.language);
    const showPassword = () => {
        setPassVisible(!passVisible)
    }
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('en')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])

    const _onRegister = () => {
        const validate = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!name) {
            Alert.alert("", "Por favor ingrese un nombre valido")
            return
        }
        if (!certificate) {
            Alert.alert("", "Por favor ingrese un certificado válido")
            return
        }
        if (!validate.test(email)) {
            Alert.alert("", "Por favor, introduce una dirección de correo electrónico válida")
            return
        }
        if (password.length < 7) {
            Alert.alert("", "La contraseña debe tener 8 caracteres")
            return
        }

        dispatch(userRegister(
            name,
            email,
            password,
            certificate
        ))
    }

    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                style={styles.bgImg}
                source={require('../../Images/bg.jpg')}
                resizeMode={FastImage.resizeMode.cover}
            >
                <View style={styles.loginView}>
                    <KeyboardAwareScrollView>
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
                            {/* <TextInput
                                placeholder={Strings.certificate}
                                placeholderTextColor="#ffff"
                                style={styles.input}
                                onChangeText={text => setCertificate(text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            /> */}
                            <RNPickerSelect
                                placeholder={{
                                    label: Strings.certificate,
                                    value: null,
                                    color: "#000"
                                }}
                                value={certificate}
                                style={pickerStyle}
                                onValueChange={value => {
                                    setCertificate(value)
                                }}
                                items={[{ label: "value", value: "value" }]}
                            />
                        </View>
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
                    </KeyboardAwareScrollView>
                </View>
                {AuthLoading &&
                    <ActivityIndicator
                        size="small"
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