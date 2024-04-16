import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'

const SupportFeedbackPage = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.lightGreen,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 28,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8
            }}> Support & Feedback Page </Text>
        </View>
    )
}

export default SupportFeedbackPage