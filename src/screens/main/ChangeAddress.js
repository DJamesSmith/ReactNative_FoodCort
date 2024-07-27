import { View, Text, Dimensions, FlatList, TouchableOpacity, Image, StyleSheet, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import NewAddressModal from '../../utils/centerModals/NewAddressModal'
import { Icons } from '../../themes/Icons'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import Header from '../../components/Header'
import { Images } from '../../themes/Images'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { useIsFocused } from '@react-navigation/native'
import { defaultAddressRequest, deleteAddressRequest, getAllAddressRequest, postNewAddressRequest, updateAddressRequest } from '../../redux/reducers/AddressReducer'
import { useDispatch, useSelector } from 'react-redux'
import OptionsModal from '../../utils/centerModals/OptionsModal'
import ConfirmationModal from '../../utils/centerModals/ConfirmationModal'

const { width, height } = Dimensions.get('screen')

var status = ''

const ChangeAddress = ({ navigation }) => {

    const dispatch = useDispatch()
    const AddressReducer = useSelector(state => state.AddressReducer)

    const isFocused = useIsFocused()
    const [address, setAddress] = useState([])

    const [addressInfo, setAddressInfo] = useState('')
    const [addressType, setAddressType] = useState('')
    const [isOpenNewAddressModal, setIsOpenNewAddressModal] = useState(false)

    const [updateAddressInfo, setUpdateAddressInfo] = useState('')
    const [updateAddressType, setUpdateAddressType] = useState('')
    const [isOpenUpdateAddressModal, setIsOpenUpdateAddressModal] = useState(false)

    const [updateSelectedIndex, setUpdateSelectedIndex] = useState(0)
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)

    const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isGetting, setIsGetting] = useState(true)

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getAllAddressRequest())
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    useEffect(() => {
        if (AddressReducer?.status === 'Address/getAllAddressSuccess') {
            const defaultIndex = address.findIndex(item => item.isDefault)
            setSelectedIndex(defaultIndex > -1 ? defaultIndex : 0)
        }
    }, [AddressReducer?.status])

    if (AddressReducer?.status !== status || status == '') {
        switch (AddressReducer?.status) {
            case 'Address/getAllAddressRequest':
                status = AddressReducer?.status
                console.log(`-->> getAllAddressRequest`)
                break

            case 'Address/getAllAddressSuccess':
                status = AddressReducer?.status
                console.log(`-->> getAllAddressSuccess`)
                setAddress(AddressReducer?.allAddresses ? AddressReducer?.allAddresses : [])
                break

            case 'Address/getAllAddressFailure':
                status = AddressReducer?.status
                console.log(`-->> getAllAddressFailure`)
                break



            case 'Address/postNewAddressRequest':
                status = AddressReducer?.status
                console.log(`-->> postNewAddressRequest`)
                break

            case 'Address/postNewAddressSuccess':
                status = AddressReducer?.status
                console.log(`-->> postNewAddressSuccess`)
                isInternetConnected()
                    .then(() => {
                        dispatch(getAllAddressRequest())
                    })
                    .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                break

            case 'Address/postNewAddressFailure':
                status = AddressReducer?.status
                console.log(`-->> postNewAddressFailure`)
                break



            case 'Address/updateAddressRequest':
                status = AddressReducer?.status
                console.log(`-->> updateAddressRequest`)
                break

            case 'Address/updateAddressSuccess':
                status = AddressReducer?.status
                console.log(`-->> updateAddressSuccess`)
                isInternetConnected()
                    .then(() => {
                        dispatch(getAllAddressRequest())
                    })
                    .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                break

            case 'Address/updateAddressFailure':
                status = AddressReducer?.status
                console.log(`-->> updateAddressFailure`)
                break



            case 'Address/deleteAddressRequest':
                status = AddressReducer?.status
                console.log(`-->> deleteAddressRequest`)
                break

            case 'Address/deleteAddressSuccess':
                status = AddressReducer?.status
                console.log(`-->> deleteAddressSuccess`)
                isInternetConnected()
                    .then(() => {
                        dispatch(getAllAddressRequest())
                    })
                    .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                break

            case 'Address/deleteAddressFailure':
                status = AddressReducer?.status
                console.log(`-->> deleteAddressFailure`)
                break



            case 'Address/defaultAddressRequest':
                status = AddressReducer?.status
                console.log(`-->> defaultAddressRequest`)
                break

            case 'Address/defaultAddressSuccess':
                status = AddressReducer?.status
                console.log(`-->> defaultAddressSuccess`)
                break

            case 'Address/defaultAddressFailure':
                status = AddressReducer?.status
                console.log(`-->> defaultAddressFailure`)
                break

            default:
            // console.log(`Sorry, we are out of ${expr}.`)
        }
    }


    const submitNewAddress = () => {
        // console.log(`\naddressTypeDion: ${addressType}`)
        // console.log(`addressInfo: ${addressInfo}`)

        if (addressType.trim() !== '' && addressInfo.trim() !== '') {
            const addressData = {
                addressType: addressType,
                address: addressInfo
            }

            isInternetConnected()
                .then(() => {
                    dispatch(postNewAddressRequest(addressData))
                    setIsOpenNewAddressModal(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please fill up the address field.', Colors.yellow, Colors.black)
        }
    }

    const handleSelectedAddress = index => {
        const selectedAddress = address[index]
        console.log(`selectedIndex: ${selectedAddress}`)

        const updatedAddresses = address.map((item, idx) => ({
            ...item,
            isDefault: idx === index
        }))
        setAddress(updatedAddresses)

        dispatch(defaultAddressRequest({ addressId: selectedAddress._id }))
        setSelectedIndex(index)
    }

    const renderAddressComponent = ({ item, index }) => {
        const { addressType, address, user, isDefault } = item
        const { first_name, last_name, contact } = user

        const getIconForAddressType = addressType => {
            switch (addressType) {
                case 'Home':
                    return Icons.homeAddress
                case 'Workplace':
                    return Icons.office
                case 'School/University':
                    return Icons.university
                case 'Gym':
                    return Icons.gym
                case 'Park':
                    return Icons.park
                default:
                    return Icons.randomLocation
            }
        }

        const onLongPressOptions = () => {
            setIsOptionsModalVisible(true)
            setUpdateSelectedIndex(index)
        }

        const handlePressSetDefault = () => {
            if (!isDefault) {
                handleSelectedAddress(index)
            }
        }

        return (
            <TouchableOpacity
                style={[
                    styles.DeliveryAddressContainer,
                    isDefault ? { borderColor: Colors.blue, borderWidth: 0.7 } : null,
                ]}
                activeOpacity={0.7}
                onLongPress={onLongPressOptions}
                onPress={handlePressSetDefault}>

                <View style={[styles.defaultView,
                isDefault ? { backgroundColor: Colors.blue } : null
                ]}>
                    <Text style={[styles.txtDefault,
                    isDefault ? { color: Colors.white } : null
                    ]}>Default</Text>
                </View>

                <View style={styles.btnAddress}>
                    <View style={styles.btnViewAddress}>
                        <View style={styles.viewImgMapView}>
                            <Image
                                source={Images.mapView}
                                style={styles.imgMapView}
                            />
                        </View>

                        <View style={styles.txtAddressContainer}>
                            <View style={styles.viewAddressType}>
                                <Image
                                    source={getIconForAddressType(addressType)}
                                    style={styles.imgAddressTypeIcon}
                                />
                                <Text style={styles.txtAddressType}>{addressType}</Text>
                            </View>

                            <View style={styles.viewFlexAddress}>
                                <Image
                                    source={Icons.locationFill}
                                    style={styles.imgAddressIcons}
                                />
                                <Text style={[styles.txtAddress, { width: '75%' }]}>{address}</Text>
                            </View>
                            <View style={styles.viewFlexAddress}>
                                <Image
                                    source={Icons.userFill}
                                    style={styles.imgAddressIcons}
                                />
                                <Text style={styles.txtAddress}>{`${first_name} ${last_name}`}</Text>
                            </View>
                            <View style={styles.viewFlexAddress}>
                                <Image
                                    source={Icons.phoneFill}
                                    style={styles.imgAddressIcons}
                                />
                                <Text style={styles.txtAddress}>{contact}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const emptyAddressListComponent = () => {
        return (
            <>
                <TouchableOpacity
                    style={styles.btnAddAddress}
                    onPress={() => {
                        setIsOpenNewAddressModal(true)
                        setAddressInfo('')
                    }}>
                    <View style={styles.viewFlexButton}>
                        <Image
                            source={Icons.plus}
                            style={styles.imgPlus}
                        />
                        <Text style={styles.txtAdd}>Add new Address</Text>
                    </View>
                </TouchableOpacity>
            </>
        )
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20
        return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom)
    }

    const refreshData = () => {
        setIsGetting(true)
        if (AddressReducer?.status !== 'Address/getAllAddressRequest' && isGetting) {
            getAllAddressRequest()
        } else {
            setIsGetting(false)
        }
    }

    const openEditAddressModal = () => {
        setIsOpenUpdateAddressModal(true)
        setIsOptionsModalVisible(false)
    }

    const submitUpdatedAddress = () => {
        const addressId = address[updateSelectedIndex]?._id
        // console.log(`\nupdatedAddressType: ${updateAddressType}`)
        // console.log(`updatedAddressInfo: ${updateAddressInfo}`)
        // console.log(`addressId: ${addressId}`)

        if (updateAddressType.trim() !== '' && updateAddressInfo.trim() !== '') {

            const updatedAddressPayload = {
                addressType: updateAddressType,
                address: updateAddressInfo
            }

            isInternetConnected()
                .then(() => {
                    dispatch(updateAddressRequest({ addressId: addressId, updatedAddressPayload }))
                    setIsOpenUpdateAddressModal(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            showErrorAlert('Please fill up the address field.', Colors.yellow, Colors.black)
        }
    }

    const handleDeleteAddress = () => {
        setIsOptionsModalVisible(false)
        setIsConfirmationModalVisible(true)
    }

    const onDeleteAddress = () => {
        const addressId = address[updateSelectedIndex]?._id
        setIsConfirmationModalVisible(false)
        isInternetConnected()
            .then(() => {
                dispatch(deleteAddressRequest({ addressId: addressId }))
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Saved Addresses`}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    color={Colors.black}
                    borderBottomColor={Colors.mediumGrey}
                    borderBottomWidth={0.5}
                    titleTop={1}

                    leftIcon={Icons.back}
                    leftIconSize={18}
                    leftIconLeft={10}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}

                    rightText={`Add`}
                    rightTextColor={address.length === 0 ? Colors.transparent : Colors.orange}
                    rightTextFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    rightTextFontSize={18}
                    isDisabled={address.length === 0 ? true : false}
                    rightTextTop={1}
                    rightTextRight={25}
                    onRightPress={() => {
                        setIsOpenNewAddressModal(true)
                        setAddressInfo('')
                    }}
                />
            </View>

            <FlatList
                data={address}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={renderAddressComponent}
                contentContainerStyle={{
                    // backgroundColor: Colors.red,
                    paddingHorizontal: 25,
                    paddingVertical: 20,
                }}
                // ListEmptyComponent={emptyAddressListComponent}
                ListEmptyComponent={AddressReducer?.status == 'Address/getAllAddressRequest' ? '' : emptyAddressListComponent}
                scrollEventThrottle={16}
                onMomentumScrollEnd={e => {
                    if (isCloseToBottom(e.nativeEvent)) {
                        refreshData()
                    }
                }}
                refreshControl={<RefreshControl
                    refreshing={AddressReducer?.status == 'Address/getAllAddressRequest'}
                    onRefresh={() => getAllAddressRequest()}
                />}
            />

            <NewAddressModal
                modalTitle={`New Address`}
                isAddAddressModalVisible={isOpenNewAddressModal}
                setIsAddAddressModalVisible={() => setIsOpenNewAddressModal(false)}
                btnAddAddress={submitNewAddress}
                address={addressInfo}
                setAddress={txt => {
                    setAddressInfo(txt)
                    // console.log(`setAddressInfo--->>1234: ${addressInfo}`)
                }}
                funcSelectedLabel={(selectedLabel) => {
                    // console.log(`selectedLabel123--->>>: ${selectedLabel}`)
                    setAddressType(selectedLabel)
                }}
            />


            <NewAddressModal
                modalTitle={`Update Address`}
                isAddAddressModalVisible={isOpenUpdateAddressModal}
                setIsAddAddressModalVisible={() => setIsOpenUpdateAddressModal(false)}
                btnAddAddress={submitUpdatedAddress}
                address={updateAddressInfo}
                setAddress={txt => {
                    setUpdateAddressInfo(txt)
                    // console.log(`updateAddressInfo--->>: ${updateAddressInfo}`)
                }}
                funcSelectedLabel={(selectedLabel) => {
                    // console.log(`selectedLabel--->>>: ${selectedLabel}`)
                    setUpdateAddressType(selectedLabel)
                }}
            />

            <OptionsModal
                visible={isOptionsModalVisible}
                title={`Address Options`}
                onClose={() => setIsOptionsModalVisible(false)}
                question={`What would you like to do?`}

                leftBGColor={Colors.mediumBlue}
                onLeftPress={openEditAddressModal}
                leftTitle={`Edit`}

                rightBGColor={Colors.red}
                rightTitle={`Delete`}
                onRightPress={handleDeleteAddress}
            />

            <ConfirmationModal
                visible={isConfirmationModalVisible}
                onClose={() => setIsConfirmationModalVisible(false)}
                onConfirm={onDeleteAddress}
                title={`Delete Address`}
                question={`Are you sure you want to delete yoour address ?`}
                rejectTitle={`No`}
                acceptTitle={'Yes'}
            />
        </View>
    )
}

export default ChangeAddress

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        // backgroundColor: Colors.black,
        width: '100%',
        paddingTop: 20
    },
    viewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginTop: 10,
        justifyContent: 'center'

    },
    // disabledButton: {
    //     backgroundColor: Colors.red
    // },





    // Render list
    DeliveryAddressContainer: {
        backgroundColor: Colors.lightGrey,
        paddingVertical: 10,
        // paddingHorizontal: 25,
        marginVertical: 5,
        borderRadius: 12,
        overflow: 'hidden',

        borderColor: Colors.transparent,
        borderWidth: 0.7
    },
    btnAddress: {
        // backgroundColor: Colors.lightGrey,
        padding: 5,
        paddingHorizontal: 15,
    },
    txtAddressContainer: {
        // backgroundColor: Colors.blue,
        marginLeft: 15
    },
    viewAddressType: {
        flexDirection: 'row',
    },
    imgAddressTypeIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.orange
    },
    txtAddressType: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.orange,
        fontSize: 18,
        marginLeft: 12,
        top: -3
    },
    btnViewAddress: {
        // backgroundColor: Colors.mediumGrey,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewFlexAddress: {
        // backgroundColor: Colors.mediumGrey,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 1,
    },
    imgAddressIcons: {
        height: 14,
        width: 14,
        resizeMode: 'contain',
        tintColor: Colors.orange,
        left: 2,
    },
    txtAddress: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        color: Colors.black,
        top: 1,
        marginLeft: 10
    },
    imgArrowRight: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.black,
    },









    // Empty List
    btnAddAddress: {
        // backgroundColor: Colors.blue,
        height: 100,
        borderColor: Colors.orange,
        borderWidth: 0.8,
        borderRadius: 8,
        borderStyle: 'dashed',

        justifyContent: 'center',
        alignItems: 'center',
    },
    viewFlexButton: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: width - 50

    },
    txtAdd: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        marginLeft: 10
    },
    imgPlus: {
        // backgroundColor: Colors.blue,
        height: 8,
        width: 8,
        resizeMode: 'contain',
        tintColor: Colors.black,
    },
    viewImgMapView: {
        backgroundColor: Colors.transparent,
        height: 95,
        width: 95,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        // right: 10,

        borderColor: Colors.orange,
        borderWidth: 0.5,
    },
    imgMapView: {
        height: 90,
        width: 90,
        resizeMode: 'cover',
        borderRadius: 12,
    },





















    defaultView: {
        backgroundColor: Colors.transparent,
        position: 'absolute',
        top: 10,
        right: -25,
        transform: [{ rotate: '45deg' }],
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 8,
    },
    txtDefault: {
        color: Colors.transparent,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },

})