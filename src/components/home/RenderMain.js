import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import LinearGradient from 'react-native-linear-gradient'
import { BlurView } from '@react-native-community/blur'
import CategoryFlatlist from './CategoryFlatlist'
import NoData from '../../utils/NoData'
import { Animations } from '../../themes/Animations'
import { categoryRequest } from '../../redux/reducers/CategoryReducer'
import { productsRequest } from '../../redux/reducers/ProductReducer'
import ComponentLoader from '../../utils/ComponentLoader'
import FloatingMenu from './FloatingMenu'
import { deleteCartItemRequest, getAllCartItemsRequest, postCartItemRequest } from '../../redux/reducers/CartReducer'
import { deleteFavouriteItemRequest, getAllFavouriteItemsRequest, postFavouriteItemRequest } from '../../redux/reducers/FavouriteReducer'

import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import CategoryDisplay from './CategoryDisplay'


const { width, height } = Dimensions.get('screen')

var status = ''

const RenderMain = ({ navigation }) => {

    const dispatch = useDispatch()
    const CategoryReducer = useSelector(state => state.CategoryReducer)
    const ProductReducer = useSelector(state => state.ProductReducer)
    const CartReducer = useSelector(state => state.CartReducer)
    const FavouriteReducer = useSelector(state => state.FavouriteReducer)

    const isFocused = useIsFocused()
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])
    const [allCartItems, setAllCartItems] = useState([])
    const [allFavouriteItems, setAllFavouriteItems] = useState([])

    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const [selectedItem, setSelectedItem] = useState(null)

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(categoryRequest())
                    dispatch(productsRequest({ page: null, perPage: null }))
                    dispatch(getAllCartItemsRequest())
                    dispatch(getAllFavouriteItemsRequest())
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    useEffect(() => {
        if (CategoryReducer?.status !== status || status == '') {
            switch (CategoryReducer?.status) {
                case 'Category/categoryRequest':
                    status = CategoryReducer?.status
                    break

                case 'Category/categorySuccess':
                    status = CategoryReducer?.status
                    setCategory(CategoryReducer?.categoryData ? CategoryReducer?.categoryData : [])
                    break

                case 'Category/categoryFailure':
                    status = CategoryReducer?.status
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [CategoryReducer])

    useEffect(() => {
        if (ProductReducer?.status !== status || status == '') {
            switch (ProductReducer?.status) {
                case 'Product/productsRequest':
                    status = ProductReducer?.status
                    break

                case 'Product/productsSuccess':
                    status = ProductReducer?.status
                    setProducts(ProductReducer?.productsData ? ProductReducer?.productsData : [])
                    break

                case 'Product/productsFailure':
                    status = ProductReducer?.status
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [ProductReducer])

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



                case 'MyCart/postCartItemRequest':
                    status = CartReducer?.status
                    console.log(`-->> postCartItemRequest`)
                    break

                case 'MyCart/postCartItemSuccess':
                    status = CartReducer?.status
                    console.log(`-->> postCartItemSuccess`)
                    isInternetConnected()
                        .then(() => dispatch(getAllCartItemsRequest()))
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'MyCart/postCartItemFailure':
                    status = CartReducer?.status
                    console.log(`-->> postCartItemFailure`)
                    break



                case 'MyCart/deleteCartItemRequest':
                    status = CartReducer?.status
                    console.log(`-->> deleteCartItemRequest`)
                    break

                case 'MyCart/deleteCartItemSuccess':
                    status = CartReducer?.status
                    console.log(`-->> deleteCartItemSuccess`)
                    isInternetConnected()
                        .then(() => dispatch(getAllCartItemsRequest()))
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'MyCart/deleteCartItemFailure':
                    status = CartReducer?.status
                    console.log(`-->> deleteCartItemFailure`)
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [CartReducer])

    useEffect(() => {
        if (FavouriteReducer?.status !== status || status == '') {
            switch (FavouriteReducer?.status) {
                case 'Favourites/getAllFavouriteItemsRequest':
                    status = FavouriteReducer?.status
                    console.log(`-->> getAllFavouriteItemsRequest`)
                    break

                case 'Favourites/getAllFavouriteItemsSuccess':
                    status = FavouriteReducer?.status
                    console.log(`-->> getAllFavouriteItemsSuccess`)
                    setAllFavouriteItems(FavouriteReducer?.allFavouriteItems ? FavouriteReducer?.allFavouriteItems : [])
                    break

                case 'Favourites/getAllFavouriteItemsFailure':
                    status = FavouriteReducer?.status
                    console.log(`-->> getAllFavouriteItemsFailure`)
                    break



                case 'Favourites/postFavouriteItemRequest':
                    status = FavouriteReducer?.status
                    console.log(`-->> postFavouriteItemRequest`)
                    break

                case 'Favourites/postFavouriteItemSuccess':
                    status = FavouriteReducer?.status
                    console.log(`-->> postFavouriteItemSuccess`)
                    isInternetConnected()
                        .then(() => dispatch(getAllFavouriteItemsRequest()))
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'Favourites/postFavouriteItemFailure':
                    status = FavouriteReducer?.status
                    console.log(`-->> postFavouriteItemFailure`)
                    break



                case 'Favourites/deleteFavouriteItemRequest':
                    status = FavouriteReducer?.status
                    console.log(`-->> deleteFavouriteItemRequest`)
                    break

                case 'Favourites/deleteFavouriteItemSuccess':
                    status = FavouriteReducer?.status
                    console.log(`-->> deleteFavouriteItemSuccess`)
                    isInternetConnected()
                        .then(() => dispatch(getAllFavouriteItemsRequest()))
                        .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
                    break

                case 'Favourites/deleteFavouriteItemFailure':
                    status = FavouriteReducer?.status
                    console.log(`-->> deleteFavouriteItemFailure`)
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [FavouriteReducer])


    const hotDealsCategory = category.find(cat => cat.categoryName === 'Hot Deals 🔥')
    const hotDealsProducts = products.filter(product => product.category === hotDealsCategory?._id)

    const totwCategory = category.find(cat => cat.categoryName === 'Top of the Week')
    const totwProducts = products.filter(product => product.category === totwCategory?._id)

    const [selectedCategory, setSelectedCategory] = useState('Cuisine')

    // Hot Deals Component
    const hotDealsComponent = ({ item, index }) => {

        const isLiked = allFavouriteItems.some(favItem => favItem._id === item._id)
        const likeIcon = isLiked ? 'https://cdn-icons-png.flaticon.com/128/2107/2107845.png' : 'https://cdn-icons-png.flaticon.com/128/13139/13139183.png'
        // console.log(`Item# ${index} ${isLiked ? 'isLiked' : 'isNotLiked'}`)
        const cleanDescription = item.productDescription.replace(/<p>/g, '').replace(/<\/p>/g, '')

        return (
            <TouchableOpacity
                style={styles.btnHotDeals}
                onLongPress={(event) => handleLongPress(item, event)}
                onPress={() => navigation.navigate(`MenuDetails`, {
                    productId: item?._id,
                    title: item?.productTitle,
                    imgIcon: item.image_product,
                    price: item?.productPrice,
                    rating: item?.productRating,
                    isLiked: item?.isLiked,
                    description: cleanDescription,
                    calories: item?.productKiloCalories,
                    deliveryDuration: item?.productDeliveryTime,
                })}>
                <ImageBackground
                    source={{ uri: `data:image/jpeg;base64,${item.image_product}` }}
                    style={styles.imgHotDeals}>

                    <View style={styles.blurRatingContainer}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9715/9715468.png' }}
                            style={styles.imgRate}
                        />
                        <Text style={styles.txtHotDealsRating}>{item?.productRating}</Text>
                    </View>

                    <View style={styles.blurContainer}>
                        <BlurView
                            style={styles.absolute}
                            blurType='dark'
                            blurAmount={5}
                            reducedTransparencyFallbackColor={Colors.white}
                        />

                        <View style={styles.txtContainer}>
                            <View style={styles.flexFavBlur}>
                                <Text style={styles.txthotDealsTitle}>{item?.productTitle.length > 25 ? `${item?.productTitle.slice(0, 20)}...` : item?.productTitle}</Text>
                                <TouchableOpacity
                                    style={styles.btnLike}
                                    onPress={() => submitAddToFavourites(item)}>
                                    <Image
                                        source={{ uri: likeIcon }}
                                        style={styles.imgLikes}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.priceView}>
                                <Text style={styles.txtPriceSign}>₹</Text>
                                <Text style={styles.txtPrice}>{item?.productPrice}</Text>
                            </View>
                        </View>

                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }

    // TopOfTheWeek Component
    const renderTopOfTheWeekComponent = ({ item, index }) => {
        // console.log(`renderTopOfTheWeekComponent: ${item}`)
        const cleanDescription = item.productDescription.replace(/<p>/g, '').replace(/<\/p>/g, '')

        return (
            <TouchableOpacity
                style={styles.btnTOTW}
                onLongPress={(event) => handleLongPress(item, event)}
                onPress={() => navigation.navigate(`MenuDetails`, {
                    productId: item?._id,
                    title: item?.productTitle,
                    imgIcon: item.image_product,
                    price: item?.productPrice,
                    rating: item?.productRating,
                    isLiked: item?.isLiked,
                    description: cleanDescription,
                    calories: item?.productKiloCalories,
                    deliveryDuration: item?.productDeliveryTime,
                })}>
                <View style={styles.viewColumn1}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${item.image_product}` }}
                        style={styles.imgDish}
                    />
                </View>
                <View style={styles.viewColumn2}>
                    <Text style={styles.txtTitle}>{item?.productTitle}</Text>
                    <View style={styles.flexView}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png' }}
                            style={[styles.imgIcon, { height: 12, width: 12 }]}
                        />
                        <Text style={styles.txtTOTWRating}>{item?.productRating}</Text>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/12047/12047459.png' }}
                            style={[styles.imgIcon, { tintColor: Colors.orange, marginLeft: 10 }]}
                        />
                        <Text style={styles.txtDuration}>{item?.productDeliveryTime} min</Text>
                    </View>
                </View>
                <View style={styles.viewColumn3}>
                    <Text style={[styles.txtPriceSign, { fontSize: 16, color: Colors.orange }]}>₹</Text>
                    <Text style={[styles.txtPrice, { color: Colors.black }]}>{item?.productPrice}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    // All Products
    const renderAllProducts = (categoryName, categoryId, categorizedProducts) => {
        const isHotDeals = categoryName === 'Hot Deals 🔥'
        const isTOTW = categoryName === 'Top of the Week'

        if (isHotDeals || (isTOTW && totwProducts.length > 0)) {
            return (
                <TouchableOpacity
                    style={isTOTW ? [styles.btnMoreTOTW] : styles.btnHotDeals}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate(`AllProducts`, { headerTitle: categoryName, categoryID: categoryId })}>
                    <Text style={styles.txtSeeAll}>See More...</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <Text style={styles.txtNoMoreData}>No more data</Text>
            )
        }
    }

    const handleLongPress = (item, event) => {
        const { pageX, pageY } = event.nativeEvent
        const adjustedX = pageX + 170 > width ? width - 170 : pageX

        setSelectedItem(item)
        setMenuPosition({ x: adjustedX, y: pageY - 50 })
        setIsMenuVisible(true)
    }

    const isItemInCart = itemId => {
        return allCartItems.some(item => item._id === itemId)
    }

    const isItemInFavourites = itemId => {
        return allFavouriteItems.some(item => item._id === itemId)
    }

    const submitAddToCart = () => {
        // console.log(`productId: ${selectedItem._id}`)

        if (isItemInCart(selectedItem?._id)) {
            // console.log(`Remove from Cart`)
            isInternetConnected()
                .then(() => {
                    dispatch(deleteCartItemRequest({ productId: selectedItem._id }))
                    setIsMenuVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            // console.log(`Added to Cart`)
            isInternetConnected()
                .then(() => {
                    dispatch(postCartItemRequest({ productId: selectedItem._id }))
                    setIsMenuVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
        setIsMenuVisible(false)
    }

    const submitAddToFavourites = item => {
        if (isItemInFavourites(item._id)) {
            // console.log(`Remove from Favourites`)
            isInternetConnected()
                .then(() => {
                    dispatch(deleteFavouriteItemRequest({ productId: item._id }))
                    setIsMenuVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            // console.log(`Added to Favourites`)
            isInternetConnected()
                .then(() => {
                    dispatch(postFavouriteItemRequest({ productId: item._id }))
                    setIsMenuVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
        setIsMenuVisible(false)
    }

    const submitAddToFavouritesModal = () => {
        if (isItemInFavourites(selectedItem._id)) {
            // console.log(`Remove from Favourites`)
            isInternetConnected()
                .then(() => {
                    dispatch(deleteFavouriteItemRequest({ productId: selectedItem._id }))
                    setIsMenuVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        } else {
            // console.log(`Added to Favourites`)
            isInternetConnected()
                .then(() => {
                    dispatch(postFavouriteItemRequest({ productId: selectedItem._id }))
                    setIsMenuVisible(false)
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
        setIsMenuVisible(false)
    }

    const handleCategorySelection = categoryName => {
        setSelectedCategory(categoryName)
    }

    return (
        <>
            <CategoryFlatlist
                backgroundColor={Colors.lightBlueGrey}
                onCategorySelect={handleCategorySelection}
            />

            {
                selectedCategory === "Cuisine" && <>
                    {/* Hot Deals Header */}
                    <View style={styles.categoryItem}>
                        <Text style={styles.txtCategory}>{hotDealsCategory ? hotDealsCategory.categoryName : 'Loading...'}</Text>
                    </View>

                    {/* Hot Deals FlatList */}
                    <View style={styles.hotDealsFlatlistContainer}>
                        <FlatList
                            data={hotDealsProducts.slice(0, 5)}
                            keyExtractor={(item, index) => index.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={hotDealsComponent}
                            contentContainerStyle={{
                                paddingHorizontal: 15,
                                alignItems: 'center',
                                height: height / 2.8,
                            }}
                            ListFooterComponent={hotDealsProducts.length === 0 ? '' : renderAllProducts(hotDealsCategory.categoryName, hotDealsCategory._id, hotDealsProducts)}
                            ListEmptyComponent={({ item }) => {
                                return (
                                    <>
                                        {
                                            item ? <View style={{ justifyContent: 'center' }}>
                                                <NoData renderAnimation={Animations.foodChoice} />
                                            </View> : <View style={{ justifyContent: 'center' }}>
                                                <ComponentLoader renderAnimation={Animations.foodLoading} marginLeft={width / 2 - 85} />
                                            </View>
                                        }
                                    </>
                                )
                            }}
                            style={{ maxHeight: height / 2.8 }}
                        />
                    </View>

                    {/* Advertisement */}
                    <View style={styles.foodCornerView} activeOpacity={0.8}>
                        <ImageBackground
                            source={{ uri: 'https://images.pexels.com/photos/2067424/pexels-photo-2067424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
                            style={styles.imgFoodCorner}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={[Colors.darkBG, Colors.transparent]} style={styles.linearGradient}>
                                <Text style={styles.foodCornerTitle}>Hey, FoodCorner!</Text>
                                <Text style={styles.foodCornerDesc}>Today, we are offering a fantastic discount: purchasing any two different products will entitle you to a 40% discount.</Text>

                                <View style={styles.discountView}>
                                    <Text style={styles.txtDiscountPercent}>40%</Text>
                                </View>
                            </LinearGradient>
                        </ImageBackground>
                    </View>

                    {/* Top Of The Week Header */}
                    <View style={styles.categoryItem}>
                        <Text style={styles.txtCategory}>{totwCategory ? totwCategory.categoryName : 'Loading...'}</Text>
                    </View>

                    {/* Top Of The Week FlatList */}
                    <View style={styles.flatListContainer}>
                        <FlatList
                            data={totwProducts.slice(0, 4)}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderTopOfTheWeekComponent}
                            contentContainerStyle={{

                            }}
                            ListFooterComponent={totwProducts.length === 0 ? '' : renderAllProducts(totwCategory.categoryName, totwCategory._id, totwProducts)}
                            ListEmptyComponent={({ item }) => {
                                return (
                                    <>
                                        {
                                            item ? <View style={{ justifyContent: 'center' }}>
                                                <NoData renderAnimation={Animations.foodChoice} />
                                            </View> : <View style={{ justifyContent: 'center' }}>
                                                <ComponentLoader renderAnimation={Animations.foodLoading} />
                                            </View>
                                        }
                                    </>
                                )
                            }}
                        />
                    </View>

                    <FloatingMenu
                        isVisible={isMenuVisible}
                        position={menuPosition}
                        onClose={() => setIsMenuVisible(false)}
                        item={selectedItem}

                        titleOptionA={isItemInCart(selectedItem?._id) ? `Remove from Cart` : `Add to Cart`}
                        textColorOptionA={isItemInCart(selectedItem?._id) ? Colors.red : Colors.blue}
                        onPressOptionA={submitAddToCart}

                        titleOptionB={isItemInFavourites(selectedItem?._id) ? `Remove from Favourites` : `Add to Favourites`}
                        textColorOptionB={isItemInFavourites(selectedItem?._id) ? Colors.red : Colors.blue}
                        onPressOptionB={submitAddToFavouritesModal}
                    />
                </>
            }

            <CategoryDisplay selectedCategory={selectedCategory} />
        </>
    )
}

export default RenderMain

const styles = StyleSheet.create({
    foodCornerView: {
        backgroundColor: Colors.red,
        marginTop: 30,
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
    },
    foodCornerTitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 24,
        color: Colors.white,
        paddingTop: 20,
    },
    foodCornerDesc: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 13,
        color: Colors.white,
        width: '90%'
    },
    discountView: {
        backgroundColor: Colors.darkBG,
        position: 'absolute',
        bottom: 20,
        right: -20,
        height: 60,
        width: 100,
        borderTopLeftRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtDiscountPercent: {
        fontSize: 32,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.orange
    },


















    categoryItem: {
        // backgroundColor: Colors.red,
        margin: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginTop: 20
    },
    txtCategory: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 26,
        color: Colors.black,
    },
    // btnSeeAll: {
    //     // backgroundColor: Colors.blue,
    // },
    // txtSeeAll: {
    //     fontFamily: Fonts.SF_Compact_Rounded_Medium,
    //     fontSize: 26,
    //     color: Colors.orange,
    // },




















    // Category & Hot Deals
    hotDealsFlatlistContainer: {
        // backgroundColor: Colors.black,
    },
    imgHotDeals: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    blurRatingContainer: {
        backgroundColor: Colors.black,
        height: 32,
        width: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        top: 10,
        left: 10,
    },
    imgRate: {
        // backgroundColor: Colors.black,
        height: 16,
        width: 16,
        resizeMode: 'contain',
    },
    txtHotDealsRating: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 16,
        color: Colors.white,
        marginLeft: 5,
        top: 1,
    },
    imgLikes: {
        height: 24,
        width: 24,
        resizeMode: 'contain',
        marginTop: 2
    },
    txtContainer: {
        // backgroundColor: Colors.red,
        width: 165,
        height: 80,
        paddingHorizontal: 8,
        paddingTop: 8
    },
    flexFavBlur: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    txthotDealsTitle: {
        // backgroundColor: Colors.green,
        width: '90%',
        color: Colors.white,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18
    },
    priceView: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        width: '90%',
        position: 'absolute',
        bottom: 0,
        left: 8
    },
    txtPriceSign: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.orange,
    },
    btnHotDeals: {
        backgroundColor: Colors.lightGrey,
        width: width / 2,
        height: height / 3 - 30,
        marginHorizontal: 10,
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 12
    },
    blurContainer: {
        position: 'absolute',
        bottom: 8,
        alignSelf: 'center',
        height: '35%',
        width: '92%',
        borderRadius: 12,
        overflow: 'hidden',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    txtSeeAll: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.orange,
    },











    // TOTW
    flatListContainer: {
        alignItems: 'center',
        paddingBottom: 30
    },
    btnTOTW: {
        // backgroundColor: Colors.blue,
        height: 110,
        width: width - 50,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        alignItems: 'center',
    },
    btnMoreTOTW: {
        backgroundColor: Colors.lightGrey,
        height: 60,
        width: '50%',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20
    },
    viewColumn1: {
        // backgroundColor: Colors.red,
        borderRadius: 16,
        overflow: 'hidden',
        height: width / 4.2,
        width: width / 4.2,
    },
    viewColumn2: {
        // backgroundColor: Colors.green,
        height: '100%',
        width: width / 2.3,
        padding: 5,
    },
    viewColumn3: {
        // backgroundColor: Colors.customBlue,
        flexDirection: 'row',
    },
    imgDish: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    flexView: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15,
        left: 5
    },
    imgIcon: {
        height: 16,
        width: 16,
        resizeMode: 'contain',
        marginRight: 3
    },
    txtTitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 20,
        color: Colors.black,
        position: 'absolute',
        top: 10,
        left: 5,
    },
    txtTOTWRating: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        top: 1,
        color: Colors.black
    },
    txtDuration: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 14,
        top: 1,
        color: Colors.black
    },
    txtPrice: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 24,
        color: Colors.white,
        marginLeft: 3
    },








    txtNoMoreData: {
        backgroundColor: Colors.lightGrey,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        textAlign: 'center',
        width: '50%',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 8,
        paddingVertical: 4
    }
})