import { call, put, select, takeLatest } from 'redux-saga/effects'
import { categorySuccess, categoryFailure, } from '../reducers/CategoryReducer'
import { getApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'

/* All Categories */
export function* categorySaga(action) {
    let header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }

    // console.log(`CategorySagaPayload: ${JSON.stringify(action.payload)}`)

    try {
        let response = yield call(getApi, `category`, header)

        // console.log(`CategorySagaResponse: ${JSON.stringify(response.data)}`)
        // console.log('CategoryResponse:', response)

        if (response?.status == 200) {
            yield put(categorySuccess(response?.data?.displayCategoryData))

            // showErrorAlert(`All Categories successfully fetched.`, Colors.blue)
        } else {
            yield put(categoryFailure(response?.data?.data))
            showErrorAlert(response?.data?.message, Colors.red)
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(categoryFailure('No Categories found'))
        } else {
            yield put(categoryFailure('An error occurred while fetching Food Categories.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('Category/categoryRequest', categorySaga)
    })(),
]

export default watchFunction