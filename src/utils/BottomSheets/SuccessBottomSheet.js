import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '../../themes/Colors'
import LottieView from 'lottie-react-native'
import { Animations } from '../../themes/Animations'
import normalize from '../helpers/normalize'
import CustomButton from '../../components/CustomButton'
import { Fonts } from '../../themes/Fonts'
import BottomSheetModal from '../../components/BottomSheetModal'

const SuccessBottomSheet = ({ navigation, isSuccessModalVisible, setIsSuccessModalVisible, btnSuccess }) => {

    const btnHandleSuccess = () => {
        btnSuccess()
    }

    return (
        <>
            <BottomSheetModal
                modalVisible={isSuccessModalVisible}
                backgroundColor={Colors.white}
                height={700}
                borderTopLeftRadius={normalize(20)}
                borderTopRightRadius={normalize(20)}
                onBackdropPress={() => setIsSuccessModalVisible(false)}>

                <View style={styles.lottieContainer}>
                    <LottieView style={{ flex: 1 }} source={Animations.animatedSuccess} autoPlay loop={false} />
                </View>

                <View style={styles.txtContainer}>
                    <Text style={styles.txtHeader}>Password Change Success!</Text>
                    <Text style={styles.txtSubheader}>You have successfully changed your password.{`\n`}Please login to get amazing experience.</Text>
                </View>

                <CustomButton
                    BGColor={Colors.orange}
                    title={`Go to Homepage`}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    viewHeight={60}
                    marginTop={30}
                    alignItems={'center'}
                    alignSelf={'center'}
                    width={'85%'}
                    onPressFunc={btnHandleSuccess}
                />


            </BottomSheetModal>
        </>


    )
}

export default SuccessBottomSheet

const styles = StyleSheet.create({
    lottieContainer: {
        backgroundColor: Colors.blue,
        height: 300,
        aspectRatio: 1,
        alignSelf: 'center',
        marginTop: normalize(50),
    },
    txtContainer: {
        // backgroundColor: Colors.red,
        alignItems: 'center',
        marginTop: 20
    },
    txtHeader: {
        textAlign: 'center',
        fontSize: 30,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
    },
    txtSubheader: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.grey,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        marginBottom: 60,
    },
})
