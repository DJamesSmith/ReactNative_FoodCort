import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Icons } from '../../themes/Icons'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { changePasswordRequest } from '../../redux/reducers/UserReducer'
import SuccessBottomSheet from '../../utils/bottomSheets/SuccessBottomSheet'
import CreateNewPasswordBottomSheet from '../../utils/bottomSheets/CreateNewPasswordBottomSheet'
import OTPVerificationBottomSheet from '../../utils/bottomSheets/OTPVerificationBottomSheet'
import ContactVerificationBottomSheet from '../../utils/bottomSheets/ContactVerificationBottomSheet'
import { forgotPasswordRequest, updatePasswordRequest, validateOTPRequest } from '../../redux/reducers/AuthReducer'

const { height, width } = Dimensions.get('screen')

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const mobileNumberRegex = /^\+\d{1,15}$/

var status = ''

const ChangePassword = ({ navigation }) => {

    const dispatch = useDispatch()
    const UserReducer = useSelector(state => state.UserReducer)
    const AuthReducer = useSelector(state => state.AuthReducer)

    const [formState, setFormState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
        errors: {},
    })

    const onInputChange = (name, value) => {
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }))
        console.log(`${name}: ${value}`)
    }

    const [showEmailVerification, setShowEmailVerification] = useState(false)
    const [isOTPVerificationModalVisible, setIsOTPVerificationModalVisible] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const [contactInfo, setContactInfo] = useState('')
    const [OTPValidate, setOTPValidate] = useState({
        contactValidate: '',
        otp: ''
    })

    const [updatePassword, setUpdatePassword] = useState({
        updateContact: '',
        otp: '',
        password: '',
        confirmPassword: ''
    })

    const handleContactInputChange = value => {
        if (emailRegex.test(value) || mobileNumberRegex.test(value)) {
            setContactInfo(value)
        } else {
            // showErrorAlert('Please enter a valid Email address or Mobile number.')
        }
    }

    const handleSendCode = () => {
        if (contactInfo !== '') {
            console.log(`\n\nLoginContactInfo: ${contactInfo}\n`)

            let payloadSendCode = {
                contact: contactInfo
            }

            isInternetConnected()
                .then(() => {
                    dispatch(forgotPasswordRequest(payloadSendCode))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please enter Email or Phone Number')
        }
    }

    const handleSubmitForgotPasswordOTP = () => {
        const { contactValidate, otp } = OTPValidate

        if (contactValidate !== '' && otp !== '') {
            let payloadVerifyOTP = {
                contact: contactInfo,
                otp_input: otp
            }

            isInternetConnected()
                .then(() => {
                    dispatch(validateOTPRequest(payloadVerifyOTP))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please enter OTP')
        }
    }

    const btnHandleResendCodeForForgotPassword = () => {
        let payloadSendCode = {
            contact: contactInfo
        }

        isInternetConnected()
            .then(() => {
                dispatch(forgotPasswordRequest(payloadSendCode))
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    const handlePasswordUpdate = () => {
        const { updateContact, otp, password, confirmPassword } = updatePassword

        console.log(`updatePassword: ${JSON.stringify(updatePassword)}`)
        if (updateContact !== '' && otp !== '' && password !== '' && confirmPassword !== '') {

            let payloadValidate = {
                contact: contactInfo,
                otp_input: OTPValidate.otp,
                password: password,
                decryptedPassword: confirmPassword,
            }

            console.log(`payloadUpdatePassword: ${JSON.stringify(payloadValidate)}`)

            isInternetConnected()
                .then(() => {
                    dispatch(updatePasswordRequest(payloadValidate))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please enter password & confirm')
        }
    }

    const handleForgotPasswordOTPInputChange = otpValue => {
        console.log(`Contact: ${OTPValidate.contactValidate}\nForgotPasswordOTP: ${otpValue}`)
        setOTPValidate({ otp: otpValue, contactValidate: contactInfo })
    }

    const handleUpdatePasswordInputChange = (passwordValue, confirmPasswordValue) => {
        console.log(`\n\n\npassword: ${passwordValue}\nconfirmPassword: ${confirmPasswordValue}\n\n\n\n`)
        setUpdatePassword({
            updateContact: contactInfo,
            otp: OTPValidate.otp,
            password: passwordValue,
            confirmPassword: confirmPasswordValue
        })
    }

    const handleGotoHomePage = () => {
        navigation.navigate(`Drawer`)
    }




















    const validatePassword = (password, confirmPassword) => {
        const errors = {}

        if (password.length < 6) {
            errors.minLength = 'Password must be at least 6 characters long'
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.specialChar = 'Password must contain at least one special character'
        }

        if (!/[A-Z]/.test(password)) {
            errors.uppercase = 'Password must contain at least one uppercase letter'
        }

        if (!/[a-z]/.test(password)) {
            errors.lowercase = 'Password must contain at least one lowercase letter'
        }

        if (!/\d/.test(password)) {
            errors.number = 'Password must contain at least one number'
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match'
        }

        return errors
    }

    const handleOldPasswordChange = text => {
        onInputChange('oldPassword', text)
    }

    const handlePasswordChange = text => {
        onInputChange('newPassword', text)
        const errors = validatePassword(text, formState.confirmPassword)
        setFormState(prevState => ({ ...prevState, errors }))
    }

    const handleConfirmPasswordChange = text => {
        onInputChange('confirmPassword', text)
        const errors = validatePassword(formState.newPassword, text)
        setFormState(prevState => ({ ...prevState, errors }))
    }

    const handleForgotPassword = () => {
        setShowEmailVerification(true)
    }

    if (UserReducer?.status !== status || status == '') {
        switch (UserReducer?.status) {
            case 'User/changePasswordRequest':
                status = UserReducer?.status
                console.log(`---->>>changePasswordRequest`)
                break

            case 'User/changePasswordSuccess':
                status = UserReducer?.status
                console.log(`---->>>changePasswordSuccess`)
                break

            case 'User/changePasswordFailure':
                status = UserReducer?.status
                console.log(`---->>>changePasswordFailure`)
                break

            default:
            // console.log(`Sorry, we are out of ${expr}.`)
        }
    }

    if (AuthReducer?.status !== status || status == '') {
        switch (AuthReducer?.status) {
            case 'Auth/forgotPasswordRequest':
                status = AuthReducer?.status
                console.log('-->> forgotPasswordRequestUI')
                break
            case 'Auth/forgotPasswordSuccess':
                status = AuthReducer?.status
                console.log('-->> forgotPasswordSuccessUI')
                setShowEmailVerification(false)
                setIsOTPVerificationModalVisible(true)
                break
            case 'Auth/forgotPasswordFailure':
                status = AuthReducer?.status
                console.log('-->> forgotPasswordFailureUI')
                break

            // -------------- Validate OTP For Update Password --------------

            case 'Auth/validateOTPRequest':
                status = AuthReducer?.status
                console.log('-->> validateOTPRequestUI')
                break
            case 'Auth/validateOTPSuccess':
                status = AuthReducer?.status
                console.log('-->> validateOTPSuccessUI')
                setIsOTPVerificationModalVisible(false)
                setIsPasswordModalVisible(true)
                break
            case 'Auth/validateOTPFailure':
                status = AuthReducer?.status
                console.log('-->> validateOTPFailureUI')
                break

            // ------------------------------------------------------------

            case 'Auth/updatePasswordRequest':
                status = AuthReducer?.status
                console.log('-->> updatePasswordRequestUI')
                break
            case 'Auth/updatePasswordSuccess':
                status = AuthReducer?.status
                console.log('-->> updatePasswordSuccessUI')
                setIsPasswordModalVisible(false)
                setIsSuccessModalVisible(true)
                break
            case 'Auth/updatePasswordFailure':
                status = AuthReducer?.status
                console.log('-->> updatePasswordFailureUI')
                setIsPasswordModalVisible(true)


            default:
            // console.log(`Sorry, we are out of ${expr}.`)
        }
    }

    const renderError = errorKey => {
        if (formState.errors[errorKey]) {
            return <Text style={styles.txtValidation}>{formState.errors[errorKey]}</Text>
        }
        return null
    }

    const btnHandleSubmitPassword = () => {
        const { oldPassword, newPassword, confirmPassword } = formState

        if (oldPassword.trim() !== '' && newPassword.trim() !== '' && confirmPassword.trim() !== '' && Object.keys(formState.errors).length === 0) {
            // console.log(`\n\nOld Password: ${oldPassword}\nnewPassword: ${newPassword}\nconfirmPassword: ${confirmPassword}`)

            const passwordPayload = {
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword,
            }

            isInternetConnected()
                .then(() => {
                    dispatch(changePasswordRequest({ passwordData: passwordPayload }))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please fill up all the password fields and ensure they are valid.', Colors.yellow, Colors.black)
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Change Password`}
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
            </View>

            <ScrollView style={styles.contentContainer}>
                <View style={styles.inputViewOldPass}>
                    <CustomTextInput
                        label={`Old Password`}
                        icon={Icons.password}
                        secureTextEntry={true}
                        placeholder={'Enter old password'}
                        value={formState.oldPassword}
                        onChangeText={handleOldPasswordChange}
                    />
                    <TouchableOpacity style={styles.btnForgotPass} onPress={handleForgotPassword}>
                        <Text style={styles.txtForgotPass}>Forgot Password?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.viewMargin}></View>

                <CustomTextInput
                    label={`New Password`}
                    icon={Icons.password}
                    secureTextEntry={true}
                    placeholder={'Enter new password'}
                    value={formState.newPassword}
                    onChangeText={handlePasswordChange}
                />
                {renderError('minLength')}
                {renderError('specialChar')}
                {renderError('uppercase')}
                {renderError('lowercase')}
                {renderError('number')}

                <CustomTextInput
                    label={`Confirm Password`}
                    icon={Icons.password}
                    secureTextEntry={true}
                    placeholder={'Confirm new password'}
                    value={formState.confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                />
                {renderError('confirmPassword')}
            </ScrollView>

            <ContactVerificationBottomSheet
                isVisible={showEmailVerification}
                toggleVisibility={() => setShowEmailVerification(false)}
                onInputChange={handleContactInputChange}
                loading={'Auth/forgotPasswordRequest' == AuthReducer?.status}
                handleSendCode={handleSendCode}
            />

            <OTPVerificationBottomSheet
                userContact={contactInfo}
                isOTPVerificationModalVisible={isOTPVerificationModalVisible}
                setIsOTPVerificationModalVisible={setIsOTPVerificationModalVisible}
                onOTPInputChange={txt => handleForgotPasswordOTPInputChange(txt)}
                handleSubmit={() => handleSubmitForgotPasswordOTP()}
                btnResendCode={() => btnHandleResendCodeForForgotPassword()}
                loading={'Auth/validateOTPRequest' == AuthReducer?.status}
            />

            <CreateNewPasswordBottomSheet
                isPasswordModalVisible={isPasswordModalVisible}
                setIsPasswordModalVisible={setIsPasswordModalVisible}
                onInputChange={(passwordValue, confirmPasswordValue) => {
                    // console.log('\n\n\n\n\nPassword:', passwordValue)
                    // console.log('Confirm Password:', confirmPasswordValue)
                    handleUpdatePasswordInputChange(passwordValue, confirmPasswordValue)
                }}
                handlePasswordSubmit={handlePasswordUpdate}
                loading={'Auth/updatePasswordRequest' == AuthReducer?.status}
            />

            <SuccessBottomSheet
                isSuccessModalVisible={isSuccessModalVisible}
                setIsSuccessModalVisible={setIsSuccessModalVisible}
                btnSuccess={() => {
                    setIsSuccessModalVisible(false)
                    console.log(`Success !`)
                    handleGotoHomePage()
                }}
            />

            <View style={styles.btnSavePassword}>
                <CustomButton
                    BGColor={Colors.orange}
                    title={`Change Password`}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    fontSize={18}
                    viewHeight={60}
                    width={'100%'}
                    alignItems={'center'}
                    onPressFunc={btnHandleSubmitPassword}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        width: '100%',
        paddingTop: 20,
    },
    contentContainer: {
        flex: 1,
        margin: 20,
    },
    txtValidation: {
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        marginBottom: 5,
        marginTop: -15,
        textAlign: 'right',
    },
    inputViewOldPass: {
        marginBottom: 20
    },
    btnForgotPass: {
        // backgroundColor: Colors.blue,
        alignItems: 'center',
        width: '35%',
        alignSelf: 'flex-end',
    },
    txtForgotPass: {
        // backgroundColor: Colors.green,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 15,
        color: Colors.orange,
    },
    viewMargin: {
        borderBottomWidth: 1,
        borderColor: Colors.mediumGrey,
        borderStyle: 'dashed',
        width: '70%',
        alignSelf: 'center',
        marginBottom: 20
    },

    btnSavePassword: {
        width: width - 40,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 40,
    },
})