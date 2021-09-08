import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { heightPercentageToDP, widthPercentageToDP } from '../../Component/MakeMeResponsive'
import { black, blue, blue2, white, } from '../../config/color'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { getGenreDetails } from '../../Redux/action'
import { useDispatch, useSelector } from 'react-redux';
//import { data } from './data'
import { SliderBox } from "react-native-image-slider-box";
import Card from '../../Component/NewCard'
import Strings from '../../Translation'

const NewScreen = (props) => {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const [genreId, setId] = useState('')
    const data = props.navigation.getParam('data', '123')
    useEffect(() => {
        if (genreId) {
            getGenreApi()
        }
    }, [genreId])

    const getGenreApi = async () => {
        setIsLoading(true)
        await getGenreDetails(genreId, login.data.id)
        await setIsLoading(false)
    }

    return (
        <View style={[styles.container, { alignItems: "center" }]}>
            <KeyboardAwareScrollView>
                <View style={{ width: "100%", height: heightPercentageToDP(35) }}>
                    <SliderBox
                        ImageComponent={FastImage}
                        images={data.images}
                        sliderBoxHeight={heightPercentageToDP(35)}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor={blue}
                        inactiveDotColor={white}
                        dotStyle={{
                            width: 13,
                            height: 13,
                            borderRadius: 13,
                            marginHorizontal: -7,
                            padding: 0,
                            margin: 0
                        }}
                    />
                </View>
                <Text style={styles.proInfoTile2}>
                    {data.title}
                </Text>
                <Text style={styles.smallText3}>
                    {data.city}{" ( "}{data.country}{" )"}
                </Text>
                <Text style={styles.description}>
                    {data.description}
                </Text>
                <View style={styles.waveView}>
                    <FastImage
                        source={require('../../Images/wave1.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.smallIcon}
                    />
                    <Text style={[styles.description, {
                        color: blue,
                        marginLeft: widthPercentageToDP(7)
                    }]}>
                        {data.sea}
                    </Text>
                </View>
                <Text style={[styles.smallText3, { marginTop: heightPercentageToDP(2) }]}>
                    {Strings.depth}{": "}
                    <Text style={[styles.smallText3, { color: blue }]}>
                        {data.deep}
                    </Text>
                </Text>
                <Text style={[styles.smallText3, { padding: 0 }]}>
                    {Strings.type_of_dives}{": "}
                    <Text style={[styles.smallText3, { color: blue }]}>
                        {data.type}
                    </Text>
                </Text>
                <Text style={[styles.smallText3, { marginTop: heightPercentageToDP(2) }]}>
                    {Strings.difficulty}{":"}
                </Text>
                <View style={styles.difficultBarView}>
                    <View style={[styles.barValue, {
                        backgroundColor: "#00be12",
                        width: "33.3%",
                        opacity: data.level === 'low' ? 1 : 0.3
                    }]}>
                        <Text style={styles.smallText}>
                            {Strings.short}
                        </Text>
                    </View>
                    <View style={[styles.barValue, {
                        backgroundColor: "#f7d619",
                        width: "33.3%",
                        opacity: data.level === 'medium' ? 1 : 0.3
                    }]}>
                        <Text style={styles.smallText}>
                            {Strings.half}
                        </Text>
                    </View>
                    <View style={[styles.barValue, {
                        backgroundColor: "#c01422",
                        width: "33.3%",
                        opacity: data.level === 'high' ? 1 : 0.3
                    }]}>
                        <Text style={styles.smallText}>
                            {Strings.high}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewLine}>
                    <FastImage
                        source={require('../../Images/wave1.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={styles.smallIcon}
                    />
                    <View style={{ marginLeft: widthPercentageToDP(15) }}>
                        <Text style={[styles.smallText3, { padding: 0 }]}>
                            {"Suelo: "}
                            <Text style={[styles.smallText3, { padding: 0, color: blue }]}>
                                {data.usually}
                            </Text>
                        </Text>
                        <Text style={[styles.smallText3, { padding: 0 }]}>
                            {"Salinidad: "}
                            <Text style={[styles.smallText3, { padding: 0, color: blue }]}>
                                {data.salinity}{"%"}
                            </Text>
                        </Text>
                    </View>
                </View>
                <Text style={styles.description}>
                    {data.description2}
                </Text>
                <Card
                    weatherImage={require('../../Images/sun.png')}
                    month={"abr-sep"}
                    aguaTemp={data.waterTemperatureSummer + " 'C"}
                    aireTemp={data.airTemperatureSummer + " 'C"}
                    orrientes={data.currentSummer}
                    animalArray={data.imagesSummer}
                    genreId={genreId => setId(genreId)}
                //roundImage={require('../../Images/108.png')}
                />
                <Card
                    weatherImage={require('../../Images/winter.png')}
                    month={"oct-may"}
                    aguaTemp={data.waterTemperatureWinter + " 'C"}
                    aireTemp={data.airTemperatureWinter + " 'C"}
                    orrientes={data.currentWinter}
                    animalArray={data.imagesWinter}
                    genreId={genreId => setId(genreId)}
                />
            </KeyboardAwareScrollView>
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
        </View>
    )
}


export default NewScreen;