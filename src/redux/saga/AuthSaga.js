import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    setToken,
    setLoginToken,
    setForgotPasswordToken,

    registerSuccess,
    registerFailure,

    loginSuccess,
    loginFailure,

    logoutSuccess,
    logoutFailure,

    verifySuccess,
    verifyFailure,

    validateLoginSuccess,
    validateLoginFailure,

    forgotPasswordSuccess,
    forgotPasswordFailure,

    validateOTPSuccess,
    validateOTPFailure,

    updatePasswordSuccess,
    updatePasswordFailure,
} from '../reducers/AuthReducer'
import { postApi, fetchPost } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import constants from '../../utils/helpers/constants'
import { getUserDetailsSuccess } from '../reducers/UserReducer'
import { Colors } from '../../themes/Colors'

let getItemAuth = state => state.AuthReducer


/* Token */
export function* getTokenSaga(action) {
    try {
        let userToken = yield call(AsyncStorage.getItem, constants.TOKEN)
        yield put(setToken(userToken))
    } catch (error) {
        yield put(setToken(null))
    }
}

/* Register */
export function* registerSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'multipart/form-data',
    }

    // console.log(`SagaPayload: ${JSON.stringify(action.payload)}`)

    try {
        let response = yield call(postApi, 'user/register', action.payload, header)

        // console.log(`SagaResponse: ${JSON.stringify(response.data)}`)
        // console.log('Registrationresponse:', response)

        if (response?.status == 200) {
            yield put(registerSuccess(response?.data))

            showErrorAlert(`OTP has successfully been sent to your contact.`, Colors.blue)
        } else {
            yield put(registerFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        yield put(registerFailure(error.message))
        console.log('error -- ', error)

        if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during registration. Please try again later.', Colors.red)
        }
    }
}

/* Verify */
export function* verifySaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    }

    // console.log(`SagaPayload: ${JSON.stringify(action.payload)}`)

    try {
        let response = yield call(postApi, 'user/verify', action.payload, header)

        // console.log(`SagaResponse: ${JSON.stringify(response.data)}`)
        // console.log('VerificationResponse:', response)

        if (response?.status == 200) {
            yield put(verifySuccess(response?.data))

            showErrorAlert('Congratulations, your account has successfully been created.', Colors.blue)
        } else {
            yield put(verifyFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        yield put(verifyFailure(error.message))
        console.log('error -- ', error)

        if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during registration. Please try again later.', Colors.red)
        }
    }
}

/* Login */
export function* loginSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    }

    try {
        let response = yield call(postApi, 'user/login', action.payload, header)

        // console.log(`responseLoginSaga: ${JSON.stringify(response)}`)

        if (response?.status == 200) {
            yield put(loginSuccess(response?.data?.data))

            console.log(`Success?.token========>>>> ${response?.data?.token}`)
            yield AsyncStorage.setItem(constants.TOKEN, response?.data?.token)
            yield put(setToken(response?.data?.token))

            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(loginFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        console.log('error -- ', error)

        if (error?.response?.data?.status == 401) {
            // console.log(`Failure?.token========>>>> ${error?.response?.data?.token}`)
            yield put(setLoginToken(error?.response?.data?.token))
            showErrorAlert(error?.response?.data?.message, Colors.red)
        } else if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during login. Please try again later.', Colors.red)
        }
        yield put(loginFailure(error))
    }
}

/* Validate Login */
export function* validateLoginSaga(action) {
    try {
        const items = yield select(getItemAuth)

        let header = {
            Accept: 'application/json',
            contenttype: 'application/json',
            accesstoken: items?.loginToken,
        }

        // console.log(`header: ${JSON.stringify(header)}`)
        // console.log(`action.payload: ${JSON.stringify(action.payload)}`)

        let response = yield call(postApi, 'user/login-validate', action.payload, header)
        // console.log(`response: ${JSON.stringify(response)}`)

        if (response?.status == 200) {
            yield put(validateLoginSuccess(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(validateLoginFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        console.log('error -- ', error)
        yield put(validateLoginFailure(error))

        if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during login. Please try again later.', Colors.red)
        }
    }
}


/* ForgotPassword */
export function* forgotPasswordSaga(action) {
    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
    }

    try {
        let response = yield call(postApi, 'user/forgotpassword', action.payload, header)

        if (response?.status == 200) {
            yield put(forgotPasswordSuccess(response?.data?.data))

            yield put(setForgotPasswordToken(response?.data?.token))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(forgotPasswordFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        yield put(forgotPasswordFailure(error))
        console.log('error -- ', error)

        if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during login. Please try again later.', Colors.red)
        }
    }
}

/* Validate OTP */
export function* validateOTPSaga(action) {
    const items = yield select(getItemAuth)

    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.forgotPasswordToken,
    }

    try {
        let response = yield call(postApi, 'user/validate-otp', action.payload, header)
        if (response?.status == 200) {
            yield put(validateOTPSuccess(response?.data?.data))

            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(validateOTPFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        yield put(validateOTPFailure(error))
        console.log('error -- ', error)

        if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during login. Please try again later.', Colors.red)
        }
    }
}

/* Update Password */
export function* updatePasswordSaga(action) {
    const items = yield select(getItemAuth)

    let header = {
        Accept: 'application/json',
        contenttype: 'application/json',
        accesstoken: items?.forgotPasswordToken,
    }

    try {
        let response = yield call(postApi, 'user/updatepassword', action.payload, header)

        if (response?.status == 200) {
            yield put(updatePasswordSuccess(response?.data))

            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(updatePasswordFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        yield put(updatePasswordFailure(error))
        console.log('error -- ', error)

        if (error.response && error.response.data && error.response.data.message) {
            showErrorAlert(error.response.data.message, Colors.red)
        } else {
            showErrorAlert('An error occurred during login. Please try again later.', Colors.red)
        }
    }
}


/* Token */
export function* logoutSaga(action) {
    try {
        yield AsyncStorage.removeItem(constants.TOKEN)
        yield put(logoutSuccess())
        yield put(getUserDetailsSuccess({}))
    } catch (error) {
        yield put(logoutFailure())
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('Auth/getToken', getTokenSaga)
    })(),
    (function* () {
        yield takeLatest('Auth/registerRequest', registerSaga)
    })(),
    (function* () {
        yield takeLatest('Auth/verifyRequest', verifySaga)
    })(),

    (function* () {
        yield takeLatest('Auth/loginRequest', loginSaga)
    })(),
    (function* () {
        yield takeLatest('Auth/validateLoginRequest', validateLoginSaga)
    })(),

    (function* () {
        yield takeLatest('Auth/forgotPasswordRequest', forgotPasswordSaga)
    })(),
    (function* () {
        yield takeLatest('Auth/validateOTPRequest', validateOTPSaga)
    })(),
    (function* () {
        yield takeLatest('Auth/updatePasswordRequest', updatePasswordSaga)
    })(),

    (function* () {
        yield takeLatest('Auth/logoutRequest', logoutSaga)
    })(),
]

export default watchFunction