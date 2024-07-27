import { View, Text, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsRequest } from '../../redux/reducers/UserReducer'
import { useIsFocused } from '@react-navigation/native'
import { Colors } from '../../themes/Colors'
import MyStatusBar from '../../utils/MyStatusBar'
import { Fonts } from '../../themes/Fonts'
import Header from '../../components/Header'
import { Icons } from '../../themes/Icons'
import isInternetConnected from '../../utils/helpers/NetInfo'
import showErrorAlert from '../../utils/helpers/Toast'
import NetworkStatus from '../../utils/helpers/NetworkStatus'
import { logoutRequest } from '../../redux/reducers/AuthReducer'
import ConfirmationModal from '../../utils/centerModals/ConfirmationModal'

const { width, height } = Dimensions.get('screen')

var status = ''

const MyProfile = ({ navigation }) => {

    const dispatch = useDispatch()
    const UserReducer = useSelector(state => state.UserReducer)

    const isFocused = useIsFocused()
    const [userDetails, setUserDetails] = useState({})

    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false)

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

    // console.log(`ProfileImageURL ----> ${userDetails?.profile_pic}`)
    // console.log(`UserID: ${userDetails._id}`)

    const arrProfileList = [
        { title: 'Favourites', onPress: () => Favourites(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/151/151910.png' },
        { title: 'Downloads', onPress: () => Downloads(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/7268/7268609.png' },
        { title: 'MyCart', onPress: () => MyCart(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/3144/3144456.png' },
        { title: 'Address', onPress: () => ChangeAddress(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/535/535239.png' },
        { title: 'Display', onPress: () => Display(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/4865/4865116.png' },
        { title: 'Feed preference', onPress: () => FeedPreference(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/254/254638.png' },
        { title: 'Subscription', onPress: () => Subscription(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/5983/5983861.png' },
        { title: 'Clear Cache', onPress: () => ClearCache(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/5141/5141494.png' },
        { title: 'Clear history', onPress: () => ClearHistory(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/3503/3503786.png' },
        { title: 'Log out', onPress: () => LogOut(), imgIcon: 'https://cdn-icons-png.flaticon.com/128/1828/1828427.png' },
    ]

    const Favourites = () => {
        navigation.navigate('Favorite')
    }

    const Downloads = () => {
        navigation.navigate('Downloads')
    }

    const MyCart = () => {
        navigation.navigate('MyCart')
    }

    const ChangeAddress = () => {
        navigation.navigate('ChangeAddress')
    }

    const Display = () => {
        console.log(`Display`)
    }

    const FeedPreference = () => {
        console.log(`Feed Preference`)
    }

    const Subscription = () => {
        console.log(`Subscription`)
    }

    const ClearCache = () => {
        console.log(`Clear Cache`)
    }

    const ClearHistory = () => {
        console.log(`Clear History`)
    }

    const LogOut = () => {
        setIsConfirmationModalVisible(true)
    }

    const confirmLogout = () => {
        setIsConfirmationModalVisible(false)
        isInternetConnected()
            .then(() => {
                dispatch(logoutRequest())
            })
            .catch(err => showErrorAlert(`Please connect to the internet to correct the ${err} status of your network`, Colors.red))
    }

    return (
        <NetworkStatus>
            <SafeAreaView style={styles.container}>
                <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                {/* <Loader visible={UserReducer?.status == 'User/getUserDetailsRequest'} /> */}

                <View style={styles.headerBar}>
                    <Header
                        backgroundColor={Colors.transparent}
                        title={`My Profile`}
                        fontSize={20}
                        titleFontFamily={Fonts.SF_Compact_Rounded_Medium}
                        color={Colors.black}
                        borderBottomColor={Colors.mediumGrey}
                        borderBottomWidth={0.5}

                        rightIcon={Icons.settings}
                        rightIconSize={18}
                        rightIconRight={10}
                        rightIconTintColor={Colors.black}
                        onRightPress={() => navigation.navigate(`Settings`)}
                    />
                </View>

                <View style={styles.viewProfileContainer}>
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: `data:image/jpeg;base64,${userDetails.profile_pic}` }}
                            style={styles.imgProfileCircle}
                        />
                    </View>

                    <View style={styles.viewRightContainer}>
                        <View style={styles.viewTextContent}>
                            <Text style={styles.textName}>{userDetails?.first_name ? userDetails?.first_name + ' ' : ''} {userDetails?.last_name ? userDetails?.last_name : ''}</Text>
                            <Text style={styles.textEmail}>{userDetails?.contact}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btnEditProfile}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('EditProfile', { userProfileDetails: userDetails })}>
                            <Text style={styles.txtEditProfile}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewProfileList}>
                    {
                        arrProfileList.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <TouchableOpacity
                                        style={styles.btnOption}
                                        onPress={() => item?.onPress()}>
                                        <Image
                                            source={{ uri: item?.imgIcon }}
                                            style={styles.imgIcon}
                                        />
                                        <Text style={styles.txtOption}>{item?.title}</Text>
                                        <Image
                                            source={Icons.arrowRight}
                                            style={styles.imgArrowRight}
                                        />
                                    </TouchableOpacity>
                                    {
                                        index === 1 || index === 6 ? <View style={styles.listSeperator}></View> : <></>
                                    }
                                </React.Fragment>
                            )
                        })
                    }
                </View>

                <ConfirmationModal
                    visible={isConfirmationModalVisible}
                    onClose={() => setIsConfirmationModalVisible(false)}
                    onConfirm={confirmLogout}
                    title={`Logout`}
                    question={`Are you sure you want to Logout?`}
                    rejectTitle={`No`}
                    acceptTitle={`Yes`}
                />

            </SafeAreaView>
        </NetworkStatus>
    )
}

export default MyProfile

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
    imgContainer: {
        backgroundColor: Colors.transparent,
        height: 130,
        width: 130,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 65,

        // borderColor: Colors.white,
        // borderWidth: 2.5,
    },
    imgProfileCircle: {
        // backgroundColor: Colors.blue,
        width: 120,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 600,
    },

    viewProfileContainer: {
        // backgroundColor: Colors.red,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        justifyContent: 'space-evenly'
    },
    viewRightContainer: {
        // backgroundColor: Colors.yellow,
    },
    viewTextContent: {
        // backgroundColor: Colors.yellow,
        justifyContent: 'center',
    },
    textName: {
        fontFamily: Fonts.SF_Compact_Rounded_Bold,
        fontSize: 28,
        color: Colors.black
    },
    textEmail: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        top: -12
    },
    btnEditProfile: {
        backgroundColor: Colors.orange,
        borderRadius: 8,
        height: 45,
        width: 130,
        justifyContent: 'center',
        alignItems: 'center',
        top: -5
    },
    txtEditProfile: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 18,
        color: Colors.white,
        top: 2
    },
    viewProfileList: {
        // backgroundColor: Colors.red,
        paddingHorizontal: 25,
        marginTop: 10
    },
    btnOption: {
        // backgroundColor: Colors.blue,
        marginVertical: 5,
        height: 36,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    txtOption: {
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        fontSize: 20,
        color: Colors.black,
        marginLeft: 10,
        top: 1
    },
    imgArrowRight: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        position: 'absolute',
        right: 0
    },
    listSeperator: {
        height: 1.5,
        backgroundColor: '#e0e0e0', // LightGrey
        width: '100%',
        marginVertical: 10
    }
})