import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, ImageBackground, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'
import LinearGradient from 'react-native-linear-gradient'
import QuantityCounter from '../../components/QuantityCounter'
import CustomButton from '../../components/CustomButton'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCartItemsRequest } from '../../redux/reducers/CartReducer'
import { Animations } from '../../themes/Animations'
import LottieView from 'lottie-react-native'

const { width, height } = Dimensions.get('screen')

var status = ''

const MyCart = ({ navigation }) => {

    const dispatch = useDispatch()
    const CartReducer = useSelector(state => state.CartReducer)
    const isFocused = useIsFocused()

    const [allCartItems, setAllCartItems] = useState([])
    const [isGetting, setIsGetting] = useState(true)

    const [itemQuantities, setItemQuantities] = useState([])
    const [totalPrice, setTotalPrice] = useState(0);

    const [isHeaderVisible, setIsHeaderVisible] = useState(true)
    const discountAmount = '₹ 500'


    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getAllCartItemsRequest())
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    useEffect(() => {
        if (CartReducer?.status !== status || status == '') {
            switch (CartReducer?.status) {
                case 'MyCart/getAllCartItemsRequest':
                    status = CartReducer?.status
                    console.log(`-->> getAllCartItemsRequest`)
                    break

                case 'MyCart/getAllCartItemsSuccess':
                    status = CartReducer?.status
                    console.log(`-->> getAllCartItemsSuccess`)
                    setAllCartItems(CartReducer?.allCartItems ? CartReducer?.allCartItems : [])
                    break

                case 'MyCart/getAllCartItemsFailure':
                    status = CartReducer?.status
                    console.log(`-->> getAllCartItemsFailure`)
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [CartReducer])

    const handleCloseHeader = () => {
        setIsHeaderVisible(false)
    }

    const handleOpenHeader = () => {
        setIsHeaderVisible(true)
    }

    const headerComponent = ({ item, index }) => {
        return (
            <View style={styles.viewOfferContainer}>
                <ImageBackground
                    source={{ uri: 'https://images.pexels.com/photos/11398856/pexels-photo-11398856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                    style={styles.imgFoodCorner}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.darkBG, Colors.transparent]} style={styles.linearGradient}>
                        <Text style={styles.txtOfferHead}>FoodCort Discount</Text>
                        <Text style={styles.txtOfferBody}>40% discount for purchases over {discountAmount ? <Text style={styles.txtDiscount}>{discountAmount}</Text> : <></>}, valid for today only</Text>
                        <TouchableOpacity
                            style={styles.btnOffer}
                            activeOpacity={0.5}>
                            <Text style={styles.txtOfferBtn}>Get Discount</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnClose} onPress={handleCloseHeader}>
                            <Text style={styles.txtClose}>✕</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </ImageBackground>
            </View>
        )
    }

    const discountOffer = () => {
        return (
            <TouchableOpacity style={styles.btnAdDiscountOffer} onPress={handleOpenHeader}>
                <Text style={styles.txtAdDiscountOffer}>Show Discount Offer</Text>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        if (allCartItems.length > 0) {
            setItemQuantities(Array(allCartItems.length).fill(1))
            calculateTotalPrice()
        }
    }, [allCartItems])

    console.log(`itemQuantities: ${itemQuantities}`)

    const handleIncrement = index => {
        // console.log(`index: ${index}`)
        const newQuantities = [...itemQuantities]
        newQuantities[index]++
        setItemQuantities(newQuantities)
        calculateTotalPrice()
        // console.log(`newQuantities after increment: ${newQuantities}`)
    }

    const handleDecrement = index => {
        // console.log(`index: ${index}`)
        const newQuantities = [...itemQuantities]
        if (newQuantities[index] > 1) {
            newQuantities[index]--
            setItemQuantities(newQuantities)
            calculateTotalPrice()
        }
        // console.log(`newQuantities after decrement: ${newQuantities}`)
    }

    const calculateTotalPrice = () => {
        let total = 0
        allCartItems.forEach((item, index) => {
            total += item.productPrice * itemQuantities[index]
        });
        setTotalPrice(total)
    }

    useEffect(() => {
        calculateTotalPrice()
    }, [itemQuantities])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20
        return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom)
    }

    const refreshData = () => {
        setIsGetting(true)
        if (CartReducer?.status == 'MyCart/getAllCartItemsRequest' && isGetting) {
            getAllCartItemsRequest()
        } else {
            setIsGetting(false)
        }
    }

    const renderCartItemComponent = ({ item, index }) => {
        const { image_product, productTitle, productDescription, productPrice, productRating, productKiloCalories, productDeliveryTime, productIsLiked, } = item

        return (
            <View style={styles.btnComponent}>
                <Image
                    source={{ uri: image_product === '' ? `https://cdn-icons-png.flaticon.com/128/7894/7894046.png` : `data:image/jpeg;base64,${image_product}` }}
                    style={styles.imgIcon}
                />
                <View style={styles.viewText}>
                    <Text style={styles.txtTitle}>{productTitle}</Text>
                    <View style={styles.flexTxtPrice}>
                        <Text style={styles.txtSymbol}>₹</Text>
                        <Text style={styles.txtPrice}>{productPrice * itemQuantities[index]}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.btnEdit}
                        onPress={() => navigation.navigate('ExtraIngredients', {
                            title: productTitle,
                            imgIcon: image_product,
                            price: productPrice,
                        })}>
                        <Text style={styles.txtBtnEdit}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewQuantityCounter}>
                    <QuantityCounter
                        BGColor={Colors.lightGrey}
                        btnHandleDecrement={() => handleDecrement(index)}
                        btnHandleIncrement={() => handleIncrement(index)}
                        counter={itemQuantities[index]}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`My Cart`}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    color={Colors.black}
                    borderBottomColor={Colors.mediumGrey}
                    borderBottomWidth={0.5}

                    leftIcon={Icons.back}
                    leftIconLeft={10}
                    leftIconSize={18}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}
                />
            </View>

            <View style={styles.contentContainer}>
                <FlatList
                    data={allCartItems}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={isHeaderVisible ? headerComponent : discountOffer}
                    ListHeaderComponentStyle={{
                        marginBottom: 20
                    }}
                    renderItem={renderCartItemComponent}
                    contentContainerStyle={{
                        // backgroundColor: Colors.red,
                        paddingHorizontal: 30,
                        paddingBottom: 180,
                        paddingTop: isHeaderVisible ? 0 : 20
                    }}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={e => {
                        if (isCloseToBottom(e.nativeEvent)) {
                            refreshData()
                        }
                    }}
                    refreshControl={<RefreshControl
                        refreshing={CartReducer?.status == 'MyCart/getAllCartItemsRequest'}
                        onRefresh={() => getAllCartItemsRequest()}
                    />}
                    ListEmptyComponent={() => {
                        return CartReducer?.status == 'MyCart/getAllCartItemsRequest' ? (
                            null
                        ) : (
                            <View style={styles.lottieContainer}>
                                <LottieView
                                    style={{ flex: 1 }}
                                    source={Animations.emptyCart}
                                    autoPlay
                                    loop={false}
                                />
                            </View>
                        )
                    }}
                />
            </View>

            <View style={styles.viewCheckout}>
                <View style={styles.flexBottomView}>
                    <Text style={styles.txtOrder}>Order Total</Text>
                    <View style={styles.flexTxtPrice}>
                        <Text style={[styles.txtSymbol, {
                            top: 5,
                            right: 2
                        }]}>₹</Text>
                        <Text style={styles.txtTotalPrice}>{totalPrice}</Text>
                    </View>
                </View>
                <CustomButton
                    viewHeight={60}
                    width={`100%`}
                    BGColor={Colors.orange}
                    fontSize={20}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    title={`Checkout Now`}
                    titleTop={14}
                    alignSelf={'center'}
                    onPressFunc={() => navigation.navigate(`ConfirmBill`, {
                        productId: 'randomProductId',
                        title: 'randomTitle',
                        imgIcon: 'randomImgIcon',
                        price: 'randomPrice',
                        productPlusEICost: totalPrice,
                        navSource: 'MyCart'
                    })}
                />
            </View>
        </View>
    )
}

