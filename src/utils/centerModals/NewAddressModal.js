import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../themes/Colors'
import normalize from '../helpers/normalize'
import CustomButton from '../../components/CustomButton'
import { Fonts } from '../../themes/Fonts'
import CenterModal from '../../components/CenterModal'
import { Icons } from '../../themes/Icons'
import DropdownAddressType from '../../components/DropdownAddressType'

const { width, height } = Dimensions.get('screen')

const NewAddressModal = ({
    isAddAddressModalVisible,
    setIsAddAddressModalVisible,
    btnAddAddress,
    address,
    setAddress,
    funcSelectedLabel,
    modalTitle }) => {

    const [isFocused, setIsFocused] = useState(false)

    const [error, setError] = useState('')

    const onInputChange = text => {
        setError('')
        setAddress(text)
    }

    const btnHandleAddAddress = () => {
        if (!address.trim()) {
            setError('***Please enter Address.')
            return
        }

        setError('')
        btnAddAddress()
    }

    const handleSelectedLabel = selectedLabel => {
        // console.log(`NewAddressModal Selected Label: ${selectedLabel}`)
        funcSelectedLabel(selectedLabel)
    }

    return (
        <>
            <CenterModal
                modalVisible={isAddAddressModalVisible}
                backgroundColor={Colors.white}
                height={height / 2 + 30}
                borderRadius={normalize(12)}
                onBackdropPress={() => setIsAddAddressModalVisible(false)}>

                <Text style={styles.txtModalHeader}>{modalTitle}</Text>

                {/* Input View */}
                <View style={styles.inputContainer}>
                    {/* Address Type */}
                    <View style={styles.flexAddressType}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9298/9298941.png' }}
                            style={styles.imgAddress}
                        />
                        <Text style={styles.txtAddress}>Address type</Text>
                    </View>
                    <DropdownAddressType
                        onSelectedLabel={handleSelectedLabel}
                    />

                    {/* Address Input */}
                    <View style={styles.flexView}>
                        <Image
                            source={Icons.address}
                            style={[styles.imgAddress, {
                                tintColor: isFocused ? Colors.orange : Colors.black,
                            }]}
                        />
                        <Text style={[styles.txtAddress, {
                            color: isFocused ? Colors.orange : Colors.black,
                        }]}>Address</Text>
                    </View>

                    <View style={[styles.viewAddressInput, {
                        borderColor: isFocused ? Colors.orange : Colors.grey,
                        borderWidth: isFocused ? 1 : 0.5,
                    }]}>
                        <TextInput
                            placeholder={'Enter address'}
                            placeholderTextColor={Colors.mediumGrey}
                            textAlignVertical='top'
                            multiline
                            value={address}
                            onChangeText={onInputChange}
                            style={styles.inputAddress}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </View>
                </View>

                {error ? <Text style={styles.txtValidation}>{error}</Text> : null}

                <View style={styles.viewBtnContainer}>
                    <CustomButton
                        BGColor={Colors.orange}
                        title={`Save`}
                        fontFamily={Fonts.SF_Compact_Rounded_Medium}
                        viewHeight={60}
                        alignItems={'center'}
                        alignSelf={'center'}
                        width={'85%'}
                        onPressFunc={btnHandleAddAddress}
                    />
                </View>

            </CenterModal>
        </>


    )
}

export default NewAddressModal

const styles = StyleSheet.create({
    txtModalHeader: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
        fontSize: 24,
        textAlign: 'center'
    },
    inputContainer: {
        // backgroundColor: Colors.blue,
        height: 160,
        width: width - 60,
        alignSelf: 'center',
        marginTop: 10,
        marginVertical: 1,
    },
    flexView: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexAddressType: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtAddress: {
        color: Colors.black,
        fontSize: 20,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        top: 1,
        marginLeft: 10
    },
    viewAddressInput: {
        backgroundColor: Colors.white,
        height: 125,
        width: '100%',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 5,

        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        elevation: 8,
        shadowOpacity: 1,
        shadowRadius: 8,
    },
    imgAddress: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    inputAddress: {
        // backgroundColor: Colors.violet,
        flex: 1,
        color: 'black',
        fontSize: 15,
        fontWeight: '400',
        paddingHorizontal: 10,
        height: '100%',
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
    },
    txtValidation: {
        // backgroundColor: Colors.blue,
        color: Colors.red,
        fontSize: 15,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        paddingHorizontal: 30,
        position: 'absolute',
        bottom: 90,
        right: 0
    },
    viewBtnContainer: {
        // backgroundColor: Colors.black,
        width: width,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 20
    },
})
