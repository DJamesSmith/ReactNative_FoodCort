import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    // Fetch Cart Items,
    getAllCartItemsSuccess,
    getAllCartItemsFailure,

    // Post Cart Item,
    postCartItemSuccess,
    postCartItemFailure,

    // Delete Cart Item,
    deleteCartItemSuccess,
    deleteCartItemFailure,
} from '../reducers/CartReducer'
import { deleteApi, getApi, postApi, putApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'
import { Colors } from '../../themes/Colors'

let getItemAuth = state => state.AuthReducer

const getHeaders = token => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    accesstoken: token,
})

/* Get All Cart Items */
export function* getAllCartItemsSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(getApi, `user/cart`, headers)

        if (response.status === 200) {
            yield put(getAllCartItemsSuccess(response?.data?.cart))
        } else {
            yield put(getAllCartItemsFailure(response?.data?.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getAllCartItemsFailure('No Cart Items found'))
        } else {
            yield put(getAllCartItemsFailure('An error occurred while fetching all Cart Items'))
        }
    }
}

/* Add Cart Item */
export function* postCartItemSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const { productId } = action.payload
        const response = yield call(postApi, `user/cart/${productId}`, {}, headers)

        if (response.status === 200 && response?.data?.success) {
            yield put(postCartItemSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(postCartItemFailure(response?.data?.message))
            showErrorAlert(response?.data?.message)
        }
    } catch (error) {
        yield put(postCartItemFailure('An error occurred while adding a product to the Cart.'))
        showErrorAlert(`An error occurred while adding a product to the Cart.`, Colors.red)
    }
}

/* Remove Cart Item */
export function* deleteCartItemSaga(action) {
    try {
        const { productId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(deleteApi, `user/cart/${productId}`, headers)

        if (response.status === 200) {
            yield put(deleteCartItemSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.red)
        } else {
            yield put(deleteCartItemFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(deleteCartItemFailure('Could not find the product.'))
        } else {
            yield put(deleteCartItemFailure('An error occurred while removing a Cart Item.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('MyCart/getAllCartItemsRequest', getAllCartItemsSaga)
    })(),
    (function* () {
        yield takeLatest('MyCart/postCartItemRequest', postCartItemSaga)
    })(),
    (function* () {
        yield takeLatest('MyCart/deleteCartItemRequest', deleteCartItemSaga)
    })(),
]

export default watchFunction