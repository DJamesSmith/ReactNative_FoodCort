import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Animated, Easing, StyleSheet, Dimensions } from 'react-native'
import { Colors } from '../themes/Colors'
import { Fonts } from '../themes/Fonts'

const { width, height } = Dimensions.get('screen')

const SwitchSelector = ({ onSegmentChange, isSelected }) => {

    const [toggleAnimation] = useState(new Animated.Value(isSelected ? 0 : 1))

    useEffect(() => {
        Animated.timing(toggleAnimation, {
            toValue: isSelected ? 1 : 0,
            duration: 300,
            easing: Easing.easing,
            useNativeDriver: true,
        }).start()
    }, [isSelected])

    const animatedTranslateX = toggleAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, (width / 2) - 20],
    })

    const handleToggle = value => {
        if ((isSelected && value === 'History') || (!isSelected && value === 'My Order')) {
            onSegmentChange(isSelected ? 'My Order' : 'History')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.switchBackground}>
                <Animated.View
                    style={[
                        styles.switchHandle,
                        { transform: [{ translateX: animatedTranslateX }] },
                    ]}
                />
                <TouchableOpacity
                    onPress={() => handleToggle('History')} activeOpacity={1}
                    style={[styles.segment, isSelected && styles.selectedSegment]}>
                    <Text style={[styles.switchText, isSelected && styles.selectedText]}>My Order</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleToggle('My Order')} activeOpacity={1}
                    style={[styles.segment, !isSelected && styles.selectedSegment]}>
                    <Text style={[styles.switchText, !isSelected && styles.selectedText]}>History</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    switchBackground: {
        backgroundColor: Colors.lightGrey,
        flexDirection: 'row',
        height: 60,
        width: width - 30,
        borderRadius: 15,
        overflow: 'hidden',
        alignItems: 'center',
    },
    switchHandle: {
        backgroundColor: Colors.white,
        height: 50,
        width: (width / 2) - 30,
        borderRadius: 15,
        position: 'absolute',
        zIndex: 1,
        left: 10,

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 8,
    },
    segment: {
        // backgroundColor: Colors.green,
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        margin: 1,
    },
    switchText: {
        textAlign: 'center',
        color: Colors.orange,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 18
    },
    selectedText: {
        color: Colors.grey,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 18
    },
    selectedSegment: {
        // backgroundColor: Colors.blue,
    },
})

export default SwitchSelector