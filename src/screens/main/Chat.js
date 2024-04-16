import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'

const ChatPage = () => {
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
            }}> Chat Page </Text>
        </View>
    )
}

export default ChatPage