import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    // Fetch Addresses
    getAllAddressSuccess,
    getAllAddressFailure,

    // Post Address
    postNewAddressSuccess,
    postNewAddressFailure,

    // Update Address
    updateAddressSuccess,
    updateAddressFailure,

    // Delete Address
    deleteAddressSuccess,
    deleteAddressFailure,

    // isDefault Address
    defaultAddressSuccess,
    defaultAddressFailure,
} from '../reducers/AddressReducer'
import { deleteApi, getApi, patchApi, postApi, putApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'
import { Colors } from '../../themes/Colors'

let getItemAuth = state => state.AuthReducer

const getHeaders = token => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    accesstoken: token,
})

/* Get All Addresses */
export function* getAllAddressesSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(getApi, `user/addresses`, headers)

        if (response.status === 200) {
            yield put(getAllAddressSuccess(response?.data?.addresses))
        } else {
            yield put(getAllAddressFailure(response?.data?.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getAllAddressFailure('No addresses found'))
        } else {
            yield put(getAllAddressFailure('An error occurred while fetching all addresses'))
        }
    }
}

/* Post New Address */
export function* postNewAddressSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(postApi, 'user/create-address', action.payload, headers)

        if (response.status === 201) {
            yield put(postNewAddressSuccess(response?.data?.address))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(postNewAddressFailure(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.red)
        }

    } catch (error) {
        let errorMessage = 'An error occurred while adding the address'
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message
        }
        yield put(postNewAddressFailure(errorMessage))
        showErrorAlert(errorMessage, Colors.red)
    }
}

/* Update Address */
export function* updateAddressSaga(action) {
    try {
        const { addressId, updatedAddressPayload } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(putApi, `user/address/${addressId}`, updatedAddressPayload, headers)

        if (response.status === 200) {
            yield put(updateAddressSuccess(response?.data))
        } else {
            yield put(updateAddressFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(updateAddressFailure(`Could not find details of user's address.`))
        } else {
            yield put(updateAddressFailure('An error occurred while updating your address.'))
        }
    }
}

/* Delete Address */
export function* deleteAddressSaga(action) {
    try {
        const { addressId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(deleteApi, `user/address/${addressId}`, headers)

        if (response.status === 200) {
            yield put(deleteAddressSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.red)
        } else {
            yield put(deleteAddressFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(deleteAddressFailure('Could not find your address.'))
        } else {
            yield put(deleteAddressFailure('An error occurred while removing your address.'))
        }
    }
}

/* isDefault Address */
export function* defaultAddressSaga(action) {
    try {
        const { addressId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(patchApi, `user/address/${addressId}/default`, {}, headers)

        if (response.status === 200) {
            yield put(defaultAddressSuccess(response?.data?.defaultAddress))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(defaultAddressFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(defaultAddressFailure(`Could not find details of User's address.`))
        } else {
            yield put(defaultAddressFailure('An error occurred while setting your address to default.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('Address/getAllAddressRequest', getAllAddressesSaga)
    })(),
    (function* () {
        yield takeLatest('Address/postNewAddressRequest', postNewAddressSaga)
    })(),
    (function* () {
        yield takeLatest('Address/updateAddressRequest', updateAddressSaga)
    })(),
    (function* () {
        yield takeLatest('Address/deleteAddressRequest', deleteAddressSaga)
    })(),
    (function* () {
        yield takeLatest('Address/defaultAddressRequest', defaultAddressSaga)
    })()
]

export default watchFunction