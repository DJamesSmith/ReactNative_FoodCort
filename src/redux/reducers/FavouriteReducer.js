import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    allFavouriteItems: [],
    error: '',
    favouriteItem: {},
}

const FavouriteSlice = createSlice({
    name: 'Favourites',
    initialState,
    reducers: {
        // Fetch All Favourite Items
        getAllFavouriteItemsRequest(state, action) {
            state.status = action.type
        },
        getAllFavouriteItemsSuccess(state, action) {
            state.status = action.type
            state.allFavouriteItems = action.payload
        },
        getAllFavouriteItemsFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Add Favourite Item
        postFavouriteItemRequest(state, action) {
            state.status = action.type
        },
        postFavouriteItemSuccess(state, action) {
            state.status = action.type
            state.favouriteItem = action.payload
        },
        postFavouriteItemFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Delete Favourite Item
        deleteFavouriteItemRequest(state, action) {
            state.status = action.type
        },
        deleteFavouriteItemSuccess(state, action) {
            state.status = action.type
            state.favouriteItem = action.payload
        },
        deleteFavouriteItemFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch Favourite Items
    getAllFavouriteItemsRequest,
    getAllFavouriteItemsSuccess,
    getAllFavouriteItemsFailure,

    // Post Favourite Item
    postFavouriteItemRequest,
    postFavouriteItemSuccess,
    postFavouriteItemFailure,

    // Delete Favourite Item
    deleteFavouriteItemRequest,
    deleteFavouriteItemSuccess,
    deleteFavouriteItemFailure,

} = FavouriteSlice.actions

export default FavouriteSlice.reducer