import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'

const FriendsPage = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.lightTeal,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 28,
                color: 'black',
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8
            }}> Friends Page </Text>
        </View>
    )
}

export default FriendsPage