import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SliderBox } from 'react-native-image-slider-box'

import { slidingImages } from '../../assets/Data'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'
import FilterBottomSheet from '../../utils/bottomSheets/FilterBottomSheet'

SLIDER_IMAGE_HEIGHT = 350
const { width, height } = Dimensions.get('screen')

const HeaderComponent = ({ navigation }) => {

    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false)

    const handleFilteration = () => {
        console.log(`Filtering data....`)
    }

    return (
        <View>
            <SliderBox
                images={slidingImages}
                sliderBoxHeight={SLIDER_IMAGE_HEIGHT}
                onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
                dotColor={Colors.orange}
                inactiveDotColor={Colors.white}
                dotStyle={styles.sliderBoxDotStyle}
                ImageComponentStyle={styles.slidingImagesContainer}
                autoplay
                circleLoop
            />

            {/* Search Input */}
            <View style={styles.searchBox}>
                <Image
                    source={Icons.search}
                    style={styles.searchBarIcons}
                />
                <TextInput
                    placeholder="Let's find the food you like"
                    placeholderTextColor={Colors.grey}
                    style={styles.searchInput}
                />
                <TouchableOpacity
                    style={styles.btnFilter}
                    onPress={() => setIsFilterModalVisible(true)}
                    activeOpacity={0.7}>
                    <Image
                        source={Icons.imgFilter}
                        style={styles.searchBarIcons}
                    />
                </TouchableOpacity>
            </View>

            <FilterBottomSheet
                isFilterModalVisible={isFilterModalVisible}
                setIsFilterModalVisible={setIsFilterModalVisible}
                btnHandleFilter={handleFilteration}
            />
        </View>
    )
}

export default HeaderComponent

const styles = StyleSheet.create({
    slidingImagesContainer: {
        // backgroundColor: Colors.red,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
    },
    sliderBoxDotStyle: {
        width: 20,
        height: 4,
        borderRadius: 2,
        marginHorizontal: -7.5,
        padding: 0,
        margin: 0,

        bottom: 100,
    },











    searchBox: {
        backgroundColor: Colors.white,
        width: width - 60,
        height: 50,
        alignSelf: 'center',
        borderRadius: 12,

        position: 'absolute',
        top: 270,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
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
})