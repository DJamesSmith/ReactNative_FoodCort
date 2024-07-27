import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { arrCategories } from '../../assets/Data'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'

const CategoryFlatlist = ({ backgroundColor, borderColor, borderWidth, onCategorySelect }) => {

    const [selectedCategory, setSelectedCategory] = useState('Cuisine')

    const categoryComponent = ({ item, index }) => {

        const isSelected = selectedCategory === item.name

        const selectedComponent = () => {
            setSelectedCategory(item.name)
            onCategorySelect(item.name)
        }

        return (
            <TouchableOpacity
                style={[styles.btnCategory, {
                    backgroundColor: backgroundColor,
                    borderColor: borderColor,
                    borderWidth: borderWidth,
                },
                isSelected && {
                    backgroundColor: Colors.orange
                }]}
                onPress={selectedComponent}>
                <View style={styles.imgCategoryView}>
                    <Image
                        source={item?.imgIcon}
                        style={styles.imgCategory}
                    />
                </View>
                <Text style={[styles.txtCategory,
                isSelected && {
                    color: Colors.white
                }]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.categoryFlatlistContainer}>
            {/* Category FlatList */}
            <FlatList
                data={arrCategories}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={categoryComponent}
                contentContainerStyle={{
                    // backgroundColor: Colors.blue,
                    paddingHorizontal: 20,
                    alignItems: 'center',
                    height: 70,
                }}
            />
        </View>
    )
}

export default CategoryFlatlist

const styles = StyleSheet.create({
    categoryFlatlistContainer: {
        // backgroundColor: Colors.black,
        height: 60,
        marginTop: 10
    },

    btnCategory: {
        height: 40,
        paddingHorizontal: 12,
        marginHorizontal: 4,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgCategoryView: {
        backgroundColor: Colors.white,
        height: 25,
        width: 25,
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgCategory: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
    txtCategory: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        marginLeft: 4
    },
})