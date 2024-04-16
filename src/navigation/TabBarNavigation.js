import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Colors } from '../themes/Colors'
import Home from '../screens/main/Home'
import MyOrder from '../screens/main/MyOrder'
import Favorite from '../screens/main/Favorite'
import MyProfile from '../screens/main/MyProfile'

const Tab = createBottomTabNavigator()

const arrBottomTabData = [
    { name: 'Home', componentName: Home, iconImg: 'https://cdn-icons-png.flaticon.com/128/1086/1086933.png', iconImgFill: 'https://cdn-icons-png.flaticon.com/128/1086/1086933.png' },
    { name: 'My Order', componentName: MyOrder, iconImg: 'https://cdn-icons-png.flaticon.com/128/3144/3144456.png', iconImgFill: 'https://cdn-icons-png.flaticon.com/128/3144/3144486.png' },
    { name: 'Favorite', componentName: Favorite, iconImg: 'https://cdn-icons-png.flaticon.com/128/130/130195.png', iconImgFill: 'https://cdn-icons-png.flaticon.com/128/2550/2550290.png' },
    { name: 'My Profile', componentName: MyProfile, iconImg: 'https://cdn-icons-png.flaticon.com/128/456/456283.png', iconImgFill: 'https://cdn-icons-png.flaticon.com/128/456/456212.png' },
]

const TabBarNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarInactiveTintColor: Colors.mediumGrey,
                tabBarActiveTintColor: Colors.orange,
            }}>
            {
                arrBottomTabData.map((item, index) => {
                    return (
                        <Tab.Screen
                            key={index}
                            name={item.name}
                            component={item.componentName}
                            options={({ route }) => ({
                                tabBarIcon: ({ focused }) => (
                                    <Image
                                        source={{ uri: focused ? item?.iconImgFill : item?.iconImg }}
                                        style={{
                                            height: 20,
                                            width: 20,
                                            resizeMode: 'contain',
                                            tintColor: focused ? Colors.orange : Colors.mediumGrey
                                        }}
                                    />
                                )
                            })} />
                    )
                })
            }
        </Tab.Navigator>
    )
}

export default TabBarNavigation