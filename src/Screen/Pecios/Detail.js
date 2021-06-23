import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import { widthPercentageToDP, heightPercentageToDP } from '../../Component/MakeMeResponsive'
import { SliderBox } from "react-native-image-slider-box";
import { black, blue, white } from '../../config/color'
import { HomeAction, profileAction, settingAction, mapAction, notificationAction } from '../../Component/BottomTab/actions'
import Tab from '../../Component/BottomTab'
import Share from 'react-native-share';
import { postPecioSeen } from '../../Redux/action'
import { useSelector } from 'react-redux';


const PeciosDetail = (props) => {
    const data = props.navigation.getParam('data', "12")
    const login = useSelector((state) => state.user.login);
    const [isLoading, setIsLoading] = useState(false)
    const _renderItem = (({ item, index }) => {
        return (
            <View style={{ alignItems: "center", marginRight: widthPercentageToDP(1), marginTop: heightPercentageToDP(1) }}>
                <FastImage
                    source={{ uri: item.image }}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                        width: widthPercentageToDP(10),
                        height: heightPercentageToDP(5),
                    }}
                />
                <Text style={[styles.smallText, { flex: 1, flexWrap: 'wrap' }]}>
                    {item.text}
                </Text>

            </View>
        )
    })
    const shareImage = async () => {
        const shareOptions = {
            title: 'PECEDEX',
            message: data.share.info,
            failOnCancel: false,
            url: "http://199.247.13.90/" + data.share.image,
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            console.log(ShareResponse)
            //setResult(JSON.stringify(ShareResponse, null, 2));
        } catch (error) {
            console.log('Error =>', error);
            //setResult('error: '.concat(getErrorString(error)));
        }
    };
    const getApis = async () => {
        setIsLoading(true)
        await postPecioSeen(data.id, login.data.id)
        await setIsLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{
                width: "100%",
                height: heightPercentageToDP(40)
            }}>
                <SliderBox
                    ImageComponent={FastImage}
                    images={data.images}
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
                    <FastImage
                        source={require('../../Images/84.png')}
                        resizeMode={FastImage.resizeMode.contain}
                        style={{ width: widthPercentageToDP(8), height: widthPercentageToDP(8) }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.shareView}>
                <View style={{ width: "60%", height: "100%", justifyContent: "center" }}>
                    <TouchableOpacity
                        onPress={() => {
                            getApis()
                        }}
                        style={styles.shareButton}>
                        <FastImage
                            source={require('../../Images/85.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(8),
                                height: heightPercentageToDP(4),
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "40%", height: "100%", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={() => {
                            Linking.openURL(data.videoLink);
                        }}
                        style={styles.shareButton}>
                        <FastImage
                            source={require('../../Images/86.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(8),
                                height: heightPercentageToDP(4),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.shareButton}>
                        <FastImage
                            source={require('../../Images/87.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(8),
                                height: heightPercentageToDP(4),
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            shareImage()
                        }}
                        style={[styles.shareButton, { marginRight: 5 }]}>
                        <FastImage
                            source={require('../../Images/88.png')}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: widthPercentageToDP(8),
                                height: heightPercentageToDP(4),
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.proInfoTile2}>
                {data.title}
            </Text>
            <Text style={styles.smallText2}>
                {data.description}
            </Text>
            <FastImage
                source={require('../../Images/line.png')}
                style={{ width: widthPercentageToDP(90), height: widthPercentageToDP(0.5), alignSelf: "center" }}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <FlatList
                data={data.icons}
                numColumns={4}
                contentContainerStyle={{ marginTop: heightPercentageToDP(1), alignItems: "center" }}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => "unique" + index}
                renderItem={_renderItem}
            />
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
        </SafeAreaView>
    )
}

export default PeciosDetail;