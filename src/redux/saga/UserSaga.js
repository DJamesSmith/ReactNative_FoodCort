import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    getUserDetailsFailure,
    getUserDetailsSuccess,

    updateUserDetailsSuccess,
    updateUserDetailsFailure,

    changePasswordSuccess,
    changePasswordFailure,
} from '../reducers/UserReducer'
import { getApi, putApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'
import { Colors } from '../../themes/Colors'

let getItemAuth = state => state.AuthReducer

/* User Information */
export function* getUserDetailsSaga(action) {
    try {
        const items = yield select(getItemAuth)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            accesstoken: items?.token,
        }

        const response = yield call(getApi, 'user/profile-details', headers)

        // console.log(`UserDetailsSagaResponse: ${JSON.stringify(response)}`)
        if (response.status === 200) {
            yield put(getUserDetailsSuccess(response.data.userDetails))
        } else {
            yield put(getUserDetailsFailure(response.data.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getUserDetailsFailure('User profile not found'))
        } else {
            yield put(
                getUserDetailsFailure('An error occurred while fetching user profile'),
            )
        }
    }
}

/* Update User */
export function* updateUserDetailsSaga(action) {
    try {
        const { userData } = action.payload
        const items = yield select(getItemAuth)
        // console.log(`Saga_updateUserDetailsSagaToken: ${items?.token}`)

        const header = {
            Accept: 'application/json',
            contenttype: 'multipart/form-data',
            accesstoken: items?.token,
        }

        // console.log("updateUserDetailsSaga------------------>>>: ", action.payload)

        const response = yield call(putApi, `user/editprofile`, userData, header)
        // console.log(`Saga_ResponseUpdateUserDetails:`, JSON.stringify(response))

        if (response.status === 200) {
            yield put(updateUserDetailsSuccess(response?.data?.data))
        } else {
            yield put(updateUserDetailsFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(updateUserDetailsFailure('Could not find your details.'))
        } else {
            yield put(updateUserDetailsFailure('An error occurred while updating your details.'))
        }
    }
}

/* Change Password */
export function* changePasswordSaga(action) {
    try {
        const { passwordData } = action.payload
        const items = yield select(getItemAuth)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            accesstoken: items?.token,
        }

        const response = yield call(putApi, `user/change-password`, passwordData, headers)

        if (response.status === 200) {
            yield put(changePasswordSuccess(response?.data?.user))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(changePasswordFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            yield put(changePasswordFailure(error?.response?.data?.message))
            showErrorAlert(error?.response?.data?.message, Colors.red)
        } else {
            yield put(changePasswordFailure('An error occurred while updating your password.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('User/getUserDetailsRequest', getUserDetailsSaga)
    })(),
    (function* () {
        yield takeLatest('User/updateUserDetailsRequest', updateUserDetailsSaga)
    })(),
    (function* () {
        yield takeLatest('User/changePasswordRequest', changePasswordSaga)
    })(),
]

export default watchFunction