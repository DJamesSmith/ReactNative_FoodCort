import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    // Fetch Cart Items,
    getAllFavouriteItemsSuccess,
    getAllFavouriteItemsFailure,

    // Post Cart Item,
    postFavouriteItemSuccess,
    postFavouriteItemFailure,

    // Delete Cart Item,
    deleteFavouriteItemSuccess,
    deleteFavouriteItemFailure,
} from '../reducers/FavouriteReducer'
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
export function* getAllFavouriteItemsSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(getApi, `user/favorites`, headers)

        if (response.status === 200) {
            yield put(getAllFavouriteItemsSuccess(response?.data?.favorites))
        } else {
            yield put(getAllFavouriteItemsFailure(response?.data?.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getAllFavouriteItemsFailure('No Favourite Items found'))
        } else {
            yield put(getAllFavouriteItemsFailure('An error occurred while fetching all Favourite Items'))
        }
    }
}

/* Add Cart Item */
export function* postFavouriteItemSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const { productId } = action.payload
        const response = yield call(postApi, `user/favorites/${productId}`, {}, headers)

        if (response.status === 200 && response?.data?.success) {
            yield put(postFavouriteItemSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(postFavouriteItemFailure(response?.data?.message))
            showErrorAlert(response?.data?.message)
        }
    } catch (error) {
        yield put(postFavouriteItemFailure('An error occurred while adding a product to your Favourites List.'))
        showErrorAlert(`An error occurred while adding a product to your Favourites List.`, Colors.red)
    }
}

/* Remove Cart Item */
export function* deleteFavouriteItemSaga(action) {
    try {
        const { productId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(deleteApi, `user/favorites/${productId}`, headers)

        if (response.status === 200) {
            yield put(deleteFavouriteItemSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.red)
        } else {
            yield put(deleteFavouriteItemFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(deleteFavouriteItemFailure('Could not find the product.'))
        } else {
            yield put(deleteFavouriteItemFailure('An error occurred while removing an item from your Favourites List.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('Favourites/getAllFavouriteItemsRequest', getAllFavouriteItemsSaga)
    })(),
    (function* () {
        yield takeLatest('Favourites/postFavouriteItemRequest', postFavouriteItemSaga)
    })(),
    (function* () {
        yield takeLatest('Favourites/deleteFavouriteItemRequest', deleteFavouriteItemSaga)
    })(),
]

export default watchFunction