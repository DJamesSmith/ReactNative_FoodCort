import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, StatusBar } from 'react-native'
import StackNavigation from './src/navigation/StackNavigation'
import Splash from './src/screens/onboarding/Splash'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from './src/redux/reducers/AuthReducer'
import { Colors } from './src/themes/Colors'
import MyStatusBar from './src/utils/MyStatusBar'
import NetworkStatus from './src/utils/helpers/NetworkStatus'

export const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const App = () => {

    const dispatch = useDispatch()
    const AuthReducer = useSelector(state => state.AuthReducer)

    const [showSplash, setShowSplash] = useState(true)

    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false)
            dispatch(getToken())
        }, 2500)

        return () => clearTimeout(splashTimer)
    }, [])

    return <View style={{
        // backgroundColor: Colors.red,
        flex: 1
    }}>
        <MyStatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
        {
            AuthReducer?.loading ? <Splash /> : <StackNavigation />
        }
    </View>
}

export default App


// import { View, Text, Dimensions } from 'react-native'
// import React from 'react'
// import TextInputHeight from './src/screens/main/Testing/TextInputHeight'

// const App = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <TextInputHeight />
//         </View>
//     )
// }

// export default App