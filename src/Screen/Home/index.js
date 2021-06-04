import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Strings from '../../Translation'
import Icon from 'react-native-vector-icons/EvilIcons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { widthPercentageToDP } from '../../Component/MakeMeResponsive'
import Card from '../../Component/AnimalCard'
import { data } from './data'
import { ListItem } from 'react-native-elements/dist/list/ListItem'

const Home = (props) => {
    const [searchtxt, setSearch] = useState("")
    useEffect(() => {
        Strings.setLanguage('en')
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <FastImage
                    source={require('../../Images/top.png')}
                    style={styles.top}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={[styles.inputView, {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    alignSelf: "center",
                    marginTop: 5
                }]}>
                    <TextInput
                        placeholder={Strings.search}
                        placeholderTextColor="#ffff"
                        style={styles.input2}
                        onChangeText={text => setSearch(text)}
                        keyboardType="email-address"
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
                        // onPress={() => showPassword()}
                        >
                            <Icon
                                name="search"
                                color="#ffff"
                                size={25}
                                style={{ marginLeft: 5 }}
                            />

                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center" }}
                    keyExtractor={(item, index) => "unique" + index}
                    renderItem={({ item, index }) => {
                        return (
                            <Card
                                title={item.title}
                                animalImg={item.animalImg}
                                clickHandler={() => {
                                    if (index == 0) {
                                        props.navigation.navigate('Pecios')
                                    } else if (index == 1) {
                                        props.navigation.navigate('Animal')
                                    } else if (index == 2) {
                                        props.navigation.navigate('LogBook')
                                    }
                                }}
                            />
                        )
                    }}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Home;