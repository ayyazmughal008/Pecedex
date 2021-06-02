import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { SliderBox } from "react-native-image-slider-box";
import { blue, white } from '../../config/color'
import Icon from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'

const PeciosDetail = (props) => {
    const images = [
        require('../../Images/sink.jpg'),
        require('../../Images/sink2.jpg'),
        require('../../Images/sink.jpg'),
        require('../../Images/sink2.jpg'),
        require('../../Images/sink.jpg'),
        require('../../Images/sink2.jpg'),
    ]
    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: "100%",
                height: heightPercentageToDP(40)
            }}>
                <SliderBox
                    ImageComponent={FastImage}
                    images={images}
                    sliderBoxHeight={heightPercentageToDP(40)}
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
                    <Icon
                        name="image"
                        color={white}
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.shareView}>
                <View style={{ width: "50%", height: "100%", justifyContent: "center" }}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Entypo
                            name="camera"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "50%", height: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Entypo
                            name="youtube"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <Icon
                            name="wordpress"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.shareButton, { marginRight: 5 }]}>
                        <Ionicons
                            name="share-social"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={[styles.proInfoTile, { alignSelf: "center", color: blue, marginTop: 10 }]}>
                {"SS Thistlegorm"}
            </Text>
            <Text style={styles.smallText}>
                {"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text"}
            </Text>
            <FastImage
                source={require('../../Images/line.png')}
                style={{ width: widthPercentageToDP(90), height: widthPercentageToDP(0.5), alignSelf: "center" }}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Entypo
                            name="youtube"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                        {"Hasta 40 metros"}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Entypo
                            name="youtube"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.smallText,{flex: 1, flexWrap: 'wrap'}]}>
                        {"120 metros"}
                    </Text>
                </View>
            </View>
            <View style={{ width: "95%", alignSelf: "center", flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Entypo
                            name="youtube"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                        {"47 metros"}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", width: "48%" }}>
                    <TouchableOpacity style={styles.shareButton}>
                        <Ionicons
                            name="earth"
                            color={white}
                            size={30}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                        {"Australia"}
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PeciosDetail;