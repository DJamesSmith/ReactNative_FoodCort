import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { Animations } from '../../themes/Animations'
import LottieView from 'lottie-react-native'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import Header from '../../components/Header'
import { Icons } from '../../themes/Icons'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'

const NetworkStatus = ({ children, headerTitle, homeTitle }) => {
    const navigation = useNavigation()
    const [isConnected, setIsConnected] = useState(true)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected)
        })

        return () => unsubscribe()
    }, [])

    if (!isConnected) {
        return (
            <View style={styles.container}>
                {
                    homeTitle ? <View style={styles.headerBar}>
                        <Header
                            backgroundColor={Colors.transparent}
                            title={homeTitle}
                            fontSize={20}
                            titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                            color={Colors.black}

                            leftIcon={Icons.menu}
                            leftIconSize={18}
                            leftIconLeft={20}
                            leftIconBackgroundColor={Colors.lightGrey}
                            leftIconTintColor={Colors.grey}
                            onLeftPress={() => navigation.openDrawer()}
                        />
                    </View> : null
                }
                {
                    headerTitle ? <View style={styles.headerBar}>
                        <Header
                            backgroundColor={Colors.transparent}
                            title={headerTitle}
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
                        />
                    </View> : <></>
                }
                <View style={styles.viewContent}>
                    <View style={styles.lottieContainer}>
                        <LottieView style={{ flex: 1 }} source={Animations.NoInternetConnection} autoPlay loop />
                    </View>
                    <Text style={styles.txtNoInternet}>No Internet Connection. {`\n`}Please try again later.</Text>
                </View>
            </View>
        )
    }

    return children
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        alignItems: 'center',
    },
    headerBar: {
        backgroundColor: Colors.white,
        width: '100%',
        paddingTop: 20
    },
    viewContent: {
        flex: 1,
        justifyContent: 'center'
    },
    lottieContainer: {
        // backgroundColor: Colors.lightGrey,
        height: 300,
        aspectRatio: 1,
        alignSelf: 'center',

        // borderColor: Colors.mediumGrey,
        // borderWidth: 0.7,
        // borderRadius: 20
    },
    txtNoInternet: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 16,
        color: Colors.mediumGrey,
        textAlign: 'center'
    },
})

export default NetworkStatus