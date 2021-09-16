import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { userLogin, updatePassword, updateNewPassword } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import { black, green, white } from '../../config/color'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'

const ForgetPWD = (props) => {
    const dispatch = useDispatch();
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const language = useSelector((state) => state.user.language);
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [newConfPass, setNewConfPass] = useState("")
    const [email, setEmail] = useState("")

    const [passVisible, setPassVisible] = useState(true)
    const [passVisible2, setPassVisible2] = useState(true)
    const [passVisible3, setPassVisible3] = useState(true)

    const showPassword = () => {
        setPassVisible(!passVisible)
    }
    const showPassword2 = () => {
        setPassVisible2(!passVisible2)
    }
    const showPassword3 = () => {
        setPassVisible3(!passVisible3)
    }
    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    const updateApi = async () => {
        setIsLoading(true)
        await updateNewPassword(email,newConfPass)
        await setIsLoading(false)
    }
    const _onSubmit = () => {
        const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!validate.test(email)) {
            Alert.alert("", Strings.reg4)
            return
        }
        if (newPass.length < 7) {
            Alert.alert("", "new password should be 8 character long")
            return
        }
        if (newConfPass.length < 7) {
            Alert.alert("", "confirm password should be 8 character long")
            return
        }
        if (newPass !== newConfPass) {
            Alert.alert("", "New and confirm password should be same")
            return
        }
        updateApi()

    }
    return (
        <View style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={{ flex: 1, alignItems: "center" }}>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
                    <View style={styles.forgetView}>
                        <Text style={[styles.loginTitle, { margin: 10, alignSelf: "center" }]}>
                            {Strings.forget_pass1}
                        </Text>
                        <View style={[styles.inputView, {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }]}>
                            <TextInput
                                placeholder={Strings.email}
                                placeholderTextColor="#ffff"
                                style={styles.input2}
                                onChangeText={text => setEmail(text)}
                                //secureTextEntry={passVisible}
                                //password={passVisible}
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
                                placeholder={Strings.new_pass}
                                placeholderTextColor="#ffff"
                                style={styles.input2}
                                onChangeText={text => setNewPass(text)}
                                secureTextEntry={passVisible2}
                                password={passVisible2}
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
                                    onPress={() => showPassword2()}
                                >
                                    {!passVisible2 ?
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
                        <View style={[styles.inputView, {
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between"
                        }]}>
                            <TextInput
                                placeholder={Strings.confirm_new}
                                placeholderTextColor="#ffff"
                                style={styles.input2}
                                onChangeText={text => setNewConfPass(text)}
                                secureTextEntry={passVisible3}
                                password={passVisible3}
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
                                    onPress={() => showPassword3()}
                                >
                                    {!passVisible3 ?
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
                            onPress={() => _onSubmit()}
                        >
                            <Text style={styles.btnText}>
                                {Strings.update}
                            </Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
            </View>
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

export default ForgetPWD