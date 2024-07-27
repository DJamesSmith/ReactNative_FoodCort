import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'

const { width, height } = Dimensions.get('screen')

const HelpSupport = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Help & Support`}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    color={Colors.black}


                    leftIcon={Icons.back}
                    leftIconSize={18}
                    leftIconLeft={10}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}

                    borderBottomColor={Colors.mediumGrey}
                    borderBottomWidth={0.5}
                />
            </View>




        </View>
    )
}

export default HelpSupport

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        backgroundColor: Colors.white,
        width: '100%',
        paddingTop: 20
    },

})