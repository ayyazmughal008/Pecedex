import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import { userLogin, updatePassword, sendEmailToUser } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
import { black, green, white } from '../../config/color'
import Icon from 'react-native-vector-icons/FontAwesome'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';


const CELL_COUNT = 4;
const FOrgotPassword = (param) => {
    const dispatch = useDispatch();
    const AuthLoading = useSelector((state) => state.user.AuthLoading);
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const language = useSelector((state) => state.user.language);
    const [email, setEmail] = useState("")
    const [response, setResponse] = useState("")
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        if (!language) {
            Strings.setLanguage('es')
        } else {
            Strings.setLanguage(language)
        }
    }, [language])
    useEffect(() => {
        if (response) {
            console.log(response);
        }
    }, [response])
    const emailSendApi = async () => {
        setIsLoading(true)
        const result = await sendEmailToUser(email)
        await setResponse(result)
        //await setEmail("")
        await setIsLoading(false)
    }
    const _onSubmit = () => {
        const validate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!validate.test(email)) {
            Alert.alert("", Strings.reg4)
            return
        }
        emailSendApi()
    }
    const _onCodeVerify = () => {
        if (response.data == value) {
            param.navigation.navigate('UpdatePassword', {
                email: email
            })
        } else {
            console.log('not Match')
        }
        // emailSendApi()
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

                    {!response ?
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
                                    value={email}
                                    onChangeText={text => setEmail(text)}
                                    // secureTextEntry={passVisible}
                                    // password={passVisible}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
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
                        : <View style={styles.forgetView1}>
                            <Text style={[styles.loginTitle, { margin: 10, alignSelf: "center", textAlign: 'center' }]}>
                                {Strings.verification_text}
                            </Text>
                            <CodeField
                                ref={ref}
                                {...props}
                                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                                value={value}
                                onChangeText={setValue}
                                cellCount={CELL_COUNT}
                                rootStyle={styles.codeFieldRoot}
                                keyboardType="number-pad"
                                textContentType="oneTimeCode"
                                renderCell={({ index, symbol, isFocused }) => (
                                    <Text
                                        key={index}
                                        style={[styles.cell, isFocused && styles.focusCell]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />
                            <TouchableOpacity
                                style={[styles.inputView, {
                                    backgroundColor: green,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: heightPercentageToDP(2),
                                    width: widthPercentageToDP(70),
                                }]}
                                onPress={() => _onCodeVerify()}
                            >
                                <Text style={styles.btnText}>
                                    {Strings.update}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
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

export default FOrgotPassword