import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { userLogin } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import { black, green, white } from '../../config/color'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'

const Login = (props) => {
    const dispatch = useDispatch();
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const language = useSelector((state) => state.user.language);
    const [name, setName] = useState("")
    const [pass, setPassword] = useState("")
    const [passVisible, setPassVisible] = useState(true)
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

    const _onSubmit = () => {
        const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!validate.test(name)) {
            Alert.alert("", "Please enter a valid email address")
            return
        }
        dispatch(userLogin(
            name, pass
        ))
    }
    return (
        <FastImage
            style={styles.bgImg}
            source={require('../../Images/bg.jpg')}
            resizeMode={FastImage.resizeMode.stretch}
        >
            <View style={styles.loginView}>
                <KeyboardAwareScrollView>
                    <Text style={[styles.loginTitle, { margin: 10, alignSelf: "center" }]}>
                        {Strings.signin}
                    </Text>
                    <View style={styles.inputView}>
                        <TextInput
                            placeholder={Strings.email}
                            placeholderTextColor="#ffff"
                            style={styles.input}
                            onChangeText={text => setName(text)}
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
                        onPress={() => _onSubmit()}
                    >
                        <Text style={styles.btnText}>
                            {Strings.login}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.notMemberText}>
                        {Strings.notMember}
                    </Text>
                    <TouchableOpacity
                        style={[styles.inputView, {
                            backgroundColor: green,
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 5
                        }]}
                        onPress={() => props.navigation.navigate('Register')}
                    >
                        <Text style={styles.btnText}>
                            {Strings.register}
                        </Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>
            {AuthLoading &&
                <ActivityIndicator
                    size="large"
                    color={black}
                    style={styles.loading}
                />
            }
        </FastImage>


    )
}

export default Login