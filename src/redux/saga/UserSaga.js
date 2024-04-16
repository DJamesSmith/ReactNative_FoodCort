import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getUserDetailsFailure, getUserDetailsSuccess } from '../reducers/UserReducer'
import { getApi } from '../../utils/helpers/ApiRequest'

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

const watchFunction = [
    (function* () {
        yield takeLatest('User/getUserDetailsRequest', getUserDetailsSaga)
    })(),
]

export default watchFunction