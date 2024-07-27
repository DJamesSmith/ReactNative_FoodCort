import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import { arrLegalPolicy } from '../../assets/Data'

const { width, height } = Dimensions.get('screen')

const LegalPolicies = ({ navigation }) => {

    const renderLegalPolicy = ({ item, index }) => {
        return (
            <View style={styles.viewText}>
                <Text style={styles.txtTitle}>{item?.title}</Text>
                <Text style={styles.txtDescription}>{item?.description}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Legal & Policies`}
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

            <FlatList
                data={arrLegalPolicy}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderLegalPolicy}
                contentContainerStyle={{
                    paddingHorizontal: 25,
                    paddingVertical: 20
                }}
            />

        </View>
    )
}

export default LegalPolicies

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
    viewText: {
        // backgroundColor: Colors.red,
        margin: 1
    },
    txtTitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 22,
        color: Colors.black
    },
    txtDescription: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        color: Colors.mediumGrey,
        marginTop: 10
    },
})