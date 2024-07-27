import { ToastAndroid } from 'react-native'
import Snackbar from 'react-native-snackbar'
import { Colors } from '../../themes/Colors'

export default function showErrorAlert(message, backgroundColor, textColor, isLong = false) {
    Snackbar.show({
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: backgroundColor,
        text: message,
        textColor: textColor,
    })
}