import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsRequest } from '../../redux/reducers/UserReducer'
import { useIsFocused } from '@react-navigation/native'
import { Colors } from '../../themes/Colors'
import MyStatusBar from '../../utils/MyStatusBar'
import { Fonts } from '../../themes/Fonts'
import constants from '../../utils/helpers/constants'
import Loader from '../../utils/helpers/Loader'

var status = ''
const MyProfile = () => {

    const isFocused = useIsFocused()

    const [userDetails, setUserDetails] = useState({})

    const dispatch = useDispatch()
    const UserReducer = useSelector(state => state.UserReducer)

    useEffect(() => {
        if (isFocused) {
            dispatch(getUserDetailsRequest())
        }
    }, [isFocused])

    if (UserReducer?.status !== status || status == '') {
        switch (UserReducer?.status) {
            case 'User/getUserDetailsRequest':
                status = UserReducer?.status
                break

            case 'User/getUserDetailsSuccess':
                status = UserReducer?.status
                setUserDetails(UserReducer?.userInfo)
                break

            case 'User/getUserDetailsFailure':
                status = UserReducer?.status
                break

            default:
            // console.log(`Sorry, we are out of ${expr}.`)
        }
    }

    console.log(`ProfileImageURL ----> ${userDetails?.profile_pic}`)

    return (
        <SafeAreaView style={styles.container}>
            <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <Loader visible={UserReducer?.status == 'User/getUserDetailsRequest'} />

            <View style={styles.profileContainer}>
                <Image
                    source={{ uri: userDetails?.profile_pic ? constants.PROFILE_PIC_URL.concat(userDetails?.profile_pic) : `https://cdn-icons-png.flaticon.com/128/847/847969.png` }}
                    style={styles.imgProfileCircle}
                />
                <Text style={styles.text}>{userDetails?.first_name + ' ' + userDetails?.last_name}</Text>
                <Text style={styles.text}>{userDetails?.contact}</Text>
            </View>
        </SafeAreaView>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        alignItems: 'center',
        paddingTop: 30
    },
    profileContainer: {
        // backgroundColor: Colors.blue,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgProfileCircle: {
        // backgroundColor: Colors.blue,
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    text: {
        fontFamily: "PoppinsBold",
        marginTop: 30,
        fontSize: 32,
        fontFamily: Fonts.SF_Compact_Rounded_Medium,
        color: Colors.black,
        textAlign: 'center'
    },
})