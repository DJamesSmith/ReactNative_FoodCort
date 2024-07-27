import React from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import { BlurView } from '@react-native-community/blur'
import { Icons } from '../../themes/Icons'

const OptionsModal = ({
    visible,
    onClose,
    title,
    question,

    leftBGColor,
    leftTitle,
    onLeftPress,

    rightBGColor,
    rightTitle,
    onRightPress,
}) => {
    return (
        <Modal
            transparent={true}
            animationType='fade'
            visible={visible}
            onRequestClose={onClose}>
            <BlurView
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                blurType='light'
                blurAmount={2}
                reducedTransparencyFallbackColor={Colors.white}
            />
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>

                    <TouchableOpacity style={styles.btnClose} onPress={onClose}>
                        <Image
                            source={Icons.close}
                            style={styles.imgClose}
                        />
                    </TouchableOpacity>

                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalMessage}>{question}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.cancelButton, { backgroundColor: leftBGColor }]} onPress={onLeftPress}>
                            <Text style={styles.buttonText}>{leftTitle}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.confirmButton, { backgroundColor: rightBGColor }]} onPress={onRightPress}>
                            <Text style={styles.buttonText}>{rightTitle}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default OptionsModal

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
    },
    btnClose: {
        // backgroundColor: Colors.red,
        height: 24,
        width: 24,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        position: 'absolute',
        top: 10,
        right: 10,
    },
    imgClose: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        tintColor: Colors.red
    },






    modalTitle: {
        fontSize: 18,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        marginBottom: 10,
        color: Colors.orange,
        // top: 5
    },
    modalMessage: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: Colors.mediumGrey,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: Colors.orange,
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
    },

})