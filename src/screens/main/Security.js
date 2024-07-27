import { View, Text, StyleSheet, Image, TextInput, Dimensions, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import { Switch } from 'react-native-switch'

const { width, height } = Dimensions.get('screen')

const Security = ({ navigation }) => {
    const [securityStates, setSecurityStates] = useState({})

    const arrSecurity = [
        'Face ID',
        'Remember Password',
        'Touch ID',
        'Biometric Auth',
        'Two-Factor Auth',
        'Fingerprint Auth'
    ]

    useEffect(() => {
        const initialStates = {}
        arrSecurity.forEach(item => {
            initialStates[item] = ['Face ID', 'Remember Password', 'Touch ID', 'Fingerprint Auth'].includes(item) ? true : false
        })
        setSecurityStates(initialStates)
    }, [])

    const toggleVisibility = item => {
        setSecurityStates(prevState => ({
            ...prevState,
            [item]: !prevState[item],
        }))
    }

    const renderSecurityComponent = ({ item, index }) => {
        return (
            <View style={styles.viewSecurityContainer}>
                <Text style={styles.txtSecurity}>{item}</Text>
                <Switch
                    value={securityStates[item]}
                    onValueChange={() => toggleVisibility(item)}
                    circleSize={24}
                    barHeight={28}
                    circleBorderWidth={1}
                    circleBorderActiveColor={Colors.orange}
                    circleBorderInactiveColor={Colors.white}
                    backgroundActive={Colors.orange}
                    backgroundInactive={Colors.white}
                    circleActiveColor={Colors.white}
                    circleInActiveColor={Colors.orange}
                    containerStyle={{
                        borderWidth: 1.5,
                        borderColor: Colors.orange,
                        width: 1,
                    }}
                    changeValueImmediately={true}
                    innerCircleStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 1,

                    }}
                    renderActiveText={false}
                    renderInActiveText={false}
                    switchWidthMultiplier={2.2}
                    switchBorderRadius={25}
                />
            </View>
        )
    }

    const renderSeparator = () => {
        return (
            <View style={styles.marginLimit} />
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Security`}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    color={Colors.black}
                    borderBottomColor={Colors.mediumGrey}
                    borderBottomWidth={0.5}

                    leftIcon={Icons.back}
                    leftIconSize={18}
                    leftIconLeft={10}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}

                // Right menu from EditProfile page
                />
            </View>

            <FlatList
                data={arrSecurity}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderSecurityComponent}
                contentContainerStyle={{
                    // backgroundColor: Colors.red,
                    borderRadius: 12,
                    marginHorizontal: 30,

                    borderColor: Colors.mediumGrey,
                    borderWidth: 0.7,
                    marginTop: 20
                }}
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )
}

export default Security

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



    viewSecurityContainer: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    marginLimit: {
        backgroundColor: Colors.red,
        height: 0.5,
        width: width - 100,
        alignSelf: 'center'
    },
    txtSecurity: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 20,
        color: Colors.black,
    }

})