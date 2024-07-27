import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { Fonts } from '../../themes/Fonts'
import { Colors } from '../../themes/Colors'
import Header from '../../components/Header'
import { Icons } from '../../themes/Icons'
import { arrDebitCards } from '../../assets/Data'

const ChangePaymentCard = ({ navigation }) => {

    const [selectedCardIndex, setSelectedCardIndex] = useState(0)

    const renderDebitCardsComponent = ({ item, index }) => {
        const isSelected = selectedCardIndex === index

        console.log(`selectedCardIndex: ${selectedCardIndex}`)

        return (
            <View style={styles.PaymentMethodContainer}>
                <TouchableOpacity
                    style={styles.btnDebitCard}
                    activeOpacity={0.8}
                    onPress={() => setSelectedCardIndex(index)}>
                    <View style={styles.debitShadow}>
                        <Image
                            source={item?.imgCard}
                            style={[styles.imgDebitCard, { top: 2 }]}
                        />
                    </View>
                    <Text style={styles.txtDebitNumber}>{item?.cardNumber}</Text>
                    {isSelected && (
                        <Image
                            source={{ uri: 'https://cdn-icons-png.flaticon.com/128/711/711239.png' }}
                            style={styles.imgCheckmark}
                        />
                    )}
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Payment Preferences`}
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

                    rightText={`Add New`}
                    rightTextRight={20}
                    rightTextColor={Colors.orange}
                    rightTextFontSize={16}
                    rightTextFontFamily={Fonts.SF_Compact_Rounded_Medium}
                    // rightTextTop={1}
                    onRightPress={() => console.log(`Chosen Debit Card`)}
                />
            </View>

            <FlatList
                data={arrDebitCards}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderDebitCardsComponent}
                contentContainerStyle={{
                    paddingTop: 30
                }}
            />
        </View>
    )
}

export default ChangePaymentCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
    },
    headerBar: {
        // backgroundColor: Colors.black,
        width: '100%',
        paddingTop: 20
    },






    PaymentMethodContainer: {
        // backgroundColor: Colors.green,
        paddingHorizontal: 25,
    },
    btnDebitCard: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 80,
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,

        borderColor: Colors.mediumGrey,
        borderWidth: 0.5,

        marginVertical: 5
    },
    debitShadow: {
        backgroundColor: Colors.white,
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.7,
        shadowRadius: 7,
        elevation: 12,
    },
    imgDebitCard: {
        height: 45,
        width: 45,
        resizeMode: 'contain'
    },
    txtDebitNumber: {
        position: 'absolute',
        left: 95,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.black,
        fontSize: 20,
        letterSpacing: 2
    },
    imgCheckmark: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.orange,
    }
})