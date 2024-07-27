import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MyStatusBar from '../../utils/MyStatusBar'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import CustomTextInput from '../../components/CustomTextInput'
import { Fonts } from '../../themes/Fonts'
import CustomButton from '../../components/CustomButton'
import SocialCustomButton from '../../components/SocialCustomButton'
import ContactVerificationBottomSheet from '../../utils/bottomSheets/ContactVerificationBottomSheet'
import CreateNewPasswordBottomSheet from '../../utils/bottomSheets/CreateNewPasswordBottomSheet'
import OTPVerificationBottomSheet from '../../utils/bottomSheets/OTPVerificationBottomSheet'
import SuccessBottomSheet from '../../utils/bottomSheets/SuccessBottomSheet'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordRequest, loginRequest, updatePasswordRequest, validateLoginRequest, validateOTPRequest } from '../../redux/reducers/AuthReducer'
import Loader from '../../utils/helpers/Loader'
import showErrorAlert from '../../utils/helpers/Toast'
import isInternetConnected from '../../utils/helpers/NetInfo'
import Header from '../../components/Header'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const mobileNumberRegex = /^\+\d{1,15}$/

var status = ''
const VERIFY_LOGIN = 'verifyLogin'
const FORGOT_PASSWORD = 'forgotPassword'

