import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'

const SettingsPage = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: Colors.lightIndigo,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Text style={{
                fontSize: 28,
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 8
            }}> Settings Page </Text>
        </View>
    )
}

export default SettingsPage