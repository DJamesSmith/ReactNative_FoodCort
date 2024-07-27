import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, VirtualizedList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import QuantityCounter from '../../components/QuantityCounter'
import { Icons } from '../../themes/Icons'
import Header from '../../components/Header'
import CustomButton from '../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { getExtraIngredientRequest } from '../../redux/reducers/ExtraIngredientsReducer'
import { Linking } from 'react-native'
import { postCartItemRequest } from '../../redux/reducers/CartReducer'

const { width, height } = Dimensions.get('screen')

var status = ''

const ExtraIngredients = ({ navigation, route }) => {
    const { productId, title, imgIcon, price } = route.params
    // console.log(`EI_productId: ${productId}, \tEI_title: ${title}, \tEI_price: ${price}`)

    var parsedPrice = parseFloat(price)

    const dispatch = useDispatch()
    const ExtraIngredientsReducer = useSelector(state => state.ExtraIngredientsReducer)
    const CartReducer = useSelector(state => state.CartReducer)

    const isFocused = useIsFocused()
    const [extraIngredients, setExtraIngredients] = useState([])

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getExtraIngredientRequest({ productId: productId }))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

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
                    // setExtraIngredients(ExtraIngredientsReducer?.extraIngredients ? ExtraIngredientsReducer?.extraIngredients : [])
                    const ingredients = Array.isArray(ExtraIngredientsReducer?.extraIngredients) ? ExtraIngredientsReducer?.extraIngredients : []
                    setExtraIngredients(ingredients)

                    break

                case 'ExtraIngredient/getExtraIngredientFailure':
                    status = ExtraIngredientsReducer?.status
                    console.log('-->> getExtraIngredientFailure')
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [ExtraIngredientsReducer])

    useEffect(() => {
        if (CartReducer?.status !== status || status == '') {
            switch (CartReducer?.status) {
                case 'MyCart/postCartItemRequest':
                    status = CartReducer?.status
                    console.log(`-->> postCartItemRequest`)
                    break

                case 'MyCart/postCartItemSuccess':
                    status = CartReducer?.status
                    console.log(`-->> postCartItemSuccess`)
                    break

                case 'MyCart/postCartItemFailure':
                    status = CartReducer?.status
                    console.log(`-->> postCartItemFailure`)
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [CartReducer])

    const [showAllIngredients, setShowAllIngredients] = useState(false)
    const [dishCounter, setDishCounter] = useState(1)
    const [ingredientCounters, setIngredientCounters] = useState([])
    const [productPlusEICost, setProductPlusEICost] = useState(parsedPrice)

    useEffect(() => {
        if (Array.isArray(extraIngredients)) {
            setIngredientCounters(extraIngredients.map(() => 0))
        } else {
            setIngredientCounters([])
            showErrorAlert("No extra ingredients available for this product.", Colors.yellow, Colors.black)
        }
    }, [extraIngredients])

    useEffect(() => {
        calculateTotalPrice()
    }, [dishCounter, ingredientCounters])

    const calculateTotalPrice = () => {
        if (dishCounter === 0) {
            setProductPlusEICost(0)
            return
        }

        let productPlusEICost = parsedPrice * dishCounter
        extraIngredients.forEach((ingredient, index) => {
            productPlusEICost += ingredientCounters[index] * ingredient.ingredientPrice
            // console.log(`ingredientCounters[${index}]: ${ingredientCounters[index]}`)
            // console.log(`ingredient.ingredientPrice: ${ingredient.ingredientPrice}`)
        })
        setProductPlusEICost(productPlusEICost)
    }

    const updateIngredientCounter = (index, value) => {
        const newCounters = [...ingredientCounters]
        newCounters[index] = value
        setIngredientCounters(newCounters)
    }

    console.log(`\n`)

    const toggleShowAllIngredients = () => {
        setShowAllIngredients(!showAllIngredients)
    }

    const renderMoreLessButton = () => {
        if (showAllIngredients) {
            return (
                <TouchableOpacity style={styles.moreButton} onPress={toggleShowAllIngredients}>
                    <Text style={styles.moreButtonText}>Less...</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={styles.moreButton} onPress={toggleShowAllIngredients}>
                    <Text style={styles.moreButtonText}>More...</Text>
                </TouchableOpacity>
            )
        }
    }

    const handleDishIncrement = () => {
        setDishCounter(dishCounter + 1)
    }

    const handleDishDecrement = () => {
        if (dishCounter > 0) {
            setDishCounter(dishCounter - 1)
        }
    }

    const headerComponent = ({ item, index }) => {
        // console.log(`dishCounter: ${dishCounter}`)

        return (
            <>
                <View style={styles.viewHeader}>
                    <View style={styles.viewImgShadow}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${imgIcon}` }}
                            style={styles.imgIcon}
                        />
                    </View>

                    <View style={styles.viewTitlePrice}>
                        <Text style={styles.txtTitle}>{title}</Text>
                        <View style={styles.viewFlexPrice}>
                            <Text style={styles.txtRupee}>₹</Text>
                            <Text style={styles.txtPrice}>{price}</Text>
                        </View>
                    </View>

                    <View style={styles.viewDishQuantiyCounter}>
                        <QuantityCounter
                            BGColor={Colors.lightGrey}
                            btnHandleIncrement={handleDishIncrement}
                            btnHandleDecrement={handleDishDecrement}
                            counter={dishCounter}
                        />
                    </View>
                </View>
                <View style={styles.flexViewAddIngredients}>
                    <Text style={styles.txtHeader}>Add Extra Ingredients</Text>
                    {/* <ActivityIndicator color={Colors.orange} size={'small'} /> */}
                    {
                        ExtraIngredientsReducer?.status == 'ExtraIngredient/getExtraIngredientRequest' ? <ActivityIndicator
                            color={Colors.orange} size={'small'} style={{ right: 10 }} /> : extraIngredients.length > 3 && renderMoreLessButton()
                    }
                </View>
            </>
        )
    }

    const renderMainComponent = ({ item, index }) => {
        const ingredientCounter = ingredientCounters[index]

        // console.log(`ingredientCounter for ${item?.title}: ${ingredientCounter}`)

        const handleIngredientIncrement = () => {
            updateIngredientCounter(index, ingredientCounter + 1)
        }

        const handleIngredientDecrement = () => {
            if (ingredientCounter > 0) {
                updateIngredientCounter(index, ingredientCounter - 1)
            }
        }

        return (
            <View style={styles.viewAddExtraIngredients}>
                <View style={styles.imgViewIngredients}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item?.image_ingredient}` }}
                        // source={item?.imgIcon}
                        style={styles.imgIconIngredient}
                    />
                </View>
                <View style={styles.viewTxtIngredients}>
                    <Text style={[styles.txtIngredients, { color: Colors.black, fontSize: 18 }]}>{item?.ingredientName}</Text>
                    <View style={styles.viewQuantityPriceExtraIngredient}>
                        <View style={styles.viewFlexPriceExtraIng}>
                            <Text style={[styles.txtIngredients, { color: Colors.white }]}>₹</Text>
                            <Text style={[styles.txtIngredients, { color: Colors.white }]}>{item?.ingredientPrice}</Text>
                        </View>
                        <Text style={[styles.txtIngredients, { color: Colors.mediumGrey, marginLeft: 10 }]}>{item?.ingredientWeight}</Text>
                    </View>
                </View>
                <View style={styles.quantityCounterView}>
                    <QuantityCounter
                        BGColor={Colors.lightGrey}
                        btnHandleIncrement={handleIngredientIncrement}
                        btnHandleDecrement={handleIngredientDecrement}
                        counter={ingredientCounter}
                        isDisabled={dishCounter}
                    />
                </View>
            </View>
        )
    }

    const footerAddNote = () => {
        const [isFocused, setIsFocused] = useState(false)
        return (
            <>
                <Text style={[styles.txtHeader, { marginTop: 20 }]}>Note</Text>
                <View style={[styles.textInputView, { borderColor: isFocused ? Colors.orange : Colors.grey }]}>
                    <TextInput
                        placeholder='Note for the entire order'
                        height={150}
                        multiline
                        textAlignVertical='top'
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={{
                            fontFamily: Fonts.SF_Compact_Rounded_Medium
                        }}
                    />
                </View>
            </>
        )
    }

    const submitAddToCart = () => {
        console.log(`productId: ${productId}`)
        isInternetConnected()
            .then(() => dispatch(postCartItemRequest({ productId: productId })))
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))

        navigation.navigate(`ConfirmBill`, {
            productId: productId,
            title: title,
            imgIcon: imgIcon,
            price: price,
            productPlusEICost: productPlusEICost,
            navSource: 'ExtraIngredients'
        })
    }

    const keyExtractor = useCallback((item, index) => index.toString(), [])

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'android' ? 'padding' : 'height'}
            keyboardVerticalOffset={10}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Add Extra Ingredients`}
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

            <View style={styles.viewExtraIngredientContainer}>
                <FlatList
                    data={showAllIngredients ? extraIngredients : extraIngredients.slice(0, 3)}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={headerComponent}
                    ListHeaderComponentStyle={{

                    }}
                    renderItem={renderMainComponent}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={footerAddNote}
                    ListFooterComponentStyle={{
                        // backgroundColor: Colors.red,
                        paddingBottom: 160
                    }}
                    ListEmptyComponent={() => {
                        return <TouchableOpacity
                            style={styles.viewEmptyData}
                            activeOpacity={0.7}
                            onPress={() => Linking.openURL(`mailto:xanderq9735516@gmail.com`)}>
                            <Text style={styles.txtEmptyData}>No Extra Ingredients{`\n`}Suggest a few at feedback@gmail.com</Text>
                        </TouchableOpacity>
                    }}
                    contentContainerStyle={styles.flatlistContent}
                />
            </View>

            <View style={styles.flexBottomView}>
                <View style={styles.viewFlexPrice}>
                    <Text style={[styles.txtRupee, { top: 10, fontSize: 20 }]}>₹</Text>
                    <Text style={[styles.txtPrice,
                    { fontSize: 40 },
                    { color: productPlusEICost === '0.00' ? Colors.mediumGrey : Colors.black }
                    ]}>{productPlusEICost}</Text>
                </View>
                <CustomButton
                    BGColor={Colors.orange}
                    title={`Add to Cart`}
                    imageIcon={Icons.cart}
                    titleTop={14}
                    tintColor={Colors.white}
                    imageLeft={-70}
                    fontFamily={Fonts.SF_Compact_Rounded_Medium}
                    viewHeight={60}
                    width={'60%'}
                    alignSelf={'center'}
                    alignItems={'center'}
                    isDisabled={dishCounter}
                    onPressFunc={() => {
                        submitAddToCart()
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

export default ExtraIngredients


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

    },
    viewImgShadow: {
        // backgroundColor: Colors.red,
        height: 100,
        width: 100,
        borderRadius: 60,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 12,
        elevation: 12,
    },
    imgIcon: {
        height: 100,
        width: 100,
        resizeMode: 'cover',
    },
    viewTitlePrice: {
        // backgroundColor: Colors.red,
        width: '70%',
        marginLeft: 10

    },
    txtTitle: {
        color: Colors.black,
        fontSize: 24,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
    },
    viewFlexPrice: {
        flexDirection: 'row',
    },
    txtRupee: {
        color: Colors.orange,
        fontSize: 18,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
    },
    txtPrice: {
        color: Colors.black,
        fontSize: 24,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        marginLeft: 5
    },
    viewDishQuantiyCounter: {
        position: 'absolute',
        right: 0,
        bottom: 5
    },
    flexViewAddIngredients: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        marginTop: 60,
        marginBottom: 10,
        justifyContent: 'space-between'
    },
    moreButton: {
        // backgroundColor: Colors.blue,
        alignItems: 'flex-end',
        justifyContent: 'center',
        right: 10
    },
    moreButtonText: {
        color: Colors.orange,
        fontSize: 18,
    },
    viewEmptyData: {
        backgroundColor: Colors.lightGrey,
        borderRadius: 4,
        width: width - 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtEmptyData: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.mediumGrey,
        textAlign: 'center'
    },
    txtHeader: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 24,
    },
    viewExtraIngredientContainer: {
        // backgroundColor: Colors.red,
    },
    flatlistContent: {
        // backgroundColor: Colors.blue,
        paddingHorizontal: 30,
        paddingTop: 20
    },
    viewAddExtraIngredients: {
        // backgroundColor: Colors.blue,
        height: 60,
        width: width,
        margin: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    imgViewIngredients: {
        backgroundColor: Colors.lightGrey,
        height: 50,
        width: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgIconIngredient: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    viewTxtIngredients: {
        top: -5,
        marginLeft: 10,
        flex: 1,
    },
    quantityCounterView: {
        position: 'absolute',
        right: 65,
    },
    viewQuantityPriceExtraIngredient: {
        flexDirection: 'row'
    },
    viewFlexPriceExtraIng: {
        backgroundColor: Colors.orange,
        flexDirection: 'row',
        borderRadius: 3,
        // top: -7,
        paddingHorizontal: 4,
        height: 16,
    },
    txtIngredients: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 12,
    },
    textInputView: {
        borderColor: Colors.grey,
        borderWidth: 0.7,
        borderRadius: 12,
        padding: 5,
        paddingHorizontal: 10
    },
    flexBottomView: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: width,
        height: 80,
        paddingHorizontal: 30,
        alignItems: 'center'
    }
})