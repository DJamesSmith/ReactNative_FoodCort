/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import store from './src/redux/store/Store'
LogBox.ignoreAllLogs()


const FoodCort = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => FoodCort)