import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    categoryData: {},
    error: '',
}

const CategorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {
        /* Fetch All Categories */
        categoryRequest(state, action) {
            state.status = action.type
        },
        categorySuccess(state, action) {
            state.categoryData = action.payload
            state.status = action.type
        },
        categoryFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },
    },
})

export const {
    /* Fetch All Categories */
    categoryRequest,
    categorySuccess,
    categoryFailure,
} = CategorySlice.actions

export default CategorySlice.reducer