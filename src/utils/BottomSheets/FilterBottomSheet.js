import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useState } from 'react'
import BottomSheetModal from '../../components/BottomSheetModal'
import normalize from '../helpers/normalize'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import { windowHeight, windowWidth } from '../../../App'
import CustomButton from '../../components/CustomButton'
import CategoryFlatlist from '../../components/home/CategoryFlatlist'
import SortByFlatlist from '../../components/home/SortByFlatlist'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

const { width, height } = Dimensions.get('screen')

const CustomSliderMarkerLeft = ({ currentValue }) => {
    return (
        <View style={styles.markerContainer}>
            <View style={styles.marker}>
                <View style={styles.numContainer}>
                    <Text style={styles.text}>{currentValue}</Text>
                </View>
            </View>
        </View>
    )
}

const CustomSliderMarkerRight = ({ currentValue }) => {
    return (
        <View style={styles.markerContainer}>
            <View style={styles.marker}>
                <View style={styles.numContainer}>
                    <Text style={styles.text}>{currentValue}</Text>
                </View>
            </View>
        </View>
    )
}

const FilterBottomSheet = ({ isFilterModalVisible, setIsFilterModalVisible, btnHandleFilter }) => {

    const btnHandleFilteration = () => {
        btnHandleFilter()
    }

    const [selectedCategory, setSelectedCategory] = useState('')

    const handleCategorySelection = (categoryName) => {
        setSelectedCategory(categoryName)
        console.log(categoryName)
    }

    return (
        <>
            <BottomSheetModal
                modalVisible={isFilterModalVisible}
                backgroundColor={Colors.white}
                height={height / 1.48}
                borderTopLeftRadius={normalize(20)}
                borderTopRightRadius={normalize(20)}
                onBackdropPress={() => setIsFilterModalVisible(false)}>

                <TouchableOpacity onPress={() => { }} style={{ width: windowWidth }}><View style={styles.closeBar}></View></TouchableOpacity>

                <View style={styles.bottomSheetContainer}>

                    <TouchableOpacity style={styles.btnFlex}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4178/4178437.png' }}
                            style={styles.imgLoc}
                        />
                        <Text style={styles.txtLocation}>San Diego, CA</Text>

                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/565/565949.png' }}
                            style={[styles.imgLoc, { tintColor: Colors.grey }]}
                        />
                    </TouchableOpacity>

                    {/* Sort By */}
                    <Text style={styles.txtHeading}>Sort by</Text>
                    <SortByFlatlist />

                    {/* Categories */}
                    <Text style={styles.txtHeading}>Categories</Text>
                    <CategoryFlatlist
                        backgroundColor={Colors.white}
                        borderColor={Colors.mediumGrey}
                        borderWidth={0.7}
                        onCategorySelect={handleCategorySelection}
                    />

                    {/* Price Range */}
                    <Text style={styles.txtHeading}>Price Ranges</Text>

                    <View style={styles.flexPrice}>
                        <Text style={styles.txtPriceRange}>₹ 1.00</Text>
                        <Text style={styles.txtPriceRange}>₹ 100.00</Text>
                    </View>
                    <View style={styles.multiSliderContainer}>
                        <MultiSlider
                            values={[30, 70]}                                                    // Set initial values for the slider
                            min={0}                                                              // Minimum value available in the slider
                            max={100}                                                            // Maximum value available in the slider
                            step={5}                                                             // Step value of the slider

                            sliderLength={width - 60}
                            trackStyle={{ backgroundColor: Colors.mediumGrey }}
                            selectedStyle={{ backgroundColor: Colors.orange, height: 8, top: -3 }}

                            isMarkersSeparated={true}                                            // Separate custom markers for left and right
                            customMarkerLeft={(e) => (
                                <CustomSliderMarkerLeft currentValue={e.currentValue} />
                            )}                                                                   // Custom marker component for left cursor
                            customMarkerRight={(e) => (
                                <CustomSliderMarkerRight currentValue={e.currentValue} />
                            )}                                                                   // Custom marker component for right cursor
                            onValuesChange={values => {
                                console.log('Slider values:', values)                            // Handle change in slider values
                            }}
                        />
                    </View>




















                    <View style={styles.btnFilter}>
                        <CustomButton
                            BGColor={Colors.orange}
                            title={`Apply Filter`}
                            width={'90%'}
                            viewHeight={52}
                            alignSelf={'center'}
                            fontFamily={Fonts.SF_Compact_Rounded_Medium}
                            fontSize={18}
                            marginTop={30}
                            alignItems={'center'}
                            // loading={loading}
                            onPressFunc={btnHandleFilteration}
                        />
                    </View>
                </View>
            </BottomSheetModal>
        </>
    )
}

export default FilterBottomSheet

const styles = StyleSheet.create({
    bottomSheetContainer: {
        // backgroundColor: Colors.red,
        flex: 1,
        marginVertical: 20,
    },
    closeBar: {
        backgroundColor: Colors.mediumGrey,
        height: 5,
        width: 50,
        borderRadius: 2.5,
        alignSelf: 'center',
        marginTop: 10
    },






    btnFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.grey,
        borderWidth: 1,
        borderRadius: 12,
        height: 48,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 20
    },
    imgLoc: {
        height: 16,
        width: 16,
        resizeMode: 'contain'
    },
    txtLocation: {
        fontSize: 20,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        position: 'absolute',
        left: 50,
    },


    txtHeading: {
        fontSize: 24,
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        marginTop: 10,
        marginHorizontal: 20
    },





    btnFilter: {
        position: 'absolute',
        bottom: 0,
        width: width
    },















    // Custom Marker Components
    multiSliderContainer: {
        // backgroundColor: Colors.mediumGrey,
        paddingHorizontal: 30
    },
    flexPrice: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    txtPriceRange: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 18,
        color: Colors.black

    },
    markerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    marker: {
        backgroundColor: Colors.orange,
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',

    },
    numContainer: {
        backgroundColor: Colors.white,
        height: 20,
        width: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.orange,
        fontSize: 10,
        fontFamily: Fonts.SF_Compact_Rounded_Regular
    },
})
