import { call, put, select, takeLatest } from 'redux-saga/effects'
import { productsSuccess, productsFailure, } from '../reducers/ProductReducer'
import { getApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'

/* All Products */
export function* productsSaga(action) {
    let header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    // console.log(`ProductSagaPayload: ${JSON.stringify(action.payload)}`)

    try {
        const { page, perPage } = action.payload
        let response = yield call(getApi, `products?page=${page}&perPage=${perPage}`, header)

        // console.log(`SagaResponse: ${JSON.stringify(response?.data?.data)}`)
        // console.log('productsResponse:', response)

        if (response?.status == 200) {
            yield put(productsSuccess(response?.data))

            // showErrorAlert(`All Products successfully fetched.`)
        } else {
            yield put(productsFailure(response?.data?.data))
            showErrorAlert(response?.data?.message)
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(productsFailure('No Products found'))
        } else {
            yield put(productsFailure('An error occurred while fetching Food Products.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('Product/productsRequest', productsSaga)
    })(),
]

export default watchFunction