export default MyCart

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        backgroundColor: Colors.transparent,
        width: '100%',
        paddingTop: 20,
    },
    contentContainer: {
        // backgroundColor: Colors.green,
    },
    viewOfferContainer: {
        backgroundColor: Colors.red,
        marginTop: 20,
        height: 200,
        width: width - 50,
        alignSelf: 'center',
        borderRadius: 12,
        overflow: 'hidden'
    },
    linearGradient: {
        height: 225,
        width: width / 1.2,
        paddingHorizontal: 20
    },
    imgFoodCorner: {
        height: 225,
        width: '100%'
    },
    txtOfferHead: {
        fontFamily: Fonts.CaveatBrush_Regular,
        fontSize: 18,
        color: Colors.orange,
        letterSpacing: 1.5,
        top: 20
    },
    txtOfferBody: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.white,
        top: 25,
        width: '80%'
    },
    txtDiscount: {
        color: Colors.orange
    },
    btnOffer: {
        backgroundColor: Colors.transparent,
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        bottom: 50,
        left: 20,

        borderColor: Colors.white,
        borderWidth: 1
    },
    txtOfferBtn: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.white,
    },
    btnAdDiscountOffer: {
        backgroundColor: Colors.lightGrey,
        height: 50,
        width: width - 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    txtAdDiscountOffer: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 16,
        color: Colors.grey
    },
    btnClose: {
        position: 'absolute',
        top: 10,
        right: 0,
        height: 20,
        width: 20,
        backgroundColor: Colors.black,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtClose: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 12,
        color: Colors.white,
    },
    btnComponent: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'flex-start'
    },
    imgIcon: {
        height: 80,
        width: 80,
        resizeMode: 'cover',
        borderRadius: 20
    },
    viewText: {
        // backgroundColor: Colors.blue,
        marginLeft: 20,
        height: '100%',

    },
    txtTitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        top: 3,
        width: width - 150
    },
    flexTxtPrice: {
        flexDirection: 'row',

    },
    txtSymbol: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.orange,
        top: -1
    },
    txtPrice: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 25,
        color: Colors.black,
        marginLeft: 3,
        top: -5
    },
    btnEdit: {
        // backgroundColor: Colors.blue,
        top: -15,
        width: '30%'
    },
    txtBtnEdit: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        color: Colors.orange,
    },
    viewQuantityCounter: {
        position: 'absolute',
        right: 0,
        bottom: 10
    },
    viewCheckout: {
        backgroundColor: Colors.white,
        height: 120,
        width: width,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    flexBottomView: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    txtOrder: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.grey,
    },
    txtTotalPrice: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 28,
        color: Colors.black,
    },
    lottieContainer: {
        // backgroundColor: Colors.blue,
        height: 300,
        aspectRatio: 1,
        alignSelf: 'center'
    },
})