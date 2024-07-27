import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    productsData: [],
    allProducts: [],
    error: '',
}

const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        /* Fetch All Products */
        productsRequest(state, action) {
            state.status = action.type
        },
        productsSuccess(state, action) {
            state.productsData = action.payload?.data
            state.allProducts = action.payload
            state.status = action.type
        },
        productsFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },
    },
})

export const {
    /* Fetch All Products */
    productsRequest,
    productsSuccess,
    productsFailure,
} = ProductSlice.actions

export default ProductSlice.reducer