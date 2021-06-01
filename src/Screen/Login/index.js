import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { green, white } from '../../config/color'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'

const Login = (props) => {
    const [name, setName] = useState("")
    const [pass, setPassword] = useState("")
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
                        {Strings.signin}
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
                                        style={{marginLeft:5}}
                                    />
                                    : <Icon
                                        name="eye"
                                        color="#ffff"
                                        size={25}
                                        style={{marginLeft:5}}
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

        </SafeAreaView>
    )
}

export default Login