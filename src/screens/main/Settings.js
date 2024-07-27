import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../themes/Colors'
import { Icons } from '../../themes/Icons'
import Header from '../../components/Header'
import { Fonts } from '../../themes/Fonts'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsRequest } from '../../redux/reducers/UserReducer'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import { useIsFocused } from '@react-navigation/native'
import NetworkStatus from '../../utils/helpers/NetworkStatus'

const { width, height } = Dimensions.get('screen')

var status = ''

const Settings = ({ navigation }) => {

    const dispatch = useDispatch()
    const UserReducer = useSelector(state => state.UserReducer)

    const isFocused = useIsFocused()
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        if (isFocused) {
            isInternetConnected()
                .then(() => {
                    dispatch(getUserDetailsRequest())
                })
                .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
        }
    }, [isFocused])

    if (UserReducer?.status !== status || status == '') {
        switch (UserReducer?.status) {
            case 'User/getUserDetailsRequest':
                status = UserReducer?.status
                break

            case 'User/getUserDetailsSuccess':
                status = UserReducer?.status
                setUserDetails(UserReducer?.userInfo ? UserReducer?.userInfo : {})
                break

            case 'User/getUserDetailsFailure':
                status = UserReducer?.status
                break

            default:
            // console.log(`Sorry, we are out of ${expr}.`)
        }
    }















    const arrTitles = [
        { title: 'Edit Profile', imgIcon: Icons.user, type: 'general', },
        { title: 'Change Password', imgIcon: Icons.password, type: 'general', },
        { title: 'Your Addresses', imgIcon: Icons.address, type: 'general', },
        { title: 'Language', imgIcon: Icons.global, type: 'general', },
        { title: 'Security', imgIcon: Icons.security, type: 'general', },
        { title: 'Payment Methods', imgIcon: Icons.payment, type: 'preferences', },
        { title: 'Legal & Policies', imgIcon: Icons.shield, type: 'preferences', },
        { title: 'Help & Support', imgIcon: Icons.help, type: 'preferences', },
        // { title: 'Logout', imgIcon: Icons.logout, type: 'preferences' },
    ]

    const TitleComponent = ({ title }) => {
        return (
            <Text style={styles.txtHeader}>{title}</Text>
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

    const renderTitles = ({ item }) => {

        const handleNavigation = () => {
            switch (item.title) {
                case 'Edit Profile':
                    navigation.navigate('EditProfile', { userProfileDetails: userDetails })
                    break
                case 'Change Password':
                    navigation.navigate('ChangePassword')
                    break
                case 'Your Addresses':
                    navigation.navigate('ChangeAddress')
                    break
                case 'Language':
                    navigation.navigate('Language')
                    break
                case 'Security':
                    navigation.navigate('Security')
                    break
                case 'Payment Methods':
                    navigation.navigate('ChangePaymentCard')
                    break
                case 'Legal & Policies':
                    navigation.navigate('Legal & Policies')
                    break
                case 'Help & Support':
                    navigation.navigate('Help & Support')
                    break
                default:
                    break
            }
        }

        return (
            <TouchableOpacity
                style={styles.btnGeneralItem}
                activeOpacity={0.7}
                onPress={handleNavigation}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={[Colors.white, Colors.white, Colors.transparent]}
                    style={styles.linearGradient}>

                    <Image
                        source={item?.imgIcon}
                        style={styles.imgUser}
                    />
                    <Text style={styles.txtTitle}>{item?.title}</Text>
                    {item?.title === 'Language' ? <Text style={styles.txtSelectedLanguage}>English</Text> : ''}
                    <Image
                        source={Icons.arrowRight}
                        style={styles.imgArrowRight}
                    />
                </LinearGradient>
            </TouchableOpacity>
        )
    }

    const renderSectionHeader = ({ section }) => {
        return (
            <TitleComponent title={section === 'general' ? 'General' : 'Preferences'} />
        )
    }

    const sections = preprocessData(arrTitles)

    return (
        <NetworkStatus headerTitle={`Settings`}>
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Header
                        backgroundColor={Colors.transparent}
                        title={`Settings`}
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

                <View style={styles.viewSettingsContainer}>
                    <FlatList
                        data={Object.entries(sections)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <>
                                {renderSectionHeader({ section: item[0] })}
                                <FlatList
                                    data={item[1]}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={renderTitles}
                                />
                            </>
                        )}
                        contentContainerStyle={{
                            paddingBottom: 175
                        }}
                    />
                </View>

                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.btnLogout}>
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={[Colors.white, Colors.white, Colors.transparent]}
                            style={styles.linearGradientLogout}>
                            <Image
                                source={Icons.logout}
                                style={styles.imgLogout}
                            />
                            <Text style={styles.txtLogout}>Logout</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </NetworkStatus>
    )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.offWhite,
        flex: 1,
    },
    headerBar: {
        backgroundColor: Colors.white,
        width: '100%',
        paddingTop: 20
    },
    viewSettingsContainer: {
        paddingHorizontal: 30
    },
    txtHeader: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        color: Colors.black,
        fontSize: 24,
        marginTop: 20
    },
    btnGeneralItem: {
        flexDirection: 'row',
        marginVertical: 6,
        borderRadius: 12,
        overflow: 'hidden'
    },
    linearGradient: {
        flexDirection: 'row',
        height: 50,
        width: width - 50,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    imgUser: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    txtTitle: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.black,
        marginLeft: 15,
    },
    txtSelectedLanguage: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 16,
        color: Colors.mediumGrey,
        position: 'absolute',
        right: 45
    },
    logoutContainer: {
        backgroundColor: Colors.offWhite,
        position: 'absolute',
        bottom: 0,
        height: 80,
        width: width,
        flexDirection: 'row',
        left: (width - (width - 70)) / 2,
    },
    btnLogout: {
        // backgroundColor: Colors.offWhite,
        width: width - 50,
        height: 50
    },
    imgLogout: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.red,
    },
    txtLogout: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.red,
        marginLeft: 15,
    },
    linearGradientLogout: {
        // backgroundColor: Colors.black,
        flexDirection: 'row',
        height: 50,
        width: width - 50,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    imgArrowRight: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.mediumGrey,
        position: 'absolute',
        right: 20
    }
})