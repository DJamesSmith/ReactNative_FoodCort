import { View, Text, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity, FlatList, RefreshControl, Keyboard } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import CategoryFlatlist from '../../components/home/CategoryFlatlist'
import NoData from '../../utils/NoData'
import { Animations } from '../../themes/Animations'
import FilterBottomSheet from '../../utils/bottomSheets/FilterBottomSheet'
import NetworkStatus from '../../utils/helpers/NetworkStatus'
import { deleteFavouriteItemRequest, getAllFavouriteItemsRequest } from '../../redux/reducers/FavouriteReducer'

import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'

const { width, height } = Dimensions.get('screen')

var status = ''

const Favorite = () => {

    const dispatch = useDispatch()
    const FavouriteReducer = useSelector(state => state.FavouriteReducer)

    const isFocused = useIsFocused()
    const [allFavouriteItems, setAllFavouriteItems] = useState([])

    const [filteredFavouriteItems, setFilteredFavouriteItems] = useState([])

    const [isSearchInputFocused, setIsSearchInputFocused] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const [isGetting, setIsGetting] = useState(true)

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getAllFavouriteItemsRequest())
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

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


    useEffect(() => {
        if (searchInput) {
            const filteredItems = allFavouriteItems.filter(item =>
                item.productTitle.toLowerCase().includes(searchInput.toLowerCase())
            )
            setFilteredFavouriteItems(filteredItems)
        } else {
            setFilteredFavouriteItems(allFavouriteItems)
        }
    }, [searchInput, allFavouriteItems])

    const [selectedCategory, setSelectedCategory] = useState('')
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

    // console.log(`searchInput: ${searchInput}`)

    const handleCategorySelection = categoryName => {
        setSelectedCategory(categoryName)
        // console.log(categoryName)
    }

    const headerComponent = useMemo(() => {
        const handleFilteration = () => {
            console.log(`Filtering data....`)
        }

        return (
            <>
                {/* Search Input */}
                <View style={[styles.searchBox, { borderColor: isSearchInputFocused ? Colors.orange : Colors.grey }]}>
                    <Image
                        source={Icons.search}
                        style={[styles.searchBarIcons, { tintColor: isSearchInputFocused ? Colors.orange : Colors.grey }]}
                    />
                    <TextInput
                        placeholder="Let's find the food you like"
                        placeholderTextColor={Colors.grey}
                        style={styles.searchInput}
                        value={searchInput}
                        onChangeText={(txt) => setSearchInput(txt)}
                        onFocus={() => {
                            setIsSearchInputFocused(true)
                            console.log(`onFocus: ${isSearchInputFocused}`)
                        }}
                        onBlur={() => {
                            setIsSearchInputFocused(false)
                            console.log(`onBlur: ${isSearchInputFocused}`)
                        }}
                    />
                    <TouchableOpacity
                        style={styles.btnFilter}
                        onPress={() => setIsFilterModalVisible(true)}
                        activeOpacity={0.7}>
                        <Image
                            source={Icons.imgFilter}
                            style={[styles.searchBarIcons, { tintColor: isSearchInputFocused ? Colors.orange : Colors.grey }]}
                        />
                    </TouchableOpacity>

                    <FilterBottomSheet
                        isFilterModalVisible={isFilterModalVisible}
                        setIsFilterModalVisible={setIsFilterModalVisible}
                        btnHandleFilter={handleFilteration}
                    />
                </View>

                <CategoryFlatlist
                    backgroundColor={Colors.lightBlueGrey}
                    onCategorySelect={handleCategorySelection}
                />
            </>
        )
    }, [searchInput, isSearchInputFocused, isFilterModalVisible])

    const isItemInFavourites = itemId => {
        return allFavouriteItems.some(item => item._id === itemId)
    }

    const submitAddToFavourites = item => {
        if (isItemInFavourites(item._id)) {
            console.log(`Remove from Favourites`)
            isInternetConnected()
                .then(() => {
                    dispatch(deleteFavouriteItemRequest({ productId: item._id }))
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }

    const renderFavoriteComponent = ({ item, index }) => {
        const { image_product, productTitle, productDescription, productPrice, productRating, productKiloCalories, productDeliveryTime, productIsLiked, } = item

        const isLiked = allFavouriteItems.some(favItem => favItem._id === item._id)
        const likeIcon = isLiked ? 'https://cdn-icons-png.flaticon.com/128/2107/2107845.png' : 'https://cdn-icons-png.flaticon.com/128/13139/13139183.png'
        // console.log(`Item# ${index} ${isLiked ? 'isLiked' : 'isNotLiked'}`)

        return (
            <TouchableOpacity
                style={styles.btnFavorite}
                activeOpacity={0.8}
                onPress={() => console.log(`selectedItem: ${index}`)}>
                <View style={styles.viewColumn1}>
                    <Image
                        source={{ uri: image_product === '' ? `https://cdn-icons-png.flaticon.com/128/7894/7894046.png` : `data:image/jpeg;base64,${image_product}` }}
                        style={styles.imgDish}
                    />
                </View>
                <View style={styles.viewColumn2}>
                    <Text style={styles.txtTitle}>{productTitle}</Text>
                    <View style={styles.flexView}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/1828/1828884.png' }}
                            style={[styles.imgIcon, { height: 12, width: 12 }]}
                        />
                        <Text style={styles.txtRating}>{productRating}</Text>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/12047/12047459.png' }}
                            style={[styles.imgIcon, { tintColor: Colors.orange, marginLeft: 10 }]}
                        />
                        <Text style={styles.txtDuration}>{productDeliveryTime} min</Text>
                    </View>
                </View>
                <View style={styles.viewColumn3}>
                    <TouchableOpacity
                        style={styles.btnLike}
                        onPress={() => submitAddToFavourites(item)}>
                        <Image
                            source={{ uri: likeIcon }}
                            style={styles.imgLike}
                        />
                    </TouchableOpacity>
                    <View style={styles.viewColumn3FlexText}>
                        <Text style={[styles.txtPrice, { fontSize: 16, color: Colors.orange, marginRight: 3 }]}>₹</Text>
                        <Text style={styles.txtPrice}>{productPrice}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20
        return (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom)
    }

    const refreshData = () => {
        setIsGetting(true)
        if (FavouriteReducer?.status !== 'Favourites/getAllFavouriteItemsRequest' && isGetting) {
            getAllFavouriteItemsRequest()
        } else {
            setIsGetting(false)
        }
    }

    return (
        <NetworkStatus>
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Header
                        backgroundColor={Colors.transparent}
                        title={`My Favorite`}
                        fontSize={20}
                        titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                        color={Colors.black}
                        borderBottomColor={Colors.mediumGrey}
                        borderBottomWidth={0.5}
                    />
                </View>

                <FlatList
                    data={filteredFavouriteItems}
                    keyExtractor={(item, index) => index.toString()}
                    ListHeaderComponent={headerComponent}
                    ListHeaderComponentStyle={{
                        // backgroundColor: Colors.blue,
                        paddingBottom: 20
                    }}
                    renderItem={renderFavoriteComponent}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        // backgroundColor: Colors.red,
                        alignItems: 'center',
                        paddingBottom: 30,
                    }}
                    ListEmptyComponent={() => {
                        return (
                            <NoData renderAnimation={Animations.foodChoice} />
                        )
                    }}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={e => {
                        if (isCloseToBottom(e.nativeEvent)) {
                            refreshData()
                        }
                    }}
                    refreshControl={<RefreshControl
                        refreshing={FavouriteReducer?.status == 'Favourites/getAllFavouriteItemsRequest'}
                        onRefresh={() => getAllFavouriteItemsRequest()}
                    />}
                />
            </View>
        </NetworkStatus>
    )
}

export default Favorite

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

    searchBox: {
        // backgroundColor: Colors.red,
        width: width - 60,
        height: 60,
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 20,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,

        borderColor: Colors.grey,
        borderWidth: 0.7
    },
    searchInput: {
        width: '75%',
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 18,
        top: 2,
    },
    btnFilter: {
        // backgroundColor: Colors.blue,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchBarIcons: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },

    // Top Of the Week
    btnFavorite: {
        // backgroundColor: Colors.blue,
        height: 110,
        width: width - 60,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 1,
        alignItems: 'center',
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
        height: '100%',
        justifyContent: 'space-around',
        paddingTop: 15,
        alignItems: 'center'
    },
    viewColumn3FlexText: {
        flexDirection: 'row',
    },
    btnLike: {
        // backgroundColor: Colors.violet,
        height: 30,
        width: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgLike: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
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
    txtRating: {
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
        fontSize: 26,
        color: Colors.black
    },
})