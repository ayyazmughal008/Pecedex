import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/DiveCard'
import { data } from './data'

const Dive = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
            </FastImage>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                listKey={(item, index) => `_key${index.toString()}`}
                style={{ alignSelf: "center" }}
                keyExtractor={(item, index) => "unique" + index}
                renderItem={({ item, index }) => {
                    return (
                        <Card
                            year={item.year}
                            months={item.months}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Dive;