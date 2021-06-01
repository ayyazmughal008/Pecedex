import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/PeciosCard'
import { data } from './data'

const Map = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
                <Text style={styles.proInfoTile}>{"PECIOS"}</Text>
            </FastImage>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: "center", marginTop: 15 }}
                keyExtractor={(item, index) => "unique" + index}
                renderItem={({ item, index }) => {
                    return (
                        <Card
                            title={item.title}
                            animalImg={item.img}
                            shortText={item.short}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Map;