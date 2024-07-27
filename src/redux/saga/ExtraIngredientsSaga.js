import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    getExtraIngredientSuccess,
    getExtraIngredientFailure,
} from '../reducers/ExtraIngredientsReducer'
import { getApi } from '../../utils/helpers/ApiRequest'

/* User Information */
export function* getExtraIngredientSaga(action) {
    try {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const { productId } = action.payload
        const response = yield call(getApi, `product/${productId}/ingredients`, headers)

        if (response.status === 200 && response?.data?.success) {
            yield put(getExtraIngredientSuccess(response?.data?.ingredients))
        } else if (response.status === 200 && !response?.data?.success) {
            yield put(getExtraIngredientSuccess(response.data.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getExtraIngredientFailure('No Extra Ingredients data found'))
        } else {
            yield put(
                getExtraIngredientFailure('An error occurred while fetching the extra ingredients'),
            )
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('ExtraIngredient/getExtraIngredientRequest', getExtraIngredientSaga)
    })(),
]

export default watchFunction