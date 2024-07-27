import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    userInfo: {},
    error: '',
    userResponse: '',
}

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        // Fetch User Details
        getUserDetailsRequest(state, action) {
            state.status = action.type
        },
        getUserDetailsSuccess(state, action) {
            state.status = action.type
            state.userInfo = action.payload
        },
        getUserDetailsFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },

        // Update User Details
        updateUserDetailsRequest(state, action) {
            state.status = action.type
        },
        updateUserDetailsSuccess(state, action) {
            state.status = action.type
            state.userResponse = action.payload
        },
        updateUserDetailsFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Change Password
        changePasswordRequest(state, action) {
            state.status = action.type
        },
        changePasswordSuccess(state, action) {
            state.status = action.type
            state.userResponse = action.payload
        },
        changePasswordFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch User Details
    getUserDetailsRequest,
    getUserDetailsSuccess,
    getUserDetailsFailure,

    // Update User Details
    updateUserDetailsRequest,
    updateUserDetailsSuccess,
    updateUserDetailsFailure,

    // Change Password
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,
} = UserSlice.actions

export default UserSlice.reducer