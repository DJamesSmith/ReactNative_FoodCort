import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import Onboarding from '../screens/onboarding/Onboarding'
import { useSelector } from 'react-redux'
import DrawerNavigation from './DrawerNavigation'
import MenuDetails from '../screens/main/MenuDetails'
import ExtraIngredients from '../screens/main/ExtraIngredients'
import ConfirmBill from '../screens/main/ConfirmBill'
import ChangeAddress from '../screens/main/ChangeAddress'
import EditProfile from '../screens/main/EditProfile'
import ChangePaymentCard from '../screens/main/ChangePaymentCard'
import ChangePassword from '../screens/main/ChangePassword'
import Language from '../screens/main/Language'
import Security from '../screens/main/Security'
import LegalPolicies from '../screens/main/LegalPolicies'
import HelpSupport from '../screens/main/HelpSupport'
import Notifications from '../screens/main/Notifications'
import Downloads from '../screens/main/Downloads'
import MyCart from '../screens/main/MyCart'
import AllProducts from '../screens/main/AllProducts'

const Stack = createStackNavigator()

const StackNavigation = () => {

    const AuthReducer = useSelector(state => state.AuthReducer)

    // console.log('AuthReducer.token:', AuthReducer.token)

    return (
        <NavigationContainer>
            {
                AuthReducer.token == null ?
                    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName='Onboarding'>
                        <Stack.Screen name='Onboarding' component={Onboarding} />
                        <Stack.Screen name='Register' component={Register} />
                        <Stack.Screen name='Login' component={Login} />
                    </Stack.Navigator> :
                    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
                        <Stack.Screen name='Drawer' component={DrawerNavigation} />
                        <Stack.Screen name='MenuDetails' component={MenuDetails} />
                        <Stack.Screen name='ExtraIngredients' component={ExtraIngredients} />
                        <Stack.Screen name='ConfirmBill' component={ConfirmBill} />
                        <Stack.Screen name='ChangeAddress' component={ChangeAddress} />
                        <Stack.Screen name='ChangePaymentCard' component={ChangePaymentCard} />
                        <Stack.Screen name='EditProfile' component={EditProfile} />
                        <Stack.Screen name='ChangePassword' component={ChangePassword} />
                        <Stack.Screen name='Language' component={Language} />
                        <Stack.Screen name='Security' component={Security} />
                        <Stack.Screen name='Legal & Policies' component={LegalPolicies} />
                        <Stack.Screen name='Help & Support' component={HelpSupport} />
                        <Stack.Screen name='Notifications' component={Notifications} />
                        <Stack.Screen name='Downloads' component={Downloads} />
                        <Stack.Screen name='MyCart' component={MyCart} />
                        <Stack.Screen name='AllProducts' component={AllProducts} />

                    </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

export default StackNavigation