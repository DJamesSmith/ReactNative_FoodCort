import { Tuple, configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'

import RootSaga from '../saga/RootSaga'
import AuthReducer from '../reducers/AuthReducer'
import UserReducer from '../reducers/UserReducer'
import ProductReducer from '../reducers/ProductReducer'

let sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        AuthReducer: AuthReducer,
        UserReducer: UserReducer,
        // ProductReducer: ProductReducer,
    },
    middleware: (getDefaultMiddleware) => new Tuple(sagaMiddleware, logger)
})

sagaMiddleware.run(RootSaga)
export default store