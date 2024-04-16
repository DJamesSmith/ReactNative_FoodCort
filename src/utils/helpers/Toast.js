import { ToastAndroid } from 'react-native'
// import Toast from "react-native-simple-toast"
import Snackbar from 'react-native-snackbar'

export default function showErrorAlert(message, isLong = false) {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  })
}