import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    allComments: {},
    allLikedComments: [],
    error: '',
    comment: {},
}

const CommentSlice = createSlice({
    name: 'Comment',
    initialState,
    reducers: {
        // Fetch All Comments
        getAllCommentsRequest(state, action) {
            state.status = action.type
        },
        getAllCommentsSuccess(state, action) {
            state.status = action.type
            state.allComments = action.payload
        },
        getAllCommentsFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Post Comment
        postNewCommentRequest(state, action) {
            state.status = action.type
        },
        postNewCommentSuccess(state, action) {
            state.status = action.type
            state.comment = action.payload
        },
        postNewCommentFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Update Comment
        updateCommentRequest(state, action) {
            state.status = action.type
        },
        updateCommentSuccess(state, action) {
            state.status = action.type
            state.comment = action.payload
        },
        updateCommentFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Delete Comment
        deleteCommentRequest(state, action) {
            state.status = action.type
        },
        deleteCommentSuccess(state, action) {
            state.status = action.type
            state.comment = action.payload
        },
        deleteCommentFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Get all Liked Comments
        getAllLikedCommentsRequest(state, action) {
            state.status = action.type
        },
        getAllLikedCommentsSuccess(state, action) {
            state.status = action.type
            state.allLikedComments = action.payload
        },
        getAllLikedCommentsFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Like a Comment
        patchLikeCommentRequest(state, action) {
            state.status = action.type
        },
        patchLikeCommentSuccess(state, action) {
            state.status = action.type
            state.allLikedComments.push(action.payload.commentId)
        },
        patchLikeCommentFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },


        // Unlike a Comment
        patchUnlikeCommentRequest(state, action) {
            state.status = action.type
        },
        patchUnlikeCommentSuccess(state, action) {
            state.status = action.type
            state.allLikedComments = state.allLikedComments.filter(id => id !== action.payload.commentId)
        },
        patchUnlikeCommentFailure(state, action) {
            state.status = action.type
            state.error = action.payload
        },
    },
})

export const {
    // Fetch Comment
    getAllCommentsRequest,
    getAllCommentsSuccess,
    getAllCommentsFailure,

    // Post Comment
    postNewCommentRequest,
    postNewCommentSuccess,
    postNewCommentFailure,

    // Update Comment
    updateCommentRequest,
    updateCommentSuccess,
    updateCommentFailure,

    // Delete Comment
    deleteCommentRequest,
    deleteCommentSuccess,
    deleteCommentFailure,

    // Get All Liked Comments
    getAllLikedCommentsRequest,
    getAllLikedCommentsSuccess,
    getAllLikedCommentsFailure,

    // Like a Comment
    patchLikeCommentRequest,
    patchLikeCommentSuccess,
    patchLikeCommentFailure,

    // Unlike a Comment
    patchUnlikeCommentRequest,
    patchUnlikeCommentSuccess,
    patchUnlikeCommentFailure,

} = CommentSlice.actions

export default CommentSlice.reducer