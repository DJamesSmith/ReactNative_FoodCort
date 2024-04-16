import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer'

import ChatPage from '../screens/main/Chat'
import FriendsPage from '../screens/main/Friends'
import AppPreferencesPage from '../screens/main/AppPreferences'
import SupportFeedbackPage from '../screens/main/SupportFeedback'
import SettingsPage from '../screens/main/Settings'
import { Colors } from '../themes/Colors'
import TabBarNavigation from './TabBarNavigation'
import constants from '../utils/helpers/constants'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRequest } from '../redux/reducers/AuthReducer'
import { getUserDetailsRequest } from '../redux/reducers/UserReducer'
import { useIsFocused } from '@react-navigation/native'
import { Icons } from '../themes/Icons'

const Drawer = createDrawerNavigator()

var status = ''
const Help = () => {
    return (
        <TouchableOpacity onPress={() => { }} activeOpacity={0.7}>
            <View style={[styles.viewButton, { backgroundColor: Colors.transparent }]}>
                <View style={styles.imgBtnContainer}>
                    <Image
                        source={Icons.question}
                        style={styles.imgBtn}
                    />
                </View>
                <Text style={{ fontSize: 18, color: Colors.grey, fontWeight: 'bold' }}>Help</Text>
            </View>
        </TouchableOpacity>
    )
}

const LogoutButton = () => {
    const handleLogout = () => dispatch(logoutRequest())
    const dispatch = useDispatch()

    return (
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.7}>
            <View style={[styles.viewButton, { backgroundColor: Colors.transparent }]}>
                <View style={styles.imgBtnContainer}>
                    <Image
                        source={Icons.logout}
                        style={styles.imgBtn}
                    />
                </View>
                <Text style={{ fontSize: 18, color: Colors.grey, fontWeight: 'bold' }}>Log out</Text>
            </View>
        </TouchableOpacity>
    )
}

const CustomDrawer = props => {
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

    console.log(`ImageURL ----> ${userDetails?.profile_pic}`)

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: userDetails?.profile_pic ? constants.PROFILE_PIC_URL.concat(userDetails?.profile_pic) : `https://cdn-icons-png.flaticon.com/128/847/847969.png` }}
                        style={styles.imgProfileCircle}
                    />
                    <Text style={styles.text}>{userDetails?.first_name + ' ' + userDetails?.last_name}</Text>
                </View>

                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <Help />
            <LogoutButton />
        </View>
    )
}

const DrawerNavigation = () => {

    const drawerItem = [
        { name: 'Dashboard', componentName: TabBarNavigation, iconImg: 'https://cdn-icons-png.flaticon.com/128/3388/3388856.png' },
        { name: 'Chat', componentName: ChatPage, iconImg: 'https://cdn-icons-png.flaticon.com/128/566/566769.png' },
        { name: 'Friends', componentName: FriendsPage, iconImg: 'https://cdn-icons-png.flaticon.com/128/3220/3220829.png' },
        { name: 'App Preferences', componentName: AppPreferencesPage, iconImg: 'https://cdn-icons-png.flaticon.com/128/10932/10932248.png' },
        { name: 'Support & Feedback', componentName: SupportFeedbackPage, iconImg: 'https://cdn-icons-png.flaticon.com/128/4222/4222017.png' },
        { name: 'Settings', componentName: SettingsPage, iconImg: 'https://cdn-icons-png.flaticon.com/128/2698/2698011.png' },
    ]

    return (
        <Drawer.Navigator
            initialRouteName={drawerItem[0].name}
            drawerContent={(props) => (
                <CustomDrawer {...props} />
            )}
            screenOptions={{
                drawerActiveBackgroundColor: "#C6F3CA",
                drawerActiveTintColor: "#12B886",
                headerShown: false,
                drawerStyle: {
                    // backgroundColor: Colors.darkBG,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                }
            }}>
            {
                drawerItem.map((item, index) => {
                    return (
                        <Drawer.Screen
                            key={index}
                            name={item.name}
                            component={item.componentName}
                            options={{
                                drawerIcon: () => (
                                    <Image
                                        source={{ uri: item.iconImg }}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                ),
                            }}
                        />
                    )
                })
            }
        </Drawer.Navigator>
    )
}

export default DrawerNavigation

const styles = StyleSheet.create({
    header: {
        height: 180,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
    },
    imgProfileCircle: {
        width: 100,
        height: 100,
        // backgroundColor: "#12B886",
        borderRadius: 100,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        fontFamily: "PoppinsBold",
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black
    },
    viewButton: {
        padding: 15,
        marginHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        bottom: 10,
        flexDirection: 'row'
    },
    imgBtnContainer: {
        backgroundColor: Colors.lightGrey,
        height: 35,
        width: 35,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    imgBtn: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        tintColor: Colors.grey
    }
})