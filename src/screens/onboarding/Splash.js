import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'
import MyStatusBar from '../../utils/MyStatusBar'
import { windowHeight, windowWidth } from '../../../App'
import { Fonts } from '../../themes/Fonts'

const Splash = () => {
    const circles = [
        { size: 600, opacity: 0.25 },
        { size: 500, opacity: 0.5 },
        { size: 425, opacity: 0.75 },
        { size: 360, opacity: 1 }
    ]

    const smallCircles = [
        { size: 7, top: windowHeight / 2.5, left: windowWidth / 1.3, color: Colors.black },
        { size: 3, top: windowHeight / 1.5, left: windowWidth / 3, color: Colors.red },
        { size: 10, top: windowHeight / 1.6, left: windowWidth / 1.5, color: Colors.yellow },
        { size: 8, top: windowHeight / 2.3, left: windowWidth / 3, color: Colors.white },
        { size: 5, top: windowHeight / 2, left: 50, color: Colors.blue },
        { size: 5, top: windowHeight / 2.2, left: windowWidth / 1.8, color: Colors.indigo }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.transparent} barStyle={'dark-content'} />

            {circles.map((circle, index) => (
                <View key={index} style={[styles.circle, { width: circle.size, height: circle.size, opacity: circle.opacity }]}>
                    {index === circles.length - 1 && (
                        <>
                            <Text style={styles.txtBig}> FoodCort </Text>
                            <Text style={styles.txtSmall}> Ordering food is much easier </Text>
                        </>
                    )}
                </View>
            ))}

            {smallCircles.map((dot, index) => (
                <View key={index} style={[styles.dot, { width: dot.size, height: dot.size, top: dot.top, left: dot.left, backgroundColor: Colors.white }]} />
            ))}

            <Text style={styles.txtVersion}>Version 0.0.1</Text>
        </SafeAreaView>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.orange,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        backgroundColor: Colors.orange,
        borderRadius: 300,
        position: 'absolute',
        borderColor: Colors.white,
        borderWidth: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        borderRadius: 50,
        position: 'absolute',
    },
    txtBig: {
        fontSize: 32,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.white,
    },
    txtSmall: {
        fontSize: 16,
        fontFamily: Fonts.SF_Compact_Rounded_Light,
        color: Colors.white,
        textAlign: 'center'
    },
    txtVersion: {
        fontSize: 16,
        color: Colors.white,
        position: 'absolute',
        bottom: 30,
    }
})