const Login = ({ navigation }) => {

    const dispatch = useDispatch()
    const AuthReducer = useSelector(state => state.AuthReducer)

    // ----------------------- Login Credentials ------------------------------------

    const [userInfo, setUserInfo] = useState({
        contactData: '',
        password: ''
    })

    const [error, setError] = useState({})

    const InputChange = (field, value) => {
        let newError = { ...error }

        if (field === 'contactData') {
            if (!value) {
                newError.contactData = '***Please enter Email address or Mobile number.'
            } else if (!emailRegex.test(value) && !mobileNumberRegex.test(value)) {
                newError.contactData = 'Please enter a valid Email address or Mobile number.'
            } else {
                newError.contactData = ''
            }
        }

        if (field === 'password') {
            if (!value) {
                newError.password = '***Please enter password.'
            } else {
                newError.password = ''
            }
        }

        setError(newError)
        setUserInfo(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    // ------------------------------------------------------------------------------------

    const [showEmailVerification, setShowEmailVerification] = useState(false)
    const [isOTPVerificationModalVisible, setIsOTPVerificationModalVisible] = useState(false)
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false)
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    const [otpType, setOtpType] = useState('')

    if (AuthReducer?.status !== status || status == '') {
        switch (AuthReducer?.status) {
            case 'Auth/loginRequest':
                status = AuthReducer?.status
                console.log('-->> loginRequestUI')
                break
            case 'Auth/loginSuccess':
                status = AuthReducer?.status
                console.log('-->> loginSuccessUI')
                break
            case 'Auth/loginFailure':
                status = AuthReducer?.status
                const loginToken = AuthReducer?.loginToken
                console.log(`Failure?.token========>>>>: ${loginToken}`)
                loginToken !== null && loginToken !== undefined ? setIsOTPVerificationModalVisible(true) : setIsOTPVerificationModalVisible(false)
                setOtpType('verifyLogin')
                console.log('-->> loginFailureUI')
                break


            // --------------------- Validate Login ---------------------

            case 'Auth/validateLoginRequest':
                status = AuthReducer?.status
                console.log('-->> validateLoginRequestUI')
                break
            case 'Auth/validateLoginSuccess':
                status = AuthReducer?.status
                console.log('-->> validateLoginSuccessUI')
                setIsOTPVerificationModalVisible(false)
                setTimeout(() => {
                    handleLogin()
                }, 500)
                break
            case 'Auth/validateLoginFailure':
                status = AuthReducer?.status
                console.log('-->> validateLoginFailureUI')
                break

            // ------------------------------------------------------------
            // ------------------------------------------------------------
            // ------------------------------------------------------------
            // ------------------------------------------------------------
            // --------------------- Forgot Password ---------------------

            case 'Auth/forgotPasswordRequest':
                status = AuthReducer?.status
                console.log('-->> forgotPasswordRequestUI')
                break
            case 'Auth/forgotPasswordSuccess':
                status = AuthReducer?.status
                console.log('-->> forgotPasswordSuccessUI')
                setShowEmailVerification(false)
                setIsOTPVerificationModalVisible(true)
                setOtpType('forgotPassword')
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

    const [verifyInfo, setVerifyInfo] = useState({
        contactData: '',
        otp: ''
    })

    const handleOTPInputChange = otpValue => {
        setVerifyInfo({ otp: otpValue, contactData: userInfo.contactData })
    }

    const handleLogin = () => {
        let newError = ''

        const { contactData, password } = userInfo

        if (!contactData) {
            newError = '***Please enter Email address or Mobile number.'
        } else if (!emailRegex.test(contactData) && !mobileNumberRegex.test(contactData)) {
            newError = 'Please enter a valid Email address or Mobile number.'
        }

        if (!password) {
            newError += '***Please enter password.'
        }

        setError(newError)

        if (contactData !== '' && password !== '') {
            console.log(`contact: ${contactData}\npassword: ${password}`)

            let payload = {
                contact: contactData,
                password: password
            }

            isInternetConnected()
                .then(() => {
                    dispatch(loginRequest(payload))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please enter contact and password')
        }
    }

    const handleSubmitOTP = () => {
        const { contactData, otp } = verifyInfo

        if (contactData !== '' && otp !== '') {
            console.log(`\n\nLoginContact: ${contactData}\nOTP: ${otp}\n\n\n`)

            let payloadVerify = {
                contact: contactData,
                otp_input: otp
            }

            isInternetConnected()
                .then(() => {
                    dispatch(validateLoginRequest(payloadVerify))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please enter the OTP')
        }
    }


    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -----------------------------------------------------------------------------
    // -------------------------- Forgot Password Process --------------------------

    const handleForgotPassword = () => {
        setShowEmailVerification(true)
    }

    const [contactInfo, setContactInfo] = useState('')

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

    // -----------------------------------------------------------------------------

    const [OTPValidate, setOTPValidate] = useState({
        contactValidate: '',
        otp: ''
    })

    const handleForgotPasswordOTPInputChange = otpValue => {
        console.log(`Contact: ${OTPValidate.contactValidate}\nForgotPasswordOTP: ${otpValue}`)
        setOTPValidate({ otp: otpValue, contactValidate: contactInfo })
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

    // -----------------------------------------------------------------------------

    const [updatePassword, setUpdatePassword] = useState({
        updateContact: '',
        otp: '',
        password: '',
        confirmPassword: ''
    })

    const handleUpdatePasswordInputChange = (passwordValue, confirmPasswordValue) => {
        console.log(`\n\n\npassword: ${passwordValue}\nconfirmPassword: ${confirmPasswordValue}\n\n\n\n`)
        setUpdatePassword({
            updateContact: contactInfo,
            otp: OTPValidate.otp,
            password: passwordValue,
            confirmPassword: confirmPasswordValue
        })
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

    const handleLoginAfterUpdatePassword = () => {
        const { updateContact, confirmPassword } = updatePassword
        let payload = {
            contact: updateContact,
            password: confirmPassword
        }

        isInternetConnected()
            .then(() => {
                dispatch(loginRequest(payload))
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    // console.log(`updateContact: ${updatePassword.updateContact} \t confirmPassword: ${updatePassword.confirmPassword}`)

    // --------------------------------- Resend OTP ---------------------------------

    const btnHandleResendCodeForLogin = () => {
        const { contactData, password } = userInfo
        let payload = {
            contact: contactData,
            password: password
        }

        isInternetConnected()
            .then(() => {
                dispatch(loginRequest(payload))
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
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

    return (
        <SafeAreaView style={loginStyles.container}>
            <MyStatusBar backgroundColor={Colors.transparent} barStyle={'dark-content'} />
            <Loader visible={AuthReducer?.status == 'Auth/loginRequest'} />

            {/* <TouchableOpacity
                style={loginStyles.btnBack}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}>
                <Image
                    source={Icons.back}
                    style={loginStyles.imgBack}
                />
            </TouchableOpacity> */}

            <Header
                // backgroundColor={Colors.red}
                leftIcon={Icons.back}
                leftIconTintColor={Colors.black}
                leftIconSize={20}
                titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                titleTop={2}
                onLeftPress={() => navigation.goBack()}

                leftIconLeft={10}
                marginTop={20}
                title={`Sign In`}
            />

            <ScrollView style={loginStyles.scrollerView} showsVerticalScrollIndicator={false}>
                <Text style={loginStyles.txtHeader}>Login</Text>
                <Text style={loginStyles.txtSubHeader}>Please login with registered account</Text>

                <CustomTextInput
                    label={`Email or Phone Number`}
                    icon={Icons.email}
                    placeholder={'Enter your Email or Phone Number'}
                    value={userInfo.contactData}
                    onChangeText={text => InputChange('contactData', text)}
                />
                {error.contactData ? <Text style={loginStyles.txtValidation}>{error.contactData}</Text> : null}

                <CustomTextInput
                    label={`Password`}
                    icon={Icons.password}
                    secureTextEntry={true}
                    placeholder={'Create your password'}
                    value={userInfo.password}
                    onChangeText={text => InputChange('password', text)}
                />
                {error.password ? <Text style={loginStyles.txtValidation}>{error.password}</Text> : null}

                <TouchableOpacity
                    style={loginStyles.btnForgotPassword}
                    activeOpacity={0.4}
                    onPress={handleForgotPassword}>
                    <Text style={loginStyles.txtForgotPassword}>Forgot Password ?</Text>
                </TouchableOpacity>

                <ContactVerificationBottomSheet
                    isVisible={showEmailVerification}
                    toggleVisibility={() => setShowEmailVerification(false)}
                    onInputChange={handleContactInputChange}
                    loading={'Auth/forgotPasswordRequest' == AuthReducer?.status}
                    handleSendCode={handleSendCode}
                />

                <OTPVerificationBottomSheet
                    userContact={otpType === VERIFY_LOGIN ? userInfo.contactData : otpType === FORGOT_PASSWORD ? contactInfo : 'No contact'}
                    isOTPVerificationModalVisible={isOTPVerificationModalVisible}
                    setIsOTPVerificationModalVisible={setIsOTPVerificationModalVisible}
                    onOTPInputChange={txt => {
                        if (otpType == VERIFY_LOGIN) {
                            // console.log(`otpType: ${otpType}`)
                            handleOTPInputChange(txt)
                        } else if (otpType === FORGOT_PASSWORD) {
                            // console.log(`otpType: ${otpType}`)
                            handleForgotPasswordOTPInputChange(txt)
                        }
                    }}
                    handleSubmit={() => {
                        if (otpType == VERIFY_LOGIN) {
                            // console.log(`otpType: ${otpType}`)
                            handleSubmitOTP()
                        } else if (otpType === FORGOT_PASSWORD) {
                            // console.log(`otpType: ${otpType}`)
                            handleSubmitForgotPasswordOTP()
                        }
                    }}
                    btnResendCode={() => {
                        if (otpType == VERIFY_LOGIN) {
                            // console.log(`otpType: ${otpType}`)
                            btnHandleResendCodeForLogin()
                        } else if (otpType === FORGOT_PASSWORD) {
                            // console.log(`otpType: ${otpType}`)
                            btnHandleResendCodeForForgotPassword()
                        }
                    }}
                    loading={'Auth/validateLoginRequest' == AuthReducer?.status || 'Auth/validateOTPRequest' == AuthReducer?.status}
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
                        handleLoginAfterUpdatePassword()
                    }}
                />

                <CustomButton
                    BGColor={Colors.orange}
                    title={`Sign In`}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    viewHeight={60}
                    marginTop={30}
                    alignItems={'center'}
                    onPressFunc={handleLogin}
                />

                <View style={loginStyles.marginSocialContainer}>
                    <View style={loginStyles.marginSeperator}></View>
                    <Text style={loginStyles.marginText}> Or Login with </Text>
                    <View style={loginStyles.marginSeperator}></View>
                </View>

                <SocialCustomButton
                    BGColor={Colors.transparent}
                    title={`Sign In with Google`}
                    imageIcon={Icons.google}
                    imageLeft={-110}
                    color={Colors.black}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    alignItems={'center'}
                    borderColor={Colors.mediumGrey}
                    borderWidth={0.7}
                    url={'https://accounts.google.com/servicelogin?hl=en-gb'}
                />

                <SocialCustomButton
                    BGColor={Colors.transparent}
                    title={`Sign In with Facebook`}
                    imageIcon={Icons.facebook}
                    imageLeft={-120}
                    marginTop={15}
                    color={Colors.black}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    alignItems={'center'}
                    borderColor={Colors.mediumGrey}
                    borderWidth={0.7}
                    url={'https://accounts.google.com/servicelogin?hl=en-gb'}
                />
            </ScrollView>

        </SafeAreaView>
    )
}

export default Login

export const loginStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    scrollerView: {
        // backgroundColor: Colors.lightIndigo,
        paddingHorizontal: 20,
        paddingTop: 30,

    },
    txtHeader: {
        fontSize: 32,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold
    },
    txtSubHeader: {
        fontSize: 20,
        color: Colors.grey,
        marginBottom: 20,
        fontFamily: Fonts.SF_Compact_Rounded_Light,
        marginTop: -5
    },
    btnBack: {
        backgroundColor: Colors.mediumGrey,
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 20
    },
    imgBack: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    txtValidation: {
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        marginBottom: 5,
        marginTop: -15,
        textAlign: 'right'
    },
    marginSocialContainer: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25,
    },
    marginSeperator: {
        backgroundColor: Colors.mediumGrey,
        height: 1,
        width: '25%',
    },
    marginText: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.mediumGrey,
        marginHorizontal: 10,
        fontSize: 16
    },

    btnForgotPassword: {
        // backgroundColor: Colors.blue,
        alignSelf: 'flex-end'
    },
    txtForgotPassword: {
        color: Colors.orange,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        textAlign: 'right'
    },
})