import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'

const Downloads = ({ navigation }) => {
    const arrDownloads = [
        { title: 'Biryani', imgIcon: require('../../assets/images/biryani.jpg') },
        { title: 'Mussels', imgIcon: require('../../assets/images/mussels.jpg') },
    ]

    const renderDownloadComponent = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.btnDownloaded}
                activeOpacity={0.7}
                onPress={() => console.log(`Downloaded`)}>
                <Image
                    source={item?.imgIcon}
                    style={styles.imgIcon}
                />
                <Text style={styles.txtDownload}>{item?.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Downloads`}
                    fontSize={20}
                    titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    color={Colors.black}
                    borderBottomColor={Colors.mediumGrey}
                    borderBottomWidth={0.5}

                    leftIcon={Icons.back}
                    leftIconLeft={10}
                    leftIconSize={18}
                    leftIconTintColor={Colors.grey}
                    onLeftPress={() => navigation.goBack()}
                />
            </View>

            <Text style={styles.txtHeader}>Downloaded Recipes</Text>
            <FlatList
                data={arrDownloads}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderDownloadComponent}
                contentContainerStyle={{
                    // backgroundColor: Colors.red,
                    paddingHorizontal: 25,
                    marginTop: 10
                }}
            />
        </View>
    )
}

export default Downloads

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        backgroundColor: Colors.transparent,
        width: '100%',
        paddingTop: 20,
    },
    txtHeader: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 28,
        color: Colors.black,
        marginTop: 10,
        paddingHorizontal: 25
    },
    btnDownloaded: {
        // backgroundColor: Colors.blue,
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    imgIcon: {
        height: 80,
        width: 80,
        resizeMode: 'cover',
        borderRadius: 40
    },
    txtDownload: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        marginLeft: 20
    }
})