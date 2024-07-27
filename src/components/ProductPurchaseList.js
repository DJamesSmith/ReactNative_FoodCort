import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../themes/Colors'
import Accordion from 'react-native-collapsible/Accordion'
import { Icons } from '../themes/Icons'
import { Fonts } from '../themes/Fonts'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../utils/helpers/NetInfo'
import showErrorAlert from '../utils/helpers/Toast'
import { deleteCartItemRequest, getAllCartItemsRequest } from '../redux/reducers/CartReducer'
import ExtraIngredientBottomSheet from '../utils/bottomSheets/ExtraIngredientBottomSheet'
import { getExtraIngredientRequest } from '../redux/reducers/ExtraIngredientsReducer'
import NoData from '../utils/NoData'
import { Animations } from '../themes/Animations'

var status = ''

// source:
// source === ExtraIngredients
// source === MyCart

const ProductPurchaseList = ({ navigation, productPlusEICost, productCost, eiProductId, navSource }) => {

    const dispatch = useDispatch()
    const CartReducer = useSelector(state => state.CartReducer)
    const ExtraIngredientsReducer = useSelector(state => state.ExtraIngredientsReducer)

    const isFocused = useIsFocused()
    const [allCartItems, setAllCartItems] = useState([])
    const [extraIngredients, setExtraIngredients] = useState([])

    const [selectedProduct, setSelectedProduct] = useState({})
    const [correspondingExtraIngredients, setCorrespondingExtraIngredients] = useState([])
    const [isExtraIngredientModalVisible, setIsExtraIngredientModalVisible] = useState(false)
    const [isExtraIngredientLoading, setIsExtraIngredientLoading] = useState(false)

    const shippingFee = 12.00

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getAllCartItemsRequest())
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    const productAmt = productPlusEICost.productPlusEICost
    // console.log(`productCost----------------------->: ${productCost}`)
    // console.log(`eiProductId----------------------->>>: ${eiProductId}`)
    // console.log(`productPlusEICost----------------------->>>: ${productPlusEICost.productPlusEICost}`)
    console.log(`navSource --------->>>: ${navSource}`)

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



                case 'MyCart/deleteCartItemRequest':
                    status = CartReducer?.status
                    console.log(`-->> deleteCartItemRequest`)
                    break

                case 'MyCart/deleteCartItemSuccess':
                    status = CartReducer?.status
                    console.log(`-->> deleteCartItemSuccess`)
                    isInternetConnected()
                        .then(() => {
                            dispatch(getAllCartItemsRequest())
                        })
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'MyCart/deleteCartItemFailure':
                    status = CartReducer?.status
                    console.log(`-->> deleteCartItemFailure`)
                    break

                default:
                    break
            }
        }
    }, [CartReducer])

    useEffect(() => {
        if (ExtraIngredientsReducer?.status !== status || status == '') {
            switch (ExtraIngredientsReducer?.status) {
                case 'ExtraIngredient/getExtraIngredientRequest':
                    status = ExtraIngredientsReducer?.status
                    console.log('-->> getExtraIngredientRequest')
                    break

                case 'ExtraIngredient/getExtraIngredientSuccess':
                    status = ExtraIngredientsReducer?.status
                    console.log('-->> getExtraIngredientSuccess')
                    const ingredients = Array.isArray(ExtraIngredientsReducer?.extraIngredients) ? ExtraIngredientsReducer?.extraIngredients : []
                    setExtraIngredients(ingredients)
                    setCorrespondingExtraIngredients(ingredients)
                    setIsExtraIngredientLoading(false)
                    break

                case 'ExtraIngredient/getExtraIngredientFailure':
                    status = ExtraIngredientsReducer?.status
                    console.log('-->> getExtraIngredientFailure')
                    setIsExtraIngredientLoading(false)
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [ExtraIngredientsReducer])

    const [activeOrderBill, setActiveOrderBill] = useState([0])

    const toggleSection = index => {
        const isActive = activeOrderBill.includes(index)
        if (isActive) {
            setActiveOrderBill(activeOrderBill.filter(i => i !== index))
        } else {
            setActiveOrderBill([...activeOrderBill, index])
        }
    }

    const calculateTotalCartPrice = () => {
        return allCartItems.reduce((total, item) => total + parseFloat(item.productPrice || 0), 0)
    }

    const renderHeader = (section, index, isActive) => {
        const isSectionActive = activeOrderBill.includes(index)
        const arrowIcon = isSectionActive ? Icons.arrowDown : Icons.arrowRight

        const totalCartPrice = calculateTotalCartPrice()
        const totalPrice = productAmt ? (productAmt + totalCartPrice) - productCost : totalCartPrice

        const isAnyItemMatched = allCartItems.some(item => item._id === eiProductId)
        const matchText = isAnyItemMatched ? "HeaderMatch" : "header not match"

        return (
            <TouchableOpacity
                onPress={() => toggleSection(index)}
                activeOpacity={section === 'Product' ? 0.4 :
                    section === 'Price' ? 1 :
                        section === 'Shipping Fee' ? 1 :
                            section === 'Have a promo code?' ? 0.7 : section === 'Total Bill' ? 1 :
                                null}
                style={styles.header}>
                <Text style={section === 'Have a promo code?' ? styles.txtPromoCodeHeader : section === 'Total Bill' ? styles.txtTotalBillHeader : styles.headerText}>{section}</Text>
                {
                    section === 'Product' ? (
                        <View style={styles.flexProductHeader}>
                            <Text style={styles.changeButtonText}>3 items</Text>
                            <Image
                                source={arrowIcon}
                                style={[styles.imgArrowRight, { top: 4 }]}
                            />
                        </View>
                    ) :
                        section === 'Price' ? <Text style={styles.txtOrderBillRight}>₹ {
                            navSource === 'MyCart' ? productAmt :
                                allCartItems.length === 0 ? 0 : isAnyItemMatched ? totalPrice : totalPrice - (productAmt - productCost)
                        }</Text> :
                            section === 'Shipping Fee' ? <Text style={styles.txtOrderBillRight}>₹ {allCartItems.length === 0 ? 0 : 12.00}</Text> :
                                section === 'Have a promo code?' ? <Image
                                    source={arrowIcon}
                                    style={[styles.imgArrowRight, { tintColor: Colors.orange }]}
                                /> :
                                    section === 'Total Bill' ? <Text style={styles.txtTotalBill}>₹ {CartReducer?.status == 'MyCart/getAllCartItemsRequest' ?
                                        <Text style={styles.txtCalculating}>...Calculating</Text> : navSource === 'MyCart' ? productAmt + shippingFee :
                                            allCartItems.length === 0 ? 0 : isAnyItemMatched ?
                                                totalPrice + shippingFee : (totalPrice + shippingFee) - (productAmt - productCost)}</Text> : null
                }
            </TouchableOpacity>
        )
    }

    const renderContent = (section, index, isActive) => {
        switch (section) {
            case 'Product':
                return <Product />
            case 'Price':
                return <Price />
            case 'Shipping Fee':
                return <ShippingFee />
            case 'Have a promo code?':
                return <PromoCode />
            case 'Total Bill':
                return <TotalBill />
            default:
                return null
        }
    }

    const updateSections = sections => {
        setActiveOrderBill(sections)
    }

    const handleDeleteCartItem = productId => {
        // console.log(`productId: ${productId}`)
        isInternetConnected()
            .then(() => {
                dispatch(deleteCartItemRequest({ productId }))
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    useEffect(() => {
        if (isExtraIngredientModalVisible) {
            setCorrespondingExtraIngredients(extraIngredients)
        }
    }, [isExtraIngredientModalVisible, extraIngredients])

    const handleShowExtraIngredientModal = product => {
        // console.log(`product._idPPL---->>>>: ${product._id}`)
        setSelectedProduct(product)
        setIsExtraIngredientModalVisible(true)

        isInternetConnected()
            .then(() => {
                dispatch(getExtraIngredientRequest({ productId: product._id }))
                setIsExtraIngredientLoading(true)
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    const renderPurchaseProduct = ({ item, index }) => {
        const { _id, productTitle, productDescription, productPrice, productRating, productDeliveryTime, image_product } = item
        const isMatched = _id === eiProductId

        return (
            <TouchableOpacity style={styles.flexProductItem}>
                <View style={styles.viewImgProduct}>
                    <Image
                        source={{ uri: image_product ? `data:image/jpeg;base64,${image_product}` : 'https://cdn-icons-png.flaticon.com/128/4727/4727400.png' }}
                        style={styles.imgPurchaseProduct}
                    />
                </View>
                <View style={styles.viewTxtProduct}>
                    <Text style={styles.txtProductTitle}>{productTitle}</Text>
                    <Text style={styles.txtProductPrice}>₹{isMatched ? productAmt + `\t\tWith Extra ingredients` : productPrice}</Text>
                    <TouchableOpacity style={styles.btnEdit} onPress={() => handleShowExtraIngredientModal(item)}>
                        <Text style={styles.txtBtnEdit}>Edit</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.btnImgDelete}
                    onPress={() => handleDeleteCartItem(_id)}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2976/2976286.png' }}
                        style={styles.imgDelete}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    const Product = () => {
        return (
            <View style={styles.flatlistContainer}>
                {
                    CartReducer?.status == 'MyCart/getAllCartItemsRequest' ? <ActivityIndicator color={Colors.orange} size={'small'} style={styles.activityIndicator} /> : <FlatList
                        data={allCartItems}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderPurchaseProduct}
                        ListEmptyComponent={() => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate(`Drawer`)} activeOpacity={0.8}>
                                    <NoData renderAnimation={Animations.foodChoice} />
                                    <Text style={styles.txtAddItems}>Add item to your Cart ?</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                }
            </View>
        )
    }

    const Price = () => {

    }

    const ShippingFee = () => {

    }

    const PromoCode = () => {

    }

    const TotalBill = () => {

    }

    const handleSubmitExtraIngredient = () => {
        console.log(`Submit Extra Ingredients`)
    }

    return (
        <>
            <Accordion
                activeSections={activeOrderBill}
                sections={['Product', 'Price', 'Shipping Fee', 'Have a promo code?', 'Total Bill']}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={updateSections}
            />

            <ExtraIngredientBottomSheet
                isExtraIngredientModalVisible={isExtraIngredientModalVisible}
                setIsExtraIngredientModalVisible={setIsExtraIngredientModalVisible}
                handleSubmitPrice={handleSubmitExtraIngredient}
                product={selectedProduct}
                correspondingExtraIngredient={correspondingExtraIngredients}
                isExtraIngredientLoading={isExtraIngredientLoading}
            />
        </>
    )
}

export default ProductPurchaseList

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        // flex: 1,
    },
    imgArrowRight: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
        tintColor: Colors.black,
        marginLeft: 10
    },
    header: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 2,

        // borderColor: Colors.red,
        // borderWidth: 0.7,
    },
    headerText: {
        fontSize: 16,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        color: Colors.grey
    },
    txtPromoCodeHeader: {
        fontSize: 18,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.orange,
    },
    txtTotalBillHeader: {
        fontSize: 24,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
    },
    flexProductHeader: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
    },
    txtOrderBillRight: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.black
    },
    txtTotalBill: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 24,
        color: Colors.black,
    },
    changeButtonText: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.orange
    },



    flatlistContainer: {
        // backgroundColor: Colors.indigo,
        paddingBottom: 20
    },


    flexProductItem: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        marginVertical: 5,
        // alignItems: 'center',
    },
    viewImgProduct: {
        backgroundColor: Colors.lightGrey,
        height: 60,
        width: 60,
        borderRadius: 12,
        overflow: 'hidden',
        top: 5
    },
    imgPurchaseProduct: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
    },
    viewTxtProduct: {
        // backgroundColor: Colors.lightIndigo,
        flex: 1,
        marginLeft: 10,
    },
    txtProductTitle: {// -----------
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 20,
        color: Colors.black,
    },
    flexPriceView: {// -----------
        flexDirection: 'row',
        alignItems: 'center',
        top: -7,
    },
    txtProductPrice: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 14,
        color: Colors.black,
        textDecorationLine: 'none',
        top: -6,
    },
    btnEdit: {// -----------
        // backgroundColor: Colors.black,
        top: -10
    },
    txtBtnEdit: {
        color: Colors.orange,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 14,
    },
    btnImgDelete: {
        // backgroundColor: Colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50
    },
    imgDelete: {
        height: 10,
        width: 10,
        resizeMode: 'contain',
        tintColor: Colors.red,
    },
    activityIndicator: {
        // backgroundColor: Colors.mediumGrey,
        height: 40,
        marginVertical: 20
    },
    txtCalculating: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 20,
        color: Colors.orange
    },
    txtAddItems: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.orange,
        textAlign: 'center'
    },
})