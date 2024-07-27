import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icons } from '../themes/Icons'
import { Colors } from '../themes/Colors'
import { Fonts } from '../themes/Fonts'

const QuantityCounter = ({ BGColor, btnHandleDecrement, btnHandleIncrement, counter, isDisabled }) => {

    const handleDecrement = () => {
        btnHandleDecrement()
    }

    const handleIncrement = () => {
        btnHandleIncrement()
    }

    const isButtonsDisabled = isDisabled === 0

    return (
        <View style={[styles.container, { backgroundColor: BGColor }]}>
            <View style={styles.counterContainer}>
                <TouchableOpacity
                    style={[styles.btnIncDec, {
                        borderTopLeftRadius: 4,
                        borderBottomLeftRadius: 4,
                    }]}
                    disabled={isButtonsDisabled}
                    onPress={handleDecrement}>
                    <View style={styles.viewImgContainer}>
                        <Image
                            source={Icons.minus}
                            style={[styles.imgIncDec, { tintColor: isButtonsDisabled ? Colors.mediumGrey : Colors.black }]}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={[styles.txtCounter, { color: isButtonsDisabled ? Colors.mediumGrey : Colors.black }]}>{counter}</Text>
                <TouchableOpacity
                    style={[styles.btnIncDec, {
                        borderTopRightRadius: 4,
                        borderBottomRightRadius: 4,
                    }]}
                    disabled={isButtonsDisabled}
                    onPress={handleIncrement}>
                    <View style={styles.viewImgContainer}>
                        <Image
                            source={Icons.plus}
                            style={[styles.imgIncDec, { tintColor: isButtonsDisabled ? Colors.mediumGrey : Colors.black }]}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default QuantityCounter

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.lightGrey,
        height: 30,
        width: 100,
        borderRadius: 4
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    },
    btnIncDec: {
        backgroundColor: Colors.lightGrey,
        height: 30,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewImgContainer: {
        backgroundColor: Colors.white,
        height: 22,
        width: 26,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    imgIncDec: {
        // backgroundColor: Colors.blue,
        height: 8,
        width: 8,
        resizeMode: 'contain',
        tintColor: Colors.black,
    },
    txtCounter: {
        fontSize: 22,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.black,
        top: -2
    }
})