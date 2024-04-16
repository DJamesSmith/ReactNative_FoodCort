import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screens/auth/Login'
import Register from '../screens/auth/Register'
import Onboarding from '../screens/onboarding/Onboarding'
import { useSelector } from 'react-redux'
import DrawerNavigation from './DrawerNavigation'

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
                    </Stack.Navigator>
            }
        </NavigationContainer>
    )
}

export default StackNavigation