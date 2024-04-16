import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import LottieView from 'lottie-react-native'
import { Animations } from '../../themes/Animations'
import CustomButton from '../../components/CustomButton'
import BottomSheetModal from '../../components/BottomSheetModal'

const OTPVerificationBottomSheet = ({ userContact, isOTPVerificationModalVisible, setIsOTPVerificationModalVisible, handleSubmit, onOTPInputChange, loading = false, btnResendCode }) => {

    const [otp, setOtp] = useState(['', '', '', ''])
    const inputRefs = useRef([])
    const [activeInput, setActiveInput] = useState(0)
    const [otpResend, setOtpResend] = useState(false)
    const [timer, setTimer] = useState(90)
    const intervalRef = useRef(null)

    useEffect(() => {
        setOtp(['', '', '', ''])

        if (isOTPVerificationModalVisible) {
            const interval = setInterval(() => {
                setTimer(prevTimer => {
                    if (prevTimer === 0) {
                        clearInterval(interval)
                        setOtpResend(true)
                        return 0
                    } else {
                        return prevTimer - 1
                    }
                })
            }, 1000)

            return () => clearInterval(interval)
        } else {
            setTimer(90)
        }
    }, [isOTPVerificationModalVisible])

    const formatTime = () => {
        const minutes = Math.floor(timer / 60)
        const seconds = timer % 60
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }

    const handleOtpChange = (index, value) => {
        if (/^[0-9]*$/.test(value) && value.length <= 1) {                          // Validate input: only allow numbers 0-9
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)

            if (value && index < 3) {                                              // Move focus to the next input field if available
                inputRefs.current[index + 1].focus()
            }

            onOTPInputChange(newOtp.join(''))
        }
    }

    const handleBackspace = (index, value) => {
        if (value === '' && index > 0) {
            const newOtp = [...otp]
            newOtp[index - 1] = ''
            setOtp(newOtp)
            inputRefs.current[index - 1].focus()
        }
    }

    const onFocus = index => {
        setActiveInput(index)
    }

    const onBlur = () => {
        setActiveInput(-1)
    }

    const btnHandleSubmit = () => {
        setIsOTPVerificationModalVisible(true)
        handleSubmit()
    }

    const handleResendCode = () => {
        setTimer(90)
        setOtpResend(false)
        clearInterval(intervalRef.current)

        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer === 0) {
                    clearInterval(interval)
                    setOtpResend(true)
                    return 0
                } else {
                    return prevTimer - 1
                }
            });
        }, 1000);
        intervalRef.current = interval
        btnResendCode()
    }

    return (
        <>
            <BottomSheetModal
                modalVisible={isOTPVerificationModalVisible}
                backgroundColor={Colors.white}
                height={650}
                borderTopLeftRadius={normalize(20)}
                borderTopRightRadius={normalize(20)}
                onBackdropPress={() => setIsOTPVerificationModalVisible(false)}>
                <View style={styles.lottieContainer}>
                    <LottieView style={{ flex: 1 }} source={Animations.animatedMailOTP} autoPlay loop />
                </View>

                <View style={styles.txtContainer}>
                    <Text style={styles.txtHeader}>Verification Code</Text>
                    <Text style={styles.txtMailto}>Verification code sent to</Text>
                    <Text style={styles.txtEmail}>{userContact}</Text>
                    <Text style={styles.txtOTPTimer}>{formatTime()}</Text>
                </View>

                <ScrollView contentContainerStyle={styles.OTPContainer}>
                    {
                        otp.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={ref => inputRefs.current[index] = ref}
                                value={digit}
                                keyboardType='numeric'
                                caretHidden={true}
                                onFocus={() => onFocus(index)}
                                onBlur={onBlur}
                                maxLength={1}
                                onChangeText={text => handleOtpChange(index, text)}
                                onKeyPress={({ nativeEvent }) => {
                                    if (nativeEvent.key === 'Backspace') {
                                        handleBackspace(index, digit)
                                    }
                                }}
                                style={[
                                    styles.otpInputField,
                                    activeInput === index && { borderColor: Colors.orange, borderWidth: 0.8 }
                                ]}
                            />
                        ))
                    }
                </ScrollView>

                <View style={styles.btnContainer}>
                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Submit`}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        alignItems={'center'}
                        width={`80%`}
                        alignSelf={'center'}
                        onPressFunc={btnHandleSubmit}
                        loading={loading}
                    />

                    <TouchableOpacity
                        style={styles.btnNoCode}
                        // activeOpacity={0.8}
                        onPress={handleResendCode}
                        disabled={timer == 0 ? false : true}>
                        <Text style={styles.txtNoCode}>Didn't receive the code?</Text>
                        <Text style={[styles.txtBtnNoCode, { color: timer !== 0 ? Colors.mediumGrey : Colors.orange }]}>Resend</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </>
    )
}

export default OTPVerificationBottomSheet

const styles = StyleSheet.create({
    lottieContainer: {
        // backgroundColor: Colors.blue,
        height: 300,
        aspectRatio: 1,
        alignSelf: 'center'
    },
    txtContainer: {
        // backgroundColor: Colors.red,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtHeader: {
        fontSize: 28,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.black,

    },
    txtMailto: {
        fontSize: 16,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.mediumGrey,

    },
    txtEmail: {
        fontSize: 16,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        top: -5,
        color: Colors.black,
    },
    txtOTPTimer: {
        fontSize: 16,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        top: -5,
        color: Colors.orange,
    },
    OTPContainer: {
        // backgroundColor: Colors.blue,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    otpInputField: {
        backgroundColor: Colors.lightGrey,
        height: 60,
        width: 45,
        borderRadius: 12,
        marginHorizontal: 10,
        fontSize: 28,
        textAlign: 'center',
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        lineHeight: 40
        // borderColor: Colors.mediumGrey,
        // borderWidth: 0.8,
    },


    btnContainer: {
        // backgroundColor: Colors.red,
    },
    btnNoCode: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        top: -10
    },
    txtNoCode: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.mediumGrey,
        fontSize: 18
    },
    txtBtnNoCode: {
        // backgroundColor: Colors.black,
        marginLeft: 5,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.orange,
        fontSize: 18,
    },

})