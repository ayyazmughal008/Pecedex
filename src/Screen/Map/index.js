import React, { useEffect, useState } from 'react'
import { SafeAreaView, View } from 'react-native'
import { styles } from '../../config/styles'
import FastImage from 'react-native-fast-image'

const Map = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <FastImage
                source={require('../../Images/top.png')}
                style={styles.top}
                resizeMode={FastImage.resizeMode.stretch}
            />
        </SafeAreaView>
    )
}

export default Map;