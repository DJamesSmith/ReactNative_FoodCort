import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    allCartItems: [],
    error: '',
    cartItem: {},
}

const MyCartSlice = createSlice({
    name: 'MyCart',
    initialState,
    reducers: {
        // Fetch All Cart Items
        getAllCartItemsRequest(state, action) {
            state.status = action.type
        },
        getAllCartItemsSuccess(state, action) {
            state.status = action.type
            state.allCartItems = action.payload
        },
        getAllCartItemsFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Add Cart Item
        postCartItemRequest(state, action) {
            state.status = action.type
        },
        postCartItemSuccess(state, action) {
            state.status = action.type
            state.cartItem = action.payload
        },
        postCartItemFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Delete Cart Item
        deleteCartItemRequest(state, action) {
            state.status = action.type
        },
        deleteCartItemSuccess(state, action) {
            state.status = action.type
            state.cartItem = action.payload
        },
        deleteCartItemFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch Cart Items
    getAllCartItemsRequest,
    getAllCartItemsSuccess,
    getAllCartItemsFailure,

    // Post Cart Item
    postCartItemRequest,
    postCartItemSuccess,
    postCartItemFailure,

    // Delete Cart Item
    deleteCartItemRequest,
    deleteCartItemSuccess,
    deleteCartItemFailure,

} = MyCartSlice.actions

export default MyCartSlice.reducer