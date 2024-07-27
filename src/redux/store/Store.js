import { Tuple, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'

import RootSaga from '../saga/RootSaga'
import AuthReducer from '../reducers/AuthReducer'
import UserReducer from '../reducers/UserReducer'
import CategoryReducer from '../reducers/CategoryReducer'
import ProductReducer from '../reducers/ProductReducer'
import CartReducer from '../reducers/CartReducer'
import FavouriteReducer from '../reducers/FavouriteReducer'
import CommentReducer from '../reducers/CommentReducer'
import AllUsersReducer from '../reducers/AllUsersReducer'
import AddressReducer from '../reducers/AddressReducer'
import ExtraIngredientsReducer from '../reducers/ExtraIngredientsReducer'

let sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        AuthReducer: AuthReducer,
        UserReducer: UserReducer,
        CategoryReducer: CategoryReducer,
        ProductReducer: ProductReducer,
        CartReducer: CartReducer,
        FavouriteReducer: FavouriteReducer,
        CommentReducer: CommentReducer,
        AllUsersReducer: AllUsersReducer,
        AddressReducer: AddressReducer,
        ExtraIngredientsReducer: ExtraIngredientsReducer,

    },
    middleware: (getDefaultMiddleware) => new Tuple(sagaMiddleware, logger)
    // middleware: (getDefaultMiddleware) => new Tuple(sagaMiddleware)          // Remove "logger" due to use of binary data for images for visibility of other data present.
})

sagaMiddleware.run(RootSaga)
export default store