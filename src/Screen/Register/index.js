import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { green, white } from '../../config/color'
import { useDispatch, useSelector } from 'react-redux';
import { temLogin } from '../../Redux/action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'

const Register = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [certificate, setCertificate] = useState("")
    const [email, setEMail] = useState("")
    const [passVisible, setPassVisible] = useState(true)
    const showPassword = () => {
        setPassVisible(!passVisible)
    }

    useEffect(() => {
        Strings.setLanguage('en')
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                style={styles.topImg}
                source={require('../../Images/topImag.png')}
                resizeMode={FastImage.resizeMode.stretch}
            />
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
                    <View style={styles.inputView}>
                        <TextInput
                            placeholder={Strings.certificate}
                            placeholderTextColor="#ffff"
                            style={styles.input}
                            onChangeText={text => setCertificate(text)}
                            keyboardType="email-address"
                            autoCapitalize="none"
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
                        onPress={() => dispatch(temLogin(true))}
                    >
                        <Text style={styles.btnText}>
                            {Strings.register}
                        </Text>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
            </View>

        </SafeAreaView>
    )
}

export default Register