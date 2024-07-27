import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    extraIngredients: [],
    error: '',
    message: ''
}

const ExtraIngredientSlice = createSlice({
    name: 'ExtraIngredient',
    initialState,
    reducers: {
        // Fetch Extra Ingredients
        getExtraIngredientRequest(state, action) {
            state.status = action.type
        },
        getExtraIngredientSuccess(state, action) {
            state.status = action.type
            state.extraIngredients = action.payload
            state.message = action.payload
        },
        getExtraIngredientFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch Extra Ingredients
    getExtraIngredientRequest,
    getExtraIngredientSuccess,
    getExtraIngredientFailure,
} = ExtraIngredientSlice.actions

export default ExtraIngredientSlice.reducer