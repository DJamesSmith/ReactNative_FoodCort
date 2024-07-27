import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Animations } from '../themes/Animations'
import LottieView from 'lottie-react-native'
import { Colors } from '../themes/Colors'

const NoData = ({ renderAnimation }) => {
    return (
        <View style={styles.lottieContainer}>
            <LottieView style={{ flex: 1 }} source={renderAnimation} autoPlay loop />
        </View>
    )
}

export default NoData

const styles = StyleSheet.create({
    lottieContainer: {
        // backgroundColor: Colors.blue,
        height: 300,
        aspectRatio: 1,
        alignSelf: 'center'
    },
})