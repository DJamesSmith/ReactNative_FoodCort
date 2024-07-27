import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'
import NetworkStatus from '../../utils/helpers/NetworkStatus'

const Chat = ({ navigation }) => {
    return (
        <NetworkStatus headerTitle={`Chat`}>
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Header
                        backgroundColor={Colors.transparent}
                        title={`Chat`}
                        fontSize={20}
                        titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                        color={Colors.black}
                        borderBottomColor={Colors.mediumGrey}
                        borderBottomWidth={0.5}

                        leftIcon={Icons.back}
                        leftIconLeft={10}
                        leftIconSize={18}
                        leftIconTintColor={Colors.grey}
                        onLeftPress={() => navigation.goBack()}
                    />
                </View>
            </View>
        </NetworkStatus>
    )
}

export default Chat

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        backgroundColor: Colors.transparent,
        width: '100%',
        paddingTop: 20,
    },
})