import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { SliderBox } from "react-native-image-slider-box";
import { black, blue, white } from '../../config/color'
import Tab from '../../Component/BottomTab'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


const PeciosDetail = (props) => {
    const images = [
        require('../../Images/carocodile.jpg'),
        require('../../Images/carocodile.jpg'),
        require('../../Images/carocodile.jpg'),
        require('../../Images/carocodile.jpg'),
        require('../../Images/carocodile.jpg'),
        require('../../Images/carocodile.jpg'),
    ]
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView>
                <View style={{
                    width: "100%",
                    height: heightPercentageToDP(35)
                }}>
                    <SliderBox
                        ImageComponent={FastImage}
                        images={images}
                        sliderBoxHeight={heightPercentageToDP(35)}
                        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                        dotColor={blue}
                        // ImageComponentStyle={{
                        //     opacity: 0.8,
                        //     backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        // }}
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
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: "4%",
                            right: "4%",
                            zIndex: 3
                        }}>
                        <FastImage
                            source={require('../../Images/84.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{ width: widthPercentageToDP(8), height: widthPercentageToDP(8) }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.shareView}>
                    <View style={{ width: "50%", height: "100%", justifyContent: "center" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/85.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(11),
                                    height: heightPercentageToDP(5.5),
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: "50%", height: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/86.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(11),
                                    height: heightPercentageToDP(5.5),
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/87.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(11),
                                    height: heightPercentageToDP(5.5),
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.shareButton, { marginRight: 5 }]}>
                            <FastImage
                                source={require('../../Images/88.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(11),
                                    height: heightPercentageToDP(5.5),
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.proInfoTile, { alignSelf: "center", color: blue, marginTop: 10 }]}>
                    {"Cocodrilo marino"}
                </Text>
                <Text style={styles.smallText}>
                    {"Crocodylus porosus"}
                </Text>
                <View style={{
                    alignSelf: "center", width: widthPercentageToDP(80), flexDirection: "row", alignItems: "center", justifyContent: "space-around"
                }}>
                    <FastImage
                        source={require('../../Images/139.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/140.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/141.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/142.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                    <FastImage
                        source={require('../../Images/143.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{
                            width: widthPercentageToDP(8),
                            height: heightPercentageToDP(4),
                        }}
                    />
                </View>
                <FastImage
                    source={require('../../Images/line.png')}
                    style={{ width: widthPercentageToDP(90), height: widthPercentageToDP(0.5), alignSelf: "center", marginTop: 10, marginBottom: 10 }}
                    resizeMode={FastImage.resizeMode.stretch}
                />
                <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/91.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"Carniviro"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/92.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"5 - 7 metros"}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/93.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"Hasta 520 Kg"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/94.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"Oviparo"}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/95.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"Hasta 40 metros"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/96.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"Aguas Costeras"}
                        </Text>
                    </View>
                </View>
                <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/97.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"150 anos"}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                        <TouchableOpacity style={styles.shareButton}>
                            <FastImage
                                source={require('../../Images/98.png')}
                                resizeMode={FastImage.resizeMode.contain}
                                style={{
                                    width: widthPercentageToDP(8),
                                    height: heightPercentageToDP(4),
                                }}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                            {"Australia"}
                        </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <View style={{ height: heightPercentageToDP(7) }} />
            <Tab
                homeClick={() => props.navigation.dispatch(HomeAction)}
                profileClick={() => props.navigation.dispatch(profileAction)}
                settingClick={() => props.navigation.dispatch(settingAction)}
                mapClick={() => props.navigation.dispatch(mapAction)}
                notiClick={() => props.navigation.dispatch(notificationAction)}
            />
        </SafeAreaView>
    )
}

export default PeciosDetail;