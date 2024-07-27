import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { arrSortBy } from '../../assets/Data'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'

const SortByFlatlist = () => {

    const [selectedSortBy, setSelectedSortBy] = useState('')

    const sortByComponent = ({ item, index }) => {

        const isSelected = selectedSortBy === item.name

        const selectedComponent = () => {
            setSelectedSortBy(item.name)
        }

        return (
            <TouchableOpacity
                style={[styles.btnSortBy,
                isSelected && {
                    backgroundColor: Colors.orange,
                    borderColor: Colors.white
                }]}
                onPress={selectedComponent}>
                <View style={styles.imgSortByView}>
                    <Image
                        source={item?.imgIcon}
                        style={styles.imgSortBy}
                    />
                </View>
                <Text style={[styles.txtSortBy,
                isSelected && {
                    color: Colors.white
                }]}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.sortByFlatlistContainer}>
            {/* Sort By FlatList */}
            <FlatList
                data={arrSortBy}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={sortByComponent}
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

export default SortByFlatlist

const styles = StyleSheet.create({
    sortByFlatlistContainer: {
        // backgroundColor: Colors.black,
        height: 60,
        marginTop: 10
    },

    btnSortBy: {
        backgroundColor: Colors.white,
        height: 40,
        paddingHorizontal: 16,
        marginHorizontal: 4,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',

        borderColor: Colors.mediumGrey,
        borderWidth: 0.7,
    },
    imgSortByView: {
        backgroundColor: Colors.white,
        height: 25,
        width: 25,
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgSortBy: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
    },
    txtSortBy: {
        color: Colors.black,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        marginLeft: 10
    },
})