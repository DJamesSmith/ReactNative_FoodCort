import { all } from 'redux-saga/effects'
import AuthSaga from './AuthSaga'
import UserSaga from './UserSaga'
import ProductSaga from './ProductSaga'

const combinedSaga = [
    ...AuthSaga,
    ...UserSaga,
    // ...ProductSaga,
]

export default function* RootSaga() {
    yield all(combinedSaga)
}