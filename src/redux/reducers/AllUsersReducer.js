import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    allUsers: [],
    error: '',
}

const AllUsersSlice = createSlice({
    name: 'AllUsers',
    initialState,
    reducers: {
        // Fetch All Users
        getAllUsersRequest(state, action) {
            state.status = action.type
        },
        getAllUsersSuccess(state, action) {
            state.status = action.type
            state.allUsers = action.payload
        },
        getAllUsersFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch All Users
    getAllUsersRequest,
    getAllUsersSuccess,
    getAllUsersFailure,
} = AllUsersSlice.actions

export default AllUsersSlice.reducer