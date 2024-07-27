import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, Animated, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'
import { SearchBar } from 'react-native-elements'
import { productsRequest } from '../../redux/reducers/ProductReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { RefreshControl } from 'react-native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'

const { width, height } = Dimensions.get('screen')
const currency = '₹'
var status = ''

const AllProducts = ({ navigation, route }) => {

    const { headerTitle, categoryID } = route.params
    const dispatch = useDispatch()
    const ProductReducer = useSelector(state => state.ProductReducer)

    const isFocused = useIsFocused()
    const [products, setProducts] = useState([])

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(productsRequest({ page: null, perPage: null }))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    useEffect(() => {
        if (ProductReducer?.status !== status || status == '') {
            switch (ProductReducer?.status) {
                case 'Product/productsRequest':
                    status = ProductReducer?.status
                    break

                case 'Product/productsSuccess':
                    status = ProductReducer?.status
                    setProducts(ProductReducer?.allProducts ? ProductReducer?.allProducts : [])
                    break

                case 'Product/productsFailure':
                    status = ProductReducer?.status
                    break

                default:
                // console.log(`Sorry, we are out of ${expr}.`)
            }
        }
    }, [ProductReducer])



























    // This filtration is currently only filtering searched item. I want to filter those products whose "category" key from ProductReducer?.allProducts?.data matches the categoryID. Then do the filtration fro searchItem.
    // Match allProducts.data.category === categoryID
    const searchFilteredProducts = ProductReducer?.allProducts?.data.filter((product, index) => {
        const category = ProductReducer?.allProducts?.data[index]?.category
        category === categoryID ? console.log(`Matched`) : console.log(`Not matched`)
        return category === categoryID
    })


























    const [showFullDescription, setShowFullDescription] = useState(Array(searchFilteredProducts.length).fill(false))
    // console.log(`searchFilteredProducts : ${searchFilteredProducts}`)

    const toggleDescription = (index) => {
        const newVisibility = [...showFullDescription]
        newVisibility[index] = !newVisibility[index]
        setShowFullDescription(newVisibility)
    }




























    const [searchQuery, setSearchQuery] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)
    const searchBarAnimation = useRef(new Animated.Value(0)).current

    const toggleSearchVisibility = () => {
        setIsSearchVisible(!isSearchVisible)
        Animated.timing(searchBarAnimation, {
            toValue: isSearchVisible ? 0 : 1,
            duration: 600,
            useNativeDriver: false,
        }).start()
    }

    const onChangeSearch = (query) => {
        setSearchQuery(query)
    }

    const onClearSearch = () => {
        setSearchQuery('')
    }













    const renderProductComponent = ({ item, index }) => {
        const { productTitle, productDescription, productPrice, productRating, productDeliveryTime, image_product } = item
        const cleanDescription = productDescription.replace(/<p>/g, '').replace(/<\/p>/g, '')


        return (
            <TouchableOpacity
                style={styles.btnFoodItem}
                activeOpacity={0.7}
                onPress={() => navigation.navigate(`MenuDetails`, {
                    title: item?.productTitle,
                    imgIcon: item.image_product,
                    price: item?.productPrice,
                    rating: item?.productRating,
                    isLiked: item?.isLiked,
                    description: cleanDescription,
                    calories: item?.productKiloCalories,
                    deliveryDuration: item?.productDeliveryTime,
                })}>
                <View style={[styles.floatingImgDish, index % 2 === 0 ? { right: 10 } : { left: 10 }]}>
                    <View style={styles.imgView}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${image_product}` }}
                            style={styles.imgDish}
                        />
                    </View>
                </View>
                <Text style={[styles.txtTitle, index % 2 === 0 ? { left: 0 } : { right: 0, textAlign: 'right' }]}>{productTitle}</Text>
                <View style={[styles.flexInfoContainer, index % 2 === 0 ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }]}>
                    <View style={styles.flexInfo}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png' }}
                            style={{ height: 12, width: 12, resizeMode: 'contain' }}
                        />
                        <Text style={styles.txtRating}>{productRating}</Text>
                    </View>
                    <Text style={styles.txtPrice}>
                        {currency ? <Text style={styles.txtRupeeSymbol}>{currency}</Text> : ''} {productPrice}
                    </Text>
                    <View style={styles.flexInfo}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/12047/12047459.png' }}
                            style={{ height: 12, width: 12, resizeMode: 'contain', tintColor: Colors.gold }}
                        />
                        <Text style={styles.txtDeliveryTime}>{productDeliveryTime}</Text>
                    </View>
                </View>
                {/* <Text style={styles.txtDescription}>{cleanDescription}</Text> */}
                <Text style={styles.txtDescription}>
                    {showFullDescription[index] ? cleanDescription : `${cleanDescription.slice(0, 180)}... `}
                    <Text style={styles.readMore} onPress={() => toggleDescription(index)}>
                        {showFullDescription[index] ? 'Read less' : 'Read more'}
                    </Text>
                </Text>
            </TouchableOpacity>
        )
    }

    // Filter products based on categoryID
    const filteredProducts = ProductReducer?.allProducts?.data.filter(product => product.category === categoryID && product.productTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    console.log(`filteredProducts: ${filteredProducts}`)

    console.log(`ProductReducer?.allProducts.perPage: ${ProductReducer?.allProducts?.perPage}`)
    console.log(`ProductReducer?.allProducts.currentPage: ${ProductReducer?.allProducts?.currentPage}`)
    console.log(`ProductReducer?.allProducts?.data.length: ${filteredProducts.length}`)

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={headerTitle}
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

                    rightIcon={Icons.search}
                    rightIconRight={10}
                    rightIconSize={18}
                    rightIconTintColor={Colors.grey}
                    onRightPress={toggleSearchVisibility}
                />
            </View>

            {/* Search Input */}
            <Animated.View style={[styles.searchBarContainer, { opacity: searchBarAnimation }]}>
                <SearchBar
                    placeholder="Search products..."
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    inputContainerStyle={styles.searchBarInputContainer}
                    inputStyle={styles.searchBarInput}
                    placeholderTextColor={Colors.gray}
                    platform="default"
                    lightTheme={true}
                    searchIcon={
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9661/9661452.png' }}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        />
                    }
                    clearIcon={
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/11315/11315623.png' }}
                            style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: Colors.red }}
                        />
                    }
                    leftIconContainerStyle={styles.searchBarLeftIcon}
                    rightIconContainerStyle={styles.searchBarRightIcon}
                    onClear={onClearSearch}
                />
            </Animated.View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderProductComponent}
                contentContainerStyle={[styles.contentContainerStyle, isSearchVisible ? { paddingTop: 120 } : { paddingTop: 30 }]}
            />

        </View>
    )
}

export default AllProducts

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,

    },
    headerBar: {
        backgroundColor: Colors.white,
        width: '100%',
        paddingTop: 20
    },










    contentContainerStyle: {
        paddingHorizontal: 15
    },
    btnFoodItem: {
        // backgroundColor: Colors.customBlue2,
        backgroundColor: Colors.orange,
        marginVertical: 60,
        padding: 8,
        borderRadius: 12,
        paddingHorizontal: 12
    },
    floatingImgDish: {
        height: 150,
        width: 150,
        position: 'absolute',
        top: -75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 75,

        borderColor: Colors.orange,
        borderWidth: 3
    },
    imgView: {
        // backgroundColor: Colors.red,
        height: 140,
        width: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    imgDish: {
        height: 140,
        width: 140,
        resizeMode: 'cover'
    },
    txtTitle: {
        // backgroundColor: Colors.blue,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 24,
        color: Colors.orange,
        width: '60%',
        position: 'absolute',
        top: -60
    },




    flexInfoContainer: {
        // backgroundColor: Colors.black,
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        alignSelf: 'flex-end',
        justifyContent: 'space-between'
    },
    flexInfo: {
        // backgroundColor: Colors.black,
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtRating: {
        // backgroundColor: Colors.blue,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 13,
        color: Colors.white,
        top: 1,
        marginLeft: 3
    },
    txtRupeeSymbol: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 16,
        color: Colors.white,
    },
    txtPrice: {
        // backgroundColor: Colors.blue,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 24,
        color: Colors.white,
    },
    txtDeliveryTime: {
        // backgroundColor: Colors.blue,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 13,
        color: Colors.white,
        marginLeft: 3,
        top: 1
    },
    txtDescription: {
        // backgroundColor: Colors.blue,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 13,
        color: Colors.white,
        marginTop: 40
    },
    linearGradient: {
        // height: 200,
        // width: width - 50,
        borderRadius: 12,
    },
    readMore: {
        color: Colors.yellow,
        fontSize: 18
    },











    searchBarContainer: {
        position: 'absolute',
        top: 70,
        left: 0,
        right: 0,
        zIndex: 1,

        backgroundColor: Colors.lightGrey,
        paddingHorizontal: 0,
        marginHorizontal: 15,

        borderRadius: 12,
        marginTop: 20,
        marginBottom: 5,

        borderColor: Colors.mediumGrey,
        borderWidth: 1,
        overflow: 'hidden'
    },
    searchBarInputContainer: {
        backgroundColor: Colors.transparent,
        borderRadius: 10,
    },
    searchBarInput: {
        color: Colors.black,
    },


    searchBarLeftIcon: {
        marginLeft: 15,
    },
    searchBarRightIcon: {
        marginRight: 15,
    },
})