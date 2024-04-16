import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: '',
    userInfo: {},
    error: '',
}

const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
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
    },
})

export const {
    getUserDetailsRequest,
    getUserDetailsSuccess,
    getUserDetailsFailure,
} = UserSlice.actions

export default UserSlice.reducer