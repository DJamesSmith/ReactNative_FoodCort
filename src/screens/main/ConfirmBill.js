import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, FlatList, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'
import Accordion from 'react-native-collapsible/Accordion'
import CustomButton from '../../components/CustomButton'
import ProductPurchaseList from '../../components/ProductPurchaseList'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { getAllAddressRequest } from '../../redux/reducers/AddressReducer'

const { width, height } = Dimensions.get('screen')

var status = ''

const ConfirmBill = ({ navigation, route }) => {
    const { productId, title, imgIcon, price, productPlusEICost, navSource } = route.params
    // console.log(`productId: ${productId}\ntitle: ${title}\nimgIcon: ewew\nprice: ${price}\nproductPlusEICost: ${productPlusEICost}`)

    const dispatch = useDispatch()
    const AddressReducer = useSelector(state => state.AddressReducer)
    const isFocused = useIsFocused()

    const [address, setAddress] = useState([])
    const [defaultAddress, setDefaultAddress] = useState({})

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

                    const defaultAddr = AddressReducer?.allAddresses.find(item => item?.isDefault)
                    setDefaultAddress(defaultAddr ? defaultAddr : {})

                    break

                case 'Address/getAllAddressFailure':
                    status = AddressReducer?.status
                    console.log(`-->> getAllAddressFailure`)
                    break
                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [AddressReducer])

    const [activeSections, setActiveSections] = useState([0, 1])

    const toggleSection = index => {
        const isActive = activeSections.includes(index)
        if (isActive) {
            setActiveSections(activeSections.filter(i => i !== index))
        } else {
            setActiveSections([...activeSections, index])
        }
    }

    const renderHeader = (section, index, isActive) => {
        const isSectionActive = activeSections.includes(index)
        const arrowIcon = isSectionActive ? Icons.arrowDown : Icons.arrowRight

        return (
            <TouchableOpacity
                onPress={() => toggleSection(index)}
                activeOpacity={0.8}
                style={styles.header}>
                <Text style={styles.headerText}>{section}</Text>
                {
                    section === 'Delivery Address' ? (
                        <TouchableOpacity
                            style={styles.changeButton}
                            onPress={() => console.log('Change Address')}>
                            <Text
                                style={[styles.changeButtonText, { top: 2 }]}
                                onPress={() => navigation.navigate(`ChangeAddress`)}>Change</Text>
                        </TouchableOpacity>
                    ) : (
                        <Image
                            source={arrowIcon}
                            style={[styles.imgArrowRight, { top: 2 }]}
                        />
                    )
                }
            </TouchableOpacity>
        )
    }

    const renderContent = (section, index, isActive, productPlusEICost) => {
        switch (section) {
            case 'Delivery Address':
                return AddressReducer?.status == 'Address/getAllAddressRequest' ? <ActivityIndicator color={Colors.orange} size={'small'} style={styles.activityIndicator} /> : <DeliveryAddress />
            case 'Order Bill':
                return <OrderBill productPlusEICost={productPlusEICost} />
            case 'Payment Method':
                return <PaymentMethod />
            default:
                return null
        }
    }

    const updateSections = sections => {
        setActiveSections(sections)
    }

    const DeliveryAddress = () => {
        if (!defaultAddress) {
            return <Text>No default address available</Text>
        }

        return (
            <View style={styles.DeliveryAddressContainer}>
                <TouchableOpacity style={styles.btnAddress} activeOpacity={0.7}>
                    <Text style={styles.txtAddressType}>{defaultAddress?.addressType || 'Address'}</Text>
                    <View style={styles.btnViewAddress}>
                        <View>
                            <View style={[styles.viewFlexAddress, { width: '95%' }]}>
                                <Image
                                    source={Icons.locationFill}
                                    style={styles.imgAddressIcons}
                                />
                                <Text style={styles.txtAddress}>{defaultAddress?.address || 'No Address'}</Text>
                            </View>
                            <View style={styles.viewFlexAddress}>
                                <Image
                                    source={Icons.userFill}
                                    style={styles.imgAddressIcons}
                                />
                                <Text style={styles.txtAddress}>{`${defaultAddress?.user?.first_name} ${defaultAddress?.user?.last_name}` || 'No Name'}</Text>
                            </View>
                            <View style={styles.viewFlexAddress}>
                                <Image
                                    source={Icons.phoneFill}
                                    style={styles.imgAddressIcons}
                                />
                                <Text style={styles.txtAddress}>{defaultAddress?.user?.contact || 'No Phone'}</Text>
                            </View>
                        </View>
                        <Image
                            source={Icons.arrowRight}
                            style={styles.imgArrowRight}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const OrderBill = (productPlusEICost) => {
        return (
            <View style={styles.OrderBillContainer}>
                <View style={styles.orderBillItems}>
                    <ProductPurchaseList
                        productPlusEICost={productPlusEICost}
                        productCost={price}
                        eiProductId={productId}
                        navigation={navigation}
                        navSource={navSource}
                    />
                </View>
            </View>
        )
    }

    const PaymentMethod = () => {
        return (
            <TouchableOpacity style={styles.btnDebitCard} activeOpacity={0.9}>
                <View style={styles.debitShadow}>
                    <Image
                        source={require('../../assets/icons/visa.png')}
                        style={[styles.imgDebitCard, { top: 2 }]}
                    />
                </View>
                <Text style={styles.txtDebitNumber}>xxxx xxxx xxxx x089</Text>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/711/711239.png' }}
                    // source={{ uri: 'https://cdn-icons-png.flaticon.com/128/481/481078.png' }}
                    style={styles.imgCheckmark}
                />
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Confirm Bill`}
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

            <FlatList
                data={[0]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => {
                    return <Accordion
                        activeSections={activeSections}
                        sections={['Delivery Address', 'Order Bill', 'Payment Method']}
                        renderHeader={renderHeader}
                        renderContent={(section, index, isActive) => renderContent(section, index, isActive, productPlusEICost)}
                        onChange={updateSections}
                    />
                }}
                contentContainerStyle={{
                    paddingBottom: 150
                }}
            />

            <View style={styles.btnConfirmAddress}>
                <CustomButton
                    BGColor={Colors.orange}
                    title={`Confirm & Pay`}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    viewHeight={60}
                    width={'90%'}
                    alignItems={'center'}
                    onPressFunc={() => {
                        console.log(`Confirm & Pay`)
                    }}
                />
            </View>
        </View>
    )
}

export default ConfirmBill

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
    header: {
        paddingVertical: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopColor: Colors.mediumGrey,
        borderTopWidth: 0.2,
        paddingHorizontal: 25
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.black
    },
    DeliveryAddressContainer: {
        // backgroundColor: Colors.orange,
        paddingBottom: 20,
        paddingHorizontal: 25,
    },
    changeButton: {
        // backgroundColor: Colors.red,

    },
    changeButtonText: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.orange
    },



    txtAddressType: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.mediumGrey,
        fontSize: 16
    },
    btnAddress: {
        // backgroundColor: Colors.lightGrey,
        padding: 5,
        paddingLeft: 10,
    },
    btnViewAddress: {
        // backgroundColor: Colors.mediumGrey,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    viewFlexAddress: {
        // backgroundColor: Colors.mediumGrey,
        flexDirection: 'row',
        alignItems: 'center',
        // margin: 1
    },
    imgAddressIcons: {
        height: 14,
        width: 14,
        resizeMode: 'contain',
        tintColor: Colors.orange,
    },
    txtAddress: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.black,
        top: 2,
        marginLeft: 10
    },

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

    btnConfirmAddress: {
        backgroundColor: Colors.white,
        position: 'absolute',
        alignSelf: 'center',
        height: 80,
        width: width,
        alignItems: 'center',
        bottom: 0,
        paddingTop: 5,
    },

    OrderBillContainer: {
        // backgroundColor: Colors.blue,
        paddingHorizontal: 25,
    },
    orderBillItems: {
        // backgroundColor: Colors.blue,
        paddingVertical: 5
    },
    imgArrowRight: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.black,
    },

    btnDebitCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 80,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,

        borderColor: Colors.mediumGrey,
        borderWidth: 0.5,

        marginVertical: 5,
        marginHorizontal: 25,
    },
    debitShadow: {
        backgroundColor: Colors.white,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 12,
    },
    imgDebitCard: {
        height: 45,
        width: 45,
        resizeMode: 'contain'
    },
    txtDebitNumber: {
        position: 'absolute',
        left: 95,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.black,
        fontSize: 20,
        letterSpacing: 2
    },
    imgCheckmark: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.orange,
    },
    activityIndicator: {
        // backgroundColor: Colors.mediumGrey,
        height: 40,
        marginVertical: 20
    },
})