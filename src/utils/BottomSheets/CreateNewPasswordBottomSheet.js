import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BottomSheetModal from '../../components/BottomSheetModal'
import CustomTextInput from '../../components/CustomTextInput'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { windowWidth } from '../../../App'
import { Icons } from '../../themes/Icons'
import CustomButton from '../../components/CustomButton'

const CreateNewPasswordBottomSheet = ({ isPasswordModalVisible, setIsPasswordModalVisible, handlePasswordSubmit, onInputChange, loading = false }) => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordErrors, setPasswordErrors] = useState({})

    // console.log(`\n\n\n\npassword: ${password}\nconfirmPassword: ${confirmPassword}`)

    const handlePasswordChange = text => {
        setPassword(text)
        onInputChange(text, confirmPassword)
        validatePassword(text, confirmPassword)
    }

    const handleConfirmPasswordChange = text => {
        setConfirmPassword(text)
        onInputChange(password, text)
        validatePassword(password, text)
    }

    const validatePassword = (newPassword, confirmNewPassword) => {
        const errors = {}

        if (newPassword.length < 6) {
            errors.minLength = 'Password must be at least 6 characters long'
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            errors.specialChar = 'Password must contain at least one special character'
        }

        if (!/[A-Z]/.test(newPassword)) {
            errors.uppercase = 'Password must contain at least one uppercase letter'
        }

        if (!/[a-z]/.test(newPassword)) {
            errors.lowercase = 'Password must contain at least one lowercase letter'
        }

        if (!/\d/.test(newPassword)) {
            errors.number = 'Password must contain at least one number'
        }

        if (newPassword !== confirmNewPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }

        setPasswordErrors(errors)
        onInputChange(newPassword, confirmNewPassword)
    }

    const btnHandleSubmitPassword = () => {
        setIsPasswordModalVisible(true)
        handlePasswordSubmit()
    }

    return (
        <>
            <BottomSheetModal
                modalVisible={isPasswordModalVisible}
                backgroundColor={Colors.white}
                height={450}
                borderTopLeftRadius={normalize(20)}
                borderTopRightRadius={normalize(20)}
                onBackdropPress={() => setIsPasswordModalVisible(false)}>
                <TouchableOpacity onPress={() => setIsPasswordModalVisible(false)} style={{ width: windowWidth }}><View style={styles.closeBar}></View></TouchableOpacity>
                <View style={styles.bottomSheetContainer}>
                    <Text style={styles.txtPasswordHeader}>Create New Password</Text>
                    <Text style={styles.txtPasswordSubheader}>Enter your new password and confirm.</Text>

                    <CustomTextInput
                        label={`New Password`}
                        icon={Icons.password}
                        secureTextEntry={true}
                        placeholder={'Enter new password'}
                        value={password}
                        onChangeText={text => handlePasswordChange(text)}
                    />
                    {passwordErrors.minLength && <Text style={styles.txtValidation}>{passwordErrors.minLength}</Text>}
                    {passwordErrors.specialChar && <Text style={styles.txtValidation}>{passwordErrors.specialChar}</Text>}
                    {passwordErrors.uppercase && <Text style={styles.txtValidation}>{passwordErrors.uppercase}</Text>}
                    {passwordErrors.lowercase && <Text style={styles.txtValidation}>{passwordErrors.lowercase}</Text>}
                    {passwordErrors.number && <Text style={styles.txtValidation}>{passwordErrors.number}</Text>}

                    <CustomTextInput
                        label={`Confirm Password`}
                        icon={Icons.password}
                        secureTextEntry={true}
                        placeholder={'Confirm new password'}
                        value={confirmPassword}
                        onChangeText={text => handleConfirmPasswordChange(text)}
                    />
                    {passwordErrors.confirmPassword ? <Text style={styles.txtValidation}>{passwordErrors.confirmPassword}</Text> : null}

                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Change Password`}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        fontSize={18}
                        marginTop={30}
                        alignItems={'center'}
                        loading={loading}
                        onPressFunc={btnHandleSubmitPassword}
                    />
                </View>
            </BottomSheetModal>
        </>
    )
}

export default CreateNewPasswordBottomSheet

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
    txtPasswordHeader: {
        fontSize: 24,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold
    },
    txtPasswordSubheader: {
        fontSize: 18,
        color: Colors.mediumGrey,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        top: -5,
        marginBottom: 20
    },

})