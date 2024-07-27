import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Animations } from '../themes/Animations'
import LottieView from 'lottie-react-native'
import { Colors } from '../themes/Colors'

const ComponentLoader = ({ renderAnimation, marginLeft }) => {
    return (
        <View style={[styles.lottieContainer, { marginLeft: marginLeft }]}>
            <LottieView style={{ flex: 1 }} source={renderAnimation} autoPlay loop />
        </View>
    )
}

export default ComponentLoader

const styles = StyleSheet.create({
    lottieContainer: {
        // backgroundColor: Colors.blue,
        height: 150,
        aspectRatio: 1,
        alignSelf: 'center'
    },
})