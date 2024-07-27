import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: '',
    loading: true,

    token: null,
    loginToken: null,
    forgotPasswordToken: null,

    registerRes: {},
    verifyRes: {},

    loginRes: {},
    validateLoginRes: {},

    forgotPasswordRes: {},
    validateOTPRes: {},
    updatePasswordRes: {},

    error: '',
}

const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        /* Token */
        getToken(state, action) {
            state.status = action.type
        },
        setToken(state, action) {
            state.token = action.payload
            state.status = action.type
            state.loading = false
        },


        // LoginToken
        setLoginToken(state, action) {
            state.loginToken = action.payload
            state.status = action.type
        },


        // ForgotPasswordToken
        setForgotPasswordToken(state, action) {
            state.forgotPasswordToken = action.payload
            state.status = action.type
        },


        /* Register */
        registerRequest(state, action) {
            state.status = action.type
        },
        registerSuccess(state, action) {
            state.registerRes = action.payload?.message
            state.status = action.type
        },
        registerFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },


        /* Verify */
        verifyRequest(state, action) {
            state.status = action.type
        },
        verifySuccess(state, action) {
            state.verifyRes = action.payload?.data
            state.status = action.type
        },
        verifyFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },


        /* Login */
        loginRequest(state, action) {
            state.status = action.type
        },
        loginSuccess(state, action) {
            state.loginRes = action.payload?.data
            state.status = action.type
        },
        loginFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },

        /* Validate Login */
        validateLoginRequest(state, action) {
            state.status = action.type
        },
        validateLoginSuccess(state, action) {
            state.validateLoginRes = action.payload
            state.status = action.type
        },
        validateLoginFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },


        // Forgot Password
        forgotPasswordRequest(state, action) {
            state.status = action.type
        },
        forgotPasswordSuccess(state, action) {
            state.forgotPasswordRes = action.payload
            state.status = action.type
        },
        forgotPasswordFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },

        // Validate OTP
        validateOTPRequest(state, action) {
            state.status = action.type
        },
        validateOTPSuccess(state, action) {
            state.validateOTPRes = action.payload
            state.status = action.type
        },
        validateOTPFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },

        // Update Password
        updatePasswordRequest(state, action) {
            state.status = action.type
        },
        updatePasswordSuccess(state, action) {
            state.updatePasswordRes = action.payload
            state.status = action.type
        },
        updatePasswordFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },


        /* Logout */
        logoutRequest(state, action) {
            state.status = action.type
        },
        logoutSuccess(state, action) {
            state.token = null
            state.status = action.type
        },
        logoutFailure(state, action) {
            state.error = action.error
            state.status = action.type
        },
    },
})

export const {
    /* Token */
    getToken,
    setToken,

    /* loginToken */
    setLoginToken,

    /* ForgotPasswordToken */
    setForgotPasswordToken,


    /* Register */
    registerRequest,
    registerSuccess,
    registerFailure,

    /* Verify Registration*/
    verifyRequest,
    verifySuccess,
    verifyFailure,


    /* Login */
    loginRequest,
    loginSuccess,
    loginFailure,

    /* Login Validate */
    validateLoginRequest,
    validateLoginSuccess,
    validateLoginFailure,


    // Forgot Password
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFailure,

    // Validate OTP
    validateOTPRequest,
    validateOTPSuccess,
    validateOTPFailure,

    // Update Password
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailure,


    /* Logout */
    logoutRequest,
    logoutSuccess,
    logoutFailure,
} = AuthSlice.actions

export default AuthSlice.reducer