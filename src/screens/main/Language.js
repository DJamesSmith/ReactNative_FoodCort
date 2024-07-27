import { View, Text, StyleSheet, Dimensions, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import { arrLanguages } from '../../assets/Languages'

const { width, height } = Dimensions.get('screen')

const Language = ({ navigation }) => {

    const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(9)
    const [searchInput, setSearchInput] = useState('')
    console.log(`searchInput: ${searchInput}`)

    const renderLanguages = ({ item, index }) => {
        const isSelected = selectedLanguageIndex === index

        const handleSelectedLanguage = () => {
            console.log(`Language${index}: ${item}`)
            setSelectedLanguageIndex(index)
        }

        return (
            <TouchableOpacity
                style={[styles.btnLanguage, {
                    borderColor: isSelected ? Colors.orange : Colors.transparent,
                    borderWidth: isSelected ? 0.7 : 0
                }]}
                onPress={handleSelectedLanguage}>
                <View style={styles.viewImgContainer}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/128/3269/3269817.png' }}
                        style={styles.languageIcons}
                    />
                </View>
                <Text style={styles.txtLanguageName}>{item}</Text>
                {
                    isSelected && (
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/9249/9249233.png' }}
                            style={styles.selectedIcon}
                        />
                    )
                }
            </TouchableOpacity>
        )
    }

    const filteredLanguages = arrLanguages.filter(language =>
        language.toLowerCase().includes(searchInput.toLowerCase())
    )

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Language`}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    color={Colors.black}
                    borderBottomColor={Colors.mediumGrey}
                    borderBottomWidth={0.5}

                    leftIcon={Icons.back}
                    leftIconSize={18}
                    leftIconLeft={10}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}
                />
            </View>

            {/* Search Input */}
            <View style={styles.searchBox}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/2801/2801881.png' }}
                    style={styles.searchBarIcons}
                />
                <TextInput
                    placeholder='Search language'
                    placeholderTextColor={Colors.grey}
                    style={styles.searchInput}
                    value={searchInput}
                    onChangeText={(txt) => setSearchInput(txt)}
                />
            </View>

            <FlatList
                data={[0]}
                keyExtractor={(item, index) => index.toString()}
                renderItem={() => {
                    return (
                        <>
                            <FlatList
                                data={filteredLanguages}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderLanguages}
                                contentContainerStyle={{
                                }}
                                style={{
                                    paddingTop: 10
                                }}
                            />
                        </>
                    )
                }}
                contentContainerStyle={{
                    paddingHorizontal: 30,
                }}
            />
        </View>
    )
}

export default Language

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
        backgroundColor: Colors.lightGrey,
        width: width - 60,
        height: 50,
        alignSelf: 'center',
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 10,

        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,

        // borderColor: Colors.grey,
        // borderWidth: 0.7
    },
    searchBarIcons: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        tintColor: Colors.grey
    },
    searchInput: {
        width: '75%',
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 18,
        top: 2,
        marginLeft: 10,
    },







    btnLanguage: {
        // backgroundColor: Colors.red,
        height: 50,
        marginVertical: 5,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    viewImgContainer: {
        backgroundColor: Colors.lightGrey,
        height: 40,
        width: 40,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    languageIcons: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
    },
    txtLanguageName: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 20,
        color: Colors.black,
        marginLeft: 15
    },
    selectedIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        position: 'absolute',
        right: 10,
        tintColor: Colors.orange
    },

})