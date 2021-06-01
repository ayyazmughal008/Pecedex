import React, { useEffect, useState } from 'react'
import { SafeAreaView, View, FlatList } from 'react-native'
import { styles } from '../../config/styles'
import Card from '../../Component/NotiicationCard'
import FastImage from 'react-native-fast-image'
import { data } from './data'

const Notification = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                style={{ alignSelf: "center", marginTop: 10 }}
                keyExtractor={(item, index) => "unique" + index}
                renderItem={({ item, index }) => {
                    return (
                        <Card
                            title={item.title}
                            description={item.description}
                        />
                    )
                }}
            />
        </SafeAreaView>
    )
}

export default Notification;