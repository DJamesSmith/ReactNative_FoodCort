import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import BottomSheetModal from '../../components/BottomSheetModal'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import { windowWidth } from '../../../App'
import CustomTextInput from '../../components/CustomTextInput'
import { Icons } from '../../themes/Icons'
import CustomButton from '../../components/CustomButton'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const mobileNumberRegex = /^\+\d{1,15}$/

const ContactVerificationBottomSheet = ({ isVisible, toggleVisibility, handleSendCode, onInputChange, loading = false }) => {

    const [verifyContactUserInfo, setVerifyContactUserInfo] = useState('')
    const [contactVerificationError, setcontactVerificationError] = useState('')

    const contactVerifyInputChange = value => {
        setVerifyContactUserInfo(value)
        onInputChange(value)

        setcontactVerificationError('')

        if (!value.trim()) {
            setcontactVerificationError('Email or phone number is required')
        } else if (emailRegex.test(value)) {
            if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) {
                setcontactVerificationError('Invalid email format. E.g., name@example.com')
            } else {
                setcontactVerificationError('')
            }
        } else if (mobileNumberRegex.test(value)) {
            if (!/^\+\d{1,2}\d{1,10}$/.test(value)) {
                setcontactVerificationError('Invalid phone number format. Include country code (+) and not more than 12 digits.')
            } else {
                setcontactVerificationError('')
            }
        } else {
            setcontactVerificationError('Invalid input. Please enter a valid email or phone number.\nE.g., +91 XXX-XXX-XXXX / name@example.com.')
        }
    }

    const btnHandleSendCode = () => {
        handleSendCode()
    }

    return (
        <>
            <BottomSheetModal
                modalVisible={isVisible}
                backgroundColor={Colors.white}
                height={350}
                borderTopLeftRadius={normalize(20)}
                borderTopRightRadius={normalize(20)}
                onBackdropPress={toggleVisibility}>

                <TouchableOpacity onPress={() => { }} style={{ width: windowWidth }}><View style={styles.closeBar}></View></TouchableOpacity>
                <View style={styles.bottomSheetContainer}>
                    <Text style={styles.txtContactVerifyHeader}>Email Verification</Text>
                    <Text style={styles.txtContactVerifySubheader}>Enter your mail or Phone number</Text>

                    <CustomTextInput
                        label={`Email or Phone Number`}
                        icon={Icons.contact}
                        placeholder={'Enter your Email or Phone Number'}
                        value={verifyContactUserInfo}
                        onChangeText={contactVerifyInputChange}
                    />
                    {contactVerificationError ? <Text style={styles.txtValidation}>{contactVerificationError}</Text> : null}

                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Send Code`}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        fontSize={18}
                        marginTop={30}
                        alignItems={'center'}
                        loading={loading}
                        onPressFunc={btnHandleSendCode}
                    />
                </View>
            </BottomSheetModal>
        </>
    )
}

export default ContactVerificationBottomSheet

export const styles = StyleSheet.create({
    bottomSheetContainer: {
        // backgroundColor: Colors.red,
        flex: 1,
        margin: 20,
    },
    txtValidation: {
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        marginBottom: 5,
        marginTop: -15,
        textAlign: 'right'
    },

    closeBar: {
        backgroundColor: Colors.mediumGrey,
        height: 5,
        width: 50,
        borderRadius: 2.5,
        alignSelf: 'center',
        marginTop: 10
    },
    txtContactVerifyHeader: {
        fontSize: 24,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold
    },
    txtContactVerifySubheader: {
        fontSize: 18,
        color: Colors.mediumGrey,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        top: -5,
        marginBottom: 20
    },
})