import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { arrBagels, arrBurritos, arrCookies, arrCroissants, arrDonuts, arrFriedChicken, arrHamBurgers, arrIceCream, arrPancakes, arrPasta, arrPizzas, arrTacos } from '../../assets/Data'
import MasonryLayout from './MasonryLayout'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'

const CategoryDisplay = ({ selectedCategory }) => {

    const dataMap = {
        'Hamburgers': arrHamBurgers,
        'pizzas': arrPizzas,
        'cookies': arrCookies,
        'croissants': arrCroissants,
        'Tacos': arrTacos,
        'Pasta': arrPasta,
        'Ice cream': arrIceCream,
        'Fried chicken': arrFriedChicken,
        'Pancakes': arrPancakes,
        'Burritos': arrBurritos,
        'Donuts': arrDonuts,
        'Bagels': arrBagels
    }

    const data = dataMap[selectedCategory] || []
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

    if (selectedCategory === 'Cuisine') {
        return null
    }

    return (
        <View>
            {data.length > 0 ? (
                <MasonryLayout data={data} />
            ) : (
                <Text style={styles.txtNoData}>No {capitalize(selectedCategory)} available.</Text>
            )}
        </View>
    )
}

export default CategoryDisplay

const styles = StyleSheet.create({
    txtNoData: {
        // backgroundColor: Colors.red,
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.mediumGrey,
        fontSize: 24,
        textAlign: 'center',
        marginTop: 140
    },
})