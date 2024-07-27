import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, FlatList, TextInput, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FixedBottomSheetModal from '../../components/FixedBottomSheetModal'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { windowHeight, windowWidth } from '../../../App'
import CustomButton from '../../components/CustomButton'
import QuantityCounter from '../../components/QuantityCounter'
import { Linking } from 'react-native'
import normalize from '../helpers/normalize'
import showErrorAlert from '../helpers/Toast'

const { height, width } = Dimensions.get('screen')

const ExtraIngredientBottomSheet = ({
    isExtraIngredientModalVisible,
    setIsExtraIngredientModalVisible,
    handleSubmitPrice,
    product,
    isExtraIngredientLoading = false,
    loading = false,
    correspondingExtraIngredient,
}) => {

    // console.log(`productIdentifiesAsss--->>: ${JSON.stringify(product)}`)
    // console.log(`correspondingExtraIngredient--->>: ${JSON.stringify(correspondingExtraIngredient)}`)

    const { _id, productTitle, productDescription, productPrice, productRating, productDeliveryTime, image_product } = product

    const [dishCounter, setDishCounter] = useState(1)

    const btnHandleSubmitIngredients = () => {
        setIsExtraIngredientModalVisible(true)
        handleSubmitPrice()
    }

    const handleDishIncrement = () => {
        setDishCounter(dishCounter + 1)
    }

    const handleDishDecrement = () => {
        if (dishCounter > 0) {
            setDishCounter(dishCounter - 1)
        }
    }

    const keyExtractor = useCallback((item, index) => index.toString(), [])

    const headerComponent = ({ item, index }) => {
        // console.log(`dishCounter: ${dishCounter}`)

        return (
            <>
                <Text style={styles.txtBottomSheetHeader}>Add Extra Ingredients</Text>
                <View style={styles.viewHeader}>
                    <View style={styles.viewImgShadow}>
                        <Image
                            source={{ uri: image_product ? `data:image/jpeg;base64,${image_product}` : 'https://cdn-icons-png.flaticon.com/128/4727/4727400.png' }}
                            style={styles.imgIcon}
                        />
                    </View>

                    <View style={styles.viewTitlePrice}>
                        <Text style={styles.txtTitle}>{productTitle}</Text>
                        <View style={styles.viewFlexPrice}>
                            <Text style={styles.txtRupee}>₹</Text>
                            <Text style={styles.txtPrice}>{productPrice}</Text>
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
                    {isExtraIngredientLoading && <ActivityIndicator color={Colors.orange} size={'small'} style={{ right: 10 }} />}
                </View>
            </>
        )
    }

    const [ingredientCounters, setIngredientCounters] = useState([])

    useEffect(() => {
        if (Array.isArray(correspondingExtraIngredient)) {
            setIngredientCounters(correspondingExtraIngredient.map(() => 0))
        } else {
            setIngredientCounters([])
            showErrorAlert("No extra ingredients available for this product.", Colors.yellow, Colors.black)
        }
    }, [correspondingExtraIngredient])

    const updateIngredientCounter = (index, value) => {
        const newCounters = [...ingredientCounters]
        newCounters[index] = value
        setIngredientCounters(newCounters)
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

    return (
        <>
            <FixedBottomSheetModal
                modalVisible={isExtraIngredientModalVisible}
                backgroundColor={Colors.white}
                height={windowHeight / 1.1}
                borderTopLeftRadius={normalize(20)}
                borderTopRightRadius={normalize(20)}
                onBackdropPress={() => setIsExtraIngredientModalVisible(false)}>
                <TouchableOpacity onPress={() => setIsExtraIngredientModalVisible(false)} style={{ width: windowWidth }}><View style={styles.closeBar}></View></TouchableOpacity>

                {
                    isExtraIngredientLoading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color={Colors.orange} size="large" />
                            <Text style={styles.txtLoading}>Loading extra ingredients...</Text>
                        </View>
                    ) : (

                        <View style={styles.bottomSheetContainer}>
                            <View style={styles.viewExtraIngredientContainer}>

                                <FlatList
                                    data={correspondingExtraIngredient}
                                    keyExtractor={keyExtractor}
                                    ListHeaderComponent={headerComponent}
                                    ListHeaderComponentStyle={{

                                    }}
                                    renderItem={renderMainComponent}
                                    showsVerticalScrollIndicator={false}
                                    // ListFooterComponent={footerAddNote}
                                    // ListFooterComponentStyle={{
                                    //     // backgroundColor: Colors.red,
                                    //     paddingBottom: 160
                                    // }}
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

                            <CustomButton
                                BGColor={Colors.orange}
                                title={`Confirm`}
                                fontFamily={Fonts.SF_Compact_Rounded_Medium}
                                fontSize={18}
                                marginTop={5}
                                alignItems={'center'}
                                loading={loading}
                                onPressFunc={btnHandleSubmitIngredients}
                            />
                        </View>
                    )}

            </FixedBottomSheetModal>
        </>
    )
}

export default ExtraIngredientBottomSheet

export const styles = StyleSheet.create({
    bottomSheetContainer: {
        // backgroundColor: Colors.red,
        flex: 1,
        marginHorizontal: 20,
        paddingBottom: 50
    },
    closeBar: {
        backgroundColor: Colors.mediumGrey,
        height: 5,
        width: 50,
        borderRadius: 2.5,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    txtBottomSheetHeader: {
        // backgroundColor: Colors.red,
        fontSize: 24,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        marginBottom: 20
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
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 30
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



    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtLoading: {
        color: Colors.orange,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
    }
})