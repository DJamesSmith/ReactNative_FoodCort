import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    allAddresses: [],
    error: '',
    address: {},
}

const AddressSlice = createSlice({
    name: 'Address',
    initialState,
    reducers: {
        // Fetch All Addresses
        getAllAddressRequest(state, action) {
            state.status = action.type
        },
        getAllAddressSuccess(state, action) {
            state.status = action.type
            state.allAddresses = action.payload
        },
        getAllAddressFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Post Address
        postNewAddressRequest(state, action) {
            state.status = action.type
        },
        postNewAddressSuccess(state, action) {
            state.status = action.type
            state.address = action.payload
        },
        postNewAddressFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Update Address
        updateAddressRequest(state, action) {
            state.status = action.type
        },
        updateAddressSuccess(state, action) {
            state.status = action.type
            state.address = action.payload
        },
        updateAddressFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Delete Address
        deleteAddressRequest(state, action) {
            state.status = action.type
        },
        deleteAddressSuccess(state, action) {
            state.status = action.type
            state.address = action.payload
        },
        deleteAddressFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },

        // isDefault Address
        defaultAddressRequest(state, action) {
            state.status = action.type
        },
        defaultAddressSuccess(state, action) {
            state.status = action.type
            state.address = action.payload
        },
        defaultAddressFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch Addresses
    getAllAddressRequest,
    getAllAddressSuccess,
    getAllAddressFailure,

    // Post Address
    postNewAddressRequest,
    postNewAddressSuccess,
    postNewAddressFailure,

    // Update Address
    updateAddressRequest,
    updateAddressSuccess,
    updateAddressFailure,

    // Delete Address
    deleteAddressRequest,
    deleteAddressSuccess,
    deleteAddressFailure,

    // isDefault Address
    defaultAddressRequest,
    defaultAddressSuccess,
    defaultAddressFailure,

} = AddressSlice.actions

export default AddressSlice.reducer