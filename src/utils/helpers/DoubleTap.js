import React, { useState, useRef } from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from '../../themes/Colors'

const DoubleTapTouchableOpacity = ({ onDoubleTap, children, backgroundColor, marginHorizontal, height, width, borderRadius, overflow }) => {
    const [lastTap, setLastTap] = useState(0)
    const timeoutRef = useRef(null)

    const handlePress = () => {
        const now = Date.now()
        const DOUBLE_PRESS_DELAY = 300 // Adjust this value to your preference (in milliseconds)

        if (now - lastTap < DOUBLE_PRESS_DELAY) {
            clearTimeout(timeoutRef.current)
            onDoubleTap() // Call the onDoubleTap callback if the second tap occurs within the delay
        } else {
            setLastTap(now)
            timeoutRef.current = setTimeout(() => {
                setLastTap(0)       // Reset last tap if the second tap didn't occur within the delay
            }, DOUBLE_PRESS_DELAY)
        }
    }

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.8}
            style={{
                backgroundColor: backgroundColor,
                marginHorizontal: marginHorizontal,
                height: height,
                width: width,
                borderRadius: borderRadius,
                overflow: overflow
            }}>
            {children}
        </TouchableOpacity>
    )
}

export default DoubleTapTouchableOpacity