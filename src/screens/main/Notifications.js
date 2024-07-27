import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../themes/Colors'
import { Fonts } from '../../themes/Fonts'
import { Icons } from '../../themes/Icons'
import Header from '../../components/Header'
import { arrNotifications } from '../../assets/Data'

const { width, height } = Dimensions.get('screen')

const TitleComponent = ({ title }) => {
    return (
        <Text style={styles.txtHeader}>{title}</Text>
    )
}

const renderSectionHeader = ({ section }) => {
    return (
        <TitleComponent title={section === 'today' ? 'Today' : 'Yesterday'} />
    )
}

const preprocessData = (data) => {
    const sections = {}
    data.forEach(item => {
        if (!sections[item.type]) {
            sections[item.type] = []
        }
        sections[item.type].push(item)
    })
    return sections
}

const sections = preprocessData(arrNotifications)

const renderNotifications = ({ item, index }) => {
    return (
        <TouchableOpacity
            style={styles.btnNotification}
            onPress={() => console.log(`selectedNotification: ${index}`)}>
            <View style={styles.viewImgContainer}>
                <Image
                    source={{ uri: item?.imgIcon }}
                    style={styles.imgNotification}
                />
            </View>
            <View style={styles.viewTextContent}>
                <Text style={styles.txtTitle}>{item?.title}</Text>
                <Text style={styles.txtSentTime}>{item?.sentTime}</Text>
            </View>
        </TouchableOpacity>
    )
}

const Notifications = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Header
                    backgroundColor={Colors.transparent}
                    title={`Notifications`}
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

            <View style={styles.viewNotificationsContainer}>
                <FlatList
                    data={Object.entries(sections)}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <>
                            {renderSectionHeader({ section: item[0] })}
                            <FlatList
                                data={item[1]}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderNotifications}
                            />
                        </>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{

                    }}
                />
            </View>
        </View>
    )
}

export default Notifications

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
    viewNotificationsContainer: {
        paddingHorizontal: 30
    },
    txtHeader: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
        fontSize: 24,
        marginTop: 20
    },



    btnNotification: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        height: 50,
        borderRadius: 25
    },
    viewImgContainer: {
        backgroundColor: Colors.lightGrey,
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',

    },
    imgNotification: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        tintColor: Colors.orange,
    },
    viewTextContent: {
        // backgroundColor: Colors.green,
        // height: 60,
        justifyContent: 'space-evenly',
        marginLeft: 15
    },
    txtTitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.black
    },
    txtSentTime: {
        fontFamily: Fonts.SF_Compact_Rounded_Regular,
        fontSize: 14,
        color: Colors.mediumGrey,
    },
})