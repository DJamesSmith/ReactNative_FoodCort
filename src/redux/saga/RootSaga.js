import { all } from 'redux-saga/effects'
import AuthSaga from './AuthSaga'
import UserSaga from './UserSaga'
import CategorySaga from './CategorySaga'
import ProductSaga from './ProductSaga'
import CartSaga from './CartSaga'
import FavouriteSaga from './FavouriteSaga'
import CommentSaga from './CommentSaga'
import AllUsersSaga from './AllUsersSaga'
import AddressSaga from './AddressSaga'
import ExtraIngredientsSaga from './ExtraIngredientsSaga'

const combinedSaga = [
    ...AuthSaga,
    ...UserSaga,
    ...CategorySaga,
    ...ProductSaga,
    ...CartSaga,
    ...FavouriteSaga,
    ...CommentSaga,
    ...AllUsersSaga,
    ...AddressSaga,
    ...ExtraIngredientsSaga,
]

export default function* RootSaga() {
    yield all(combinedSaga)
}