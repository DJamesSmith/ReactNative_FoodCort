import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet, Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'

const { width } = Dimensions.get('screen')
const rupeeSymbol = '₹'

// id, height, productTitle, isLiked, productRating, productPrice, productDesc, imgIcon

const CustomHeight = ({ item }) => {
    const { id, height, productTitle, isLiked, productRating, productPrice, productDesc, imgIcon } = item
    const singlePageDetails = () => {
        console.log(`productTitle: ${productTitle}`)
    }

    return (
        <TouchableOpacity
            style={[styles.btnItem, { height: height }]}
            activeOpacity={0.7}
            onPress={singlePageDetails}>
            <ImageBackground
                source={{ uri: imgIcon }}
                style={[styles.imgDish, { height: height }]}>
                <View style={styles.viewTopBar}>
                    <View style={styles.viewTextPrice}>
                        <Text style={styles.txtPrice}>{rupeeSymbol + ' ' + productPrice}</Text>
                    </View>
                    <TouchableOpacity style={styles.btnImgIcon}>
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2107/2107845.png' }}
                            style={styles.imgLikeIcon}
                        />
                    </TouchableOpacity>
                </View>

                <View style={[styles.viewText, { height: 30 }]}>
                    <Text style={styles.txtTitle}>{productTitle}</Text>
                </View>

            </ImageBackground>
        </TouchableOpacity>
    )
}

const MasonryLayout = ({ data }) => {
    const [columns, setColumns] = useState([])

    // Calculate columns dynamically
    useEffect(() => {
        const calculateColumns = () => {
            const columns = [[], []]
            const heights = [0, 0]                                                          // Heights of each column

            data.forEach(item => {
                const shorterColumnIndex = heights[0] <= heights[1] ? 0 : 1                 // Determine shorter column
                columns[shorterColumnIndex].push(item)                                      // Add item to shorter column
                heights[shorterColumnIndex] += item.height                                  // Update height of shorter column
            })

            setColumns(columns)
        }

        calculateColumns()
    }, [data]) // Empty dependency array ensures this effect runs only once

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Render columns */}
            {columns.map((column, columnIndex) => (
                <View key={columnIndex} style={styles.column}>
                    {/* Render items in column */}
                    {column.map(item => (
                        <CustomHeight key={item.id} item={item} />
                    ))}
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row', // Render columns horizontally
    },
    column: {
        flex: 1, // Each column occupies equal space
    },
    btnItem: {
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginBottom: 10,
        borderRadius: 20,
        overflow: 'hidden',

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 12
    },
    imgDish: {
        width: '100%',
        resizeMode: 'cover'
    },
    viewTopBar: {
        // backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    viewTextPrice: {
        backgroundColor: 'rgba(0,0,0, 0.7)',
        width: '40%',
        borderBottomRightRadius: 12,
    },
    txtPrice: {
        color: Colors.orange,
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 20,
        paddingLeft: 10
    },
    btnImgIcon: {
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgLikeIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: Colors.red
    },
    viewText: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        justifyContent: 'center'
    },
    txtTitle: {
        color: Colors.white,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 14,
        textAlign: 'center'
    },
})

export default MasonryLayout