import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, Text, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'
import Card from '../../Component/AnimalCard'
import { data } from './data'

const Order = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            >
                <Text style={styles.proInfoTile}>{"FAMILIA CROCODILE"}</Text>
            </FastImage>
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
                                props.navigation.navigate('Genre')
                            }}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Order;