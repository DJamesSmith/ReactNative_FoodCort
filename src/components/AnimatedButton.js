import { View, Text, TouchableOpacity, Animated, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '../themes/Colors'
import { Fonts } from '../themes/Fonts'

const AnimatedButton = ({
    title,
    onPress,
    leftIcon,
    leftIconSize,
    leftIconLeft,
    rightIcon,
    rightIconSize,
    rightIconRight,
}) => {

    const anim = useRef(new Animated.Value(0)).current
    const [isAnim, setIsAnim] = useState(false)

    function animation() {
        Animated.timing(anim, {
            toValue: isAnim ? 0 : 1,
            duration: 50,
            useNativeDriver: true,
        }).start()

        setIsAnim(!isAnim)
    }

    const backgroundColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.white, Colors.lightOrange3]
    })

    const borderColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.transparent, Colors.orange]
    })

    const rightIcontintColor = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [Colors.mediumGrey, Colors.grey]
    })

    const scale = anim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.9]
    })

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            onPressIn={() => animation()}
            onPressOut={() => animation()}
            style={{
                // backgroundColor: Colors.red,
                width: '100%',
                height: 45,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
            <Animated.View style={{
                backgroundColor: backgroundColor,
                width: '100%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 8,
                alignSelf: 'center',
                flexDirection: 'row',
                borderColor: borderColor,
                borderWidth: 0.7,
                transform: [{
                    scale: scale
                }]
            }}>

                <Animated.Image
                    source={leftIcon}
                    style={{
                        height: leftIconSize,
                        width: leftIconSize,
                        resizeMode: 'contain',
                        position: 'absolute',
                        left: leftIconLeft
                    }}
                />
                <Animated.Text style={{
                    color: Colors.grey,
                    fontSize: 20,
                    fontWeight: '400',
                    position: 'absolute',
                    fontFamily: Fonts.SF_Compact_Rounded_Medium,
                    left: 50,
                    top: 7
                }}>{title}</Animated.Text>
                <Animated.Image
                    source={rightIcon}
                    style={{
                        height: rightIconSize,
                        width: rightIconSize,
                        resizeMode: 'contain',
                        position: 'absolute',
                        tintColor: rightIcontintColor,
                        right: rightIconRight
                    }}
                />

            </Animated.View>
        </TouchableOpacity>
    )
}

export default AnimatedButton