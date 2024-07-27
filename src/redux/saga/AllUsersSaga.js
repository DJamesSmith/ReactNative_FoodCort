import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    // Fetch All Users
    getAllUsersSuccess,
    getAllUsersFailure,
} from '../reducers/AllUsersReducer'
import { getApi, postApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'
import { Colors } from '../../themes/Colors'

/* Get All Users */
export function* getAllUsersSaga(action) {
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const response = yield call(getApi, `allusers`, headers)

        // console.log(`AllUsersSagaResponse: ${JSON.stringify(response)}`)
        if (response.status === 200) {
            yield put(getAllUsersSuccess(response?.data?.displaydata))
        } else {
            yield put(getAllUsersFailure(response?.data?.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getAllUsersFailure('No Users found'))
        } else {
            yield put(getAllUsersFailure('An error occurred while fetching all Users'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('AllUsers/getAllUsersRequest', getAllUsersSaga)
    })(),
]

export default watchFunction