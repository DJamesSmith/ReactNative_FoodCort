import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions } from 'react-native'
import StackNavigation from './src/navigation/StackNavigation'
import Splash from './src/screens/onboarding/Splash'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from './src/redux/reducers/AuthReducer'
export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const App = () => {

    const dispatch = useDispatch()
    const AuthReducer = useSelector(state => state.AuthReducer)

    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false)
            dispatch(getToken())
        }, 2500)

        return () => clearTimeout(splashTimer)
    }, [])

    if (AuthReducer?.loading) {
        return <Splash />
    } else {
        return <StackNavigation />
    }
}

export default App


// import { View, Text, Dimensions } from 'react-native'
// import React from 'react'
// import Register from './src/screens/auth/Register'
// export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

// const App = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <Register />
//         </View>
//     )
// }

// export default App