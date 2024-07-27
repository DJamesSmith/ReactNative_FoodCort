import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Colors } from '../themes/Colors'

const { width, height } = Dimensions.get('screen')

const ADDRESS_DATA = [
    { label: 'Home', value: '1', addressIcon: 'https://cdn-icons-png.flaticon.com/128/1946/1946436.png' },
    { label: 'Workplace', value: '2', addressIcon: 'https://cdn-icons-png.flaticon.com/128/10866/10866352.png' },
    { label: 'School/University', value: '3', addressIcon: 'https://cdn-icons-png.flaticon.com/128/2231/2231549.png' },
    { label: 'Gym', value: '4', addressIcon: 'https://cdn-icons-png.flaticon.com/128/563/563828.png' },
    { label: 'Park', value: '5', addressIcon: 'https://cdn-icons-png.flaticon.com/128/1175/1175062.png' },
]

const DropdownAddressType = ({ onSelectedLabel }) => {
    const [value, setValue] = useState(null)
    // console.log(`Value: ${value}`)

    const onChange = item => {
        setValue(item.value)
        const selectedLabel = ADDRESS_DATA.find(data => data.value === item.value)?.label
        // console.log(`SelectedLabel: ${selectedLabel}`)
        onSelectedLabel(item.label)
    }

    const renderItem = item => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <Image
                        source={{ uri: item?.addressIcon }}
                        style={{
                            height: 20,
                            width: 20,
                            resizeMode: 'contain'
                        }}
                    />
                )}
            </View>
        )
    }

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ADDRESS_DATA}
            search
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder='Select item'
            searchPlaceholder='Search...'
            value={value}
            onChange={onChange}
            renderLeftIcon={() => (
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/5956/5956819.png' }}
                    style={{
                        height: 20,
                        width: 20,
                        resizeMode: 'contain',
                        marginRight: 10
                    }}
                />
            )}
            renderItem={renderItem}
        />
    )
}

export default DropdownAddressType

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: Colors.white,
        margin: 16,
        height: 50,
        borderRadius: 12,
        padding: 12,
        width: width - 60,
        alignSelf: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})