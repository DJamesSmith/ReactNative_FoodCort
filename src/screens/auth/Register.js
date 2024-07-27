import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import MyStatusBar from '../../utils/MyStatusBar'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import CustomTextInput from '../../components/CustomTextInput'
import { Fonts } from '../../themes/Fonts'
import CustomButton from '../../components/CustomButton'
import SocialCustomButton from '../../components/SocialCustomButton'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header'
import ImageCropPicker from 'react-native-image-crop-picker'
import OTPVerificationBottomSheet from '../../utils/bottomSheets/OTPVerificationBottomSheet'
import SuccessBottomSheet from '../../utils/bottomSheets/SuccessBottomSheet'
import showErrorAlert from '../../utils/helpers/Toast'
import { registerRequest, verifyRequest } from '../../redux/reducers/AuthReducer'
import isInternetConnected from '../../utils/helpers/NetInfo'
import Loader from '../../utils/helpers/Loader'

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const mobileNumberRegex = /^\+\d{1,15}$/

var status = ''

const Register = ({ navigation }) => {

    const dispatch = useDispatch()
    const AuthReducer = useSelector(state => state.AuthReducer)

    const [profileImage, setProfileImage] = useState('')
    const [imagePath, setImagePath] = useState({})

    // ----------------------------- VALIDATION -----------------------------
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        contactData: '',
        password: ''
    })

    const [error, setError] = useState({})

    const InputChange = (field, value) => {
        let newError = { ...error }

        if (field === 'firstName' || field === 'lastName') {
            if (!value.trim()) {
                newError[field] = '***Please enter ' + field.charAt(0).toUpperCase() + field.slice(1) + '.'
            } else {
                newError[field] = ''
            }
        }

        if (field === 'contactData') {
            if (!value.trim()) {
                newError.contactData = '***Please enter Email address or Mobile number.'
            } else if (!emailRegex.test(value) && !mobileNumberRegex.test(value)) {
                newError.contactData = 'Please enter a valid Email address or Mobile number.'
            } else {
                newError.contactData = ''
            }
        }

        if (field === 'password') {
            if (!value.trim()) {
                newError.password = '***Please enter password.'
            } else {
                newError.password = ''
            }
        }

        setError(newError)
        setUserInfo(prevCredentials => ({ ...prevCredentials, [field]: value.trim() }))
    }

    // ---------------------------------------------------------------------

    function getImage() {
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            cropping: true,
        })
            .then(image => {
                const imageUri = image.path
                // console.log(`ImagePath: ${imageUri}`)
                // console.log(`ImageFilename: ${image.filename}`)

                let imageObj = {
                    name: image.filename ? image.filename : 'upload_image',
                    type: image.mime,
                    uri: image.path,
                }
                setImagePath(imageObj)
                setProfileImage(imageUri)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [isOTPVerificationModalVisible, setIsOTPVerificationModalVisible] = useState(false)
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

    useEffect(() => {
        if (AuthReducer?.status !== status || status == '') {
            switch (AuthReducer?.status) {
                case 'Auth/registerRequest':
                    status = AuthReducer?.status
                    console.log('-->> registerRequestUI')
                    break
                case 'Auth/registerSuccess':
                    status = AuthReducer?.status
                    console.log('-->> registerSuccessUI')
                    setTimeout(() => {
                        setIsOTPVerificationModalVisible(true)
                    }, 1000);
                    break
                case 'Auth/registerFailure':
                    status = AuthReducer?.status
                    console.log('-->> registerFailureUI')
                    break


                case 'Auth/verifyRequest':
                    status = AuthReducer?.status
                    console.log('-->> verifyRequestUI')
                    break
                case 'Auth/verifySuccess':
                    status = AuthReducer?.status
                    console.log('-->> verifySuccessUI')
                    navigation.navigate('Login')
                    break
                case 'Auth/verifyFailure':
                    status = AuthReducer?.status
                    console.log('-->> verifyFailureUI')
                    showErrorAlert('Verification failed. Please try again.')
                    break
                default:
                    break
            }
        }
    }, [AuthReducer])


    const [verifyInfo, setVerifyInfo] = useState({
        contactData: '',
        otp: ''
    })

    const handleRegister = () => {
        const { firstName, lastName, contactData, password } = userInfo

        let newError = ''

        if (!contactData) {
            newError = '***Please enter Email address or Mobile number.';
        } else if (!emailRegex.test(userInfo.contactData) && !mobileNumberRegex.test(contactData)) {
            newError = 'Please enter a valid Email address or Mobile number.'
        }

        if (!password) {
            newError += '***Please enter password.'
        }

        setError(newError)

        if (firstName !== '' && lastName !== '' && contactData !== '' && password !== '' && imagePath) {
            const formData = new FormData()

            formData.append('first_name', firstName)
            formData.append('last_name', lastName)
            formData.append('contact', contactData)
            formData.append('password', password)

            if (imagePath.uri) {
                const filename = imagePath.uri.split('/').pop()
                formData.append('profile_pic', {
                    uri: imagePath.uri,
                    name: filename,
                    type: imagePath.type
                })
            }

            isInternetConnected()
                .then(() => {
                    dispatch(registerRequest(formData))
                })
                .catch(err => {
                    showErrorAlert('Please Connect To Internet')
                })
        } else {
            setIsOTPVerificationModalVisible(false)
            showErrorAlert('Please fill up all the fields')
        }
    }

    const handleOTPInputChange = otpValue => {
        console.log("(From Register()) OTP Input Value:", otpValue, userInfo.contactData)
        setVerifyInfo({ otp: otpValue, contactData: userInfo.contactData })
    }

    // console.log("handleVerification", verifyInfo)

    const handleVerification = () => {
        const { contactData, otp } = verifyInfo

        console.log(contactData, otp)

        if (contactData && otp) {
            const objectVerify = {
                contact: contactData,
                otp_input: otp,
            }

            console.log(`verificationFormData: ${objectVerify}`)

            isInternetConnected()
                .then(() => {
                    dispatch(verifyRequest(objectVerify))
                })
                .catch(err => {
                    showErrorAlert('Please Connect To Internet')
                })
        } else {
            showErrorAlert('Please provide OTP.')
        }
    }

    const btnHandleResendCode = () => {
        const { firstName, lastName, contactData, password } = userInfo
        const formData = new FormData()

        formData.append('first_name', firstName)
        formData.append('last_name', lastName)
        formData.append('contact', contactData)
        formData.append('password', password)

        if (imagePath.uri) {
            const filename = imagePath.uri.split('/').pop()
            formData.append('profile_pic', {
                uri: imagePath.uri,
                name: filename,
                type: imagePath.type
            })
        }

        isInternetConnected()
            .then(() => {
                dispatch(registerRequest(formData))
            })
            .catch(err => {
                showErrorAlert('Please Connect To Internet')
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.transparent} barStyle={'dark-content'} />
            <Loader visible={AuthReducer?.status == 'Auth/registerRequest'} />
            <Loader visible={AuthReducer?.status == 'Auth/verifyRequest'} />


            <Header
                // backgroundColor={Colors.red}
                leftIcon={Icons.back}
                leftIconTintColor={Colors.black}
                leftIconSize={20}
                titleTop={2}
                titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                onLeftPress={() => navigation.goBack()}

                leftIconLeft={10}
                marginTop={20}
                title={`Register`}
            />

            <ScrollView style={styles.scrollerView} showsVerticalScrollIndicator={false}>
                <View style={styles.imageUploaderView}>
                    <TouchableOpacity onPress={() => getImage()} style={styles.btnImageUploader}>
                        <ImageBackground
                            source={{ uri: profileImage ? profileImage : 'https://cdn-icons-png.flaticon.com/128/847/847969.png' }}
                            style={{
                                // backgroundColor: Colors.red,
                                height: normalize(85),
                                width: normalize(85),
                                alignSelf: 'center',
                                marginBottom: normalize(50),
                            }}
                            borderRadius={normalize(100)}>
                            <Image
                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/148/148764.png' }}
                                style={{
                                    height: normalize(20),
                                    width: normalize(20),
                                    position: 'absolute',
                                    bottom: 0,
                                    right: normalize(5),
                                    borderWidth: 1.5,
                                    borderColor: 'white',
                                    borderRadius: normalize(30)
                                }}
                            />
                        </ImageBackground>
                    </TouchableOpacity>
                </View>

                <View style={styles.nameInputView}>
                    <View style={styles.firstName}>
                        <CustomTextInput
                            label={`First Name`}
                            icon={Icons.user}
                            placeholder={'First name'}
                            value={userInfo.firstName}
                            onChangeText={text => InputChange('firstName', text)}
                        />
                    </View>

                    <View style={styles.lastName}>
                        <CustomTextInput
                            label={`Last Name`}
                            placeholder={'Last Name'}
                            value={userInfo.lastName}
                            onChangeText={text => InputChange('lastName', text)}
                        />
                    </View>
                </View>

                <CustomTextInput
                    label={`Email or Phone Number`}
                    icon={Icons.email}
                    placeholder={'Enter your Email or Phone Number'}
                    value={userInfo.contactData}
                    onChangeText={text => InputChange('contactData', text)}
                />
                {error.contactData ? <Text style={styles.txtValidation}>{error.contactData}</Text> : null}

                <CustomTextInput
                    label={`Password`}
                    icon={Icons.password}
                    secureTextEntry={true}
                    placeholder={'Create your password'}
                    value={userInfo.password}
                    onChangeText={text => InputChange('password', text)}
                />
                {error.password ? <Text style={styles.txtValidation}>{error.password}</Text> : null}

                <CustomButton
                    BGColor={Colors.orange}
                    title={`Create Account`}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    viewHeight={60}
                    marginTop={30}
                    alignItems={'center'}
                    onPressFunc={() => handleRegister()}
                />

                <OTPVerificationBottomSheet
                    isOTPVerificationModalVisible={isOTPVerificationModalVisible}
                    setIsOTPVerificationModalVisible={setIsOTPVerificationModalVisible}
                    onOTPInputChange={handleOTPInputChange}
                    handleSubmit={() => {
                        setIsOTPVerificationModalVisible(false)
                        handleVerification()
                    }}
                    btnResendCode={btnHandleResendCode}
                />

                <SuccessBottomSheet
                    isSuccessModalVisible={isSuccessModalVisible}
                    setIsSuccessModalVisible={setIsSuccessModalVisible}
                    handleChangePassword={() => {
                        console.log(`Success !`)
                        navigation.navigate('HomeTab')
                    }}
                />

                <View style={styles.marginSocialContainer}>
                    <View style={styles.marginSeperator}></View>
                    <Text style={styles.marginText}> Or Register with </Text>
                    <View style={styles.marginSeperator}></View>
                </View>

                <View style={styles.socialMainContainer}>
                    <View style={styles.socialContainer}>
                        <SocialCustomButton
                            BGColor={Colors.white}
                            imageIcon={Icons.google}
                            url={'https://accounts.google.com/servicelogin?hl=en-gb'}
                            isCircle={true}
                        />

                        <SocialCustomButton
                            BGColor={Colors.white}
                            imageIcon={Icons.facebook1}
                            tintColor={Colors.violet}
                            url={'https://accounts.google.com/servicelogin?hl=en-gb'}
                            isCircle={true}
                        />
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    scrollerView: {
        // backgroundColor: Colors.lightIndigo,
        // paddingTop: 30,
        paddingHorizontal: 20,

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
    imageUploaderView: {
        // backgroundColor: Colors.blue,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        height: 140
    },
    btnImageUploader: {
        // backgroundColor: Colors.green,
        height: 120,
        width: 150
    },
    txtValidation: {
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        marginBottom: 5,
        marginTop: -15,
        textAlign: 'right'
    },
    nameInputView: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstName: {
        // backgroundColor: Colors.blue,
        width: '48%',
        alignItems: 'center',

    },
    lastName: {
        // backgroundColor: Colors.black,
        width: '48%',
        alignItems: 'center',

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
    socialMainContainer: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
        // marginTop: 20
    },
    socialContainer: {
        // backgroundColor: Colors.yellow,
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between'
    },
})