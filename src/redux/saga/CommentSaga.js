import { call, put, select, takeLatest } from 'redux-saga/effects'
import {
    // Fetch Comment
    getAllCommentsSuccess,
    getAllCommentsFailure,

    // Post Comment
    postNewCommentSuccess,
    postNewCommentFailure,

    // Update Comment
    updateCommentSuccess,
    updateCommentFailure,

    // Delete Comment
    deleteCommentSuccess,
    deleteCommentFailure,

    // Get All Liked Comments
    getAllLikedCommentsSuccess,
    getAllLikedCommentsFailure,

    // Like a Comment
    patchLikeCommentSuccess,
    patchLikeCommentFailure,

    // Unlike a Comment
    patchUnlikeCommentSuccess,
    patchUnlikeCommentFailure,
} from '../reducers/CommentReducer'
import { deleteApi, getApi, patchApi, postApi, putApi } from '../../utils/helpers/ApiRequest'
import showErrorAlert from '../../utils/helpers/Toast'
import { Colors } from '../../themes/Colors'

let getItemAuth = state => state.AuthReducer

const getHeaders = token => ({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    accesstoken: token,
})

/* Get All Comments */
export function* getAllCommentsSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const { productId } = action.payload
        const response = yield call(getApi, `product/${productId}/comments`, headers)

        // console.log(`CommentsSagaResponse: ${JSON.stringify(response)}`)
        if (response.status === 200) {
            yield put(getAllCommentsSuccess(response?.data?.comments))
        } else {
            yield put(getAllCommentsFailure(response?.data?.message))
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getAllCommentsFailure('No comments found'))
        } else {
            yield put(getAllCommentsFailure('An error occurred while fetching all comments'))
        }
    }
}

/* Post New Comment */
export function* postNewCommentSaga(action) {
    try {
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(postApi, 'comment', action.payload, headers)

        // console.log(`CommentDetailsSagaResponse: ${JSON.stringify(response)}`)
        if (response.status === 201) {
            yield put(postNewCommentSuccess(response?.data?.comment))
            yield put(postNewCommentSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else {
            yield put(postNewCommentFailure(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.red)
        }

    } catch (error) {
        yield put(postNewCommentFailure('An error occurred while posting a new comment'))
    }
}

/* Update Comment */
export function* updateCommentSaga(action) {
    try {
        const { commentId, updatedCommentPayload } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(putApi, `comment/${commentId}`, updatedCommentPayload, headers)

        if (response.status === 200) {
            yield put(updateCommentSuccess(response?.data?.comment))
        } else {
            yield put(updateCommentFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(updateCommentFailure('Could not find details of Food item.'))
        } else {
            yield put(updateCommentFailure('An error occurred while updating your comment.'))
        }
    }
}

/* Delete Comment */
export function* deleteCommentSaga(action) {
    try {
        const { commentId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(deleteApi, `comment/${commentId}`, headers)

        if (response.status === 200) {
            yield put(deleteCommentSuccess(response?.data?.message))
            showErrorAlert(response?.data?.message, Colors.red)
        } else {
            yield put(deleteCommentFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(deleteCommentFailure('Could not find your comment.'))
        } else {
            yield put(deleteCommentFailure('An error occurred while removing your comment.'))
        }
    }
}

/* Get All Liked Comments */
export function* getAllLikedCommentSaga(action) {
    try {
        const { productId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(getApi, `product/${productId}/comments/liked`, headers)

        if (response.status === 200) {
            yield put(getAllLikedCommentsSuccess(response?.data?.likedComments))
        } else {
            yield put(getAllLikedCommentsFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(getAllLikedCommentsFailure('Could not fetch liked comments.'))
        } else {
            yield put(getAllLikedCommentsFailure('An error occurred while fetching liked comments.'))
        }
    }
}

/* Like a Comment */
export function* likeCommentSaga(action) {
    try {
        const { commentId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(patchApi, `comment/${commentId}/like`, {}, headers)

        if (response.status === 200 && response?.data?.success) {
            yield put(patchLikeCommentSuccess({ commentId }))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else if (response.status === 200 && !response?.data?.success) {
            yield put(patchLikeCommentFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(patchLikeCommentFailure('Could not like the comment.'))
        } else {
            yield put(patchLikeCommentFailure('An error occurred while liking a comment.'))
        }
    }
}

/* Unlike a Comment */
export function* UnlikeCommentSaga(action) {
    try {
        const { commentId } = action.payload
        const items = yield select(getItemAuth)
        const headers = getHeaders(items?.token)
        const response = yield call(patchApi, `comment/${commentId}/unlike`, {}, headers)

        if (response.status === 200 && response?.data?.success) {
            yield put(patchUnlikeCommentSuccess({ commentId }))
            showErrorAlert(response?.data?.message, Colors.blue)
        } else if (response.status === 200 && !response?.data?.success) {
            yield put(patchUnlikeCommentFailure(response?.data?.message))
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            yield put(patchUnlikeCommentFailure('Could not unlike the comment.'))
        } else {
            yield put(patchUnlikeCommentFailure('An error occurred while unliking a comment.'))
        }
    }
}

const watchFunction = [
    (function* () {
        yield takeLatest('Comment/getAllCommentsRequest', getAllCommentsSaga)
    })(),
    (function* () {
        yield takeLatest('Comment/postNewCommentRequest', postNewCommentSaga)
    })(),
    (function* () {
        yield takeLatest('Comment/updateCommentRequest', updateCommentSaga)
    })(),
    (function* () {
        yield takeLatest('Comment/deleteCommentRequest', deleteCommentSaga)
    })(),
    (function* () {
        yield takeLatest('Comment/getAllLikedCommentsRequest', getAllLikedCommentSaga)
    })(),
    (function* () {
        yield takeLatest('Comment/patchLikeCommentRequest', likeCommentSaga)
    })(),
    (function* () {
        yield takeLatest('Comment/patchUnlikeCommentRequest', UnlikeCommentSaga)
    })(),
]

export default watchFunction