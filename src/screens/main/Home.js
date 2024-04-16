import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { Icons } from '../../themes/Icons'
import { Colors } from '../../themes/Colors'
import { NavigationContainer } from '@react-navigation/native'
import MyStatusBar from '../../utils/MyStatusBar'

const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <TouchableOpacity
                style={styles.btnMenu}
                onPress={() => navigation.openDrawer()}>
                <Image
                    source={Icons.menu}
                    style={styles.imgBack}
                />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1
    },
    btnMenu: {
        backgroundColor: Colors.mediumGrey,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 40,
    },
    imgBack: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
})