import * as ACTIONS from '../constants/actions.js';
import {API_URL, API_PORT} from '../constants/enviroment.js';

export const postData = async (data, endpoint) => {
    try{
        const response = await fetch(API_URL + ':' + API_PORT + endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const json = await response.json()
        console.log(response);
        console.log(json);
        const responseData = {
            response: response,
            data: json
        }
        return(responseData)
    }
    catch(error){
        console.log(error);
    }
}

export const setSnackbar = (open, variant, message) => {
    const action = {
        type: ACTIONS.SET_SNACKBAR,
        open: open,
        variant: variant,
        message: message
    }
    return function(dispatch){
        dispatch(action)
    }
}

export const toggleNavDrawer = () => {
    const action = {
        type: ACTIONS.TOGGLE_NAV_DRAWER
    }
    return function(dispatch){
        dispatch(action)
    }
}

export const toggleLoginDialog = () => {
    const action = {
        type: ACTIONS.TOGGLE_LOGIN_DIALOG
    }
    return function(dispatch){
        dispatch(action)
    }
}

export const setUserData = (userData) => {
    const action = {
        type: ACTIONS.SET_USER_DATA,
        userData: userData
    }
    return function(dispatch){
        dispatch(action)
    }
}

export const toggleRegisterDialog = () => {
    const action = {
        type: ACTIONS.TOGGLE_REGISTER_DIALOG
    }
    return function(dispatch){
        dispatch(action)
    }
}

export const submitLogin = (email, password) => {
    return dispatch => {
        const data = {
            email,
            password
        }
        postData(data, '/login')
        .then(responseData => {
            if(responseData.response.status === 200){
                dispatch(toggleLoginDialog())
                dispatch(setUserData(responseData.data.user))
                dispatch(setSnackbar(true, 'success', 'Welcome ' + responseData.data.user.first_name + ' ' + responseData.data.user.last_name + ' :)'))
            }
            if(responseData.response.status === 500){
                dispatch(setSnackbar(true, 'error', 'Error Logging In :('))
            }
        })
    }
}

export const submitRegister = (email, password, firstName, lastName) => {
    return dispatch => {
        const data = {
            email,
            password,
            firstName,
            lastName
        }
        postData(data, '/register')
        .then(responseData => {
            if(responseData.response.status === 200){
                dispatch(toggleRegisterDialog())
                dispatch(setSnackbar(true, 'success', 'Registered :)'))
            }
            if(responseData.response.status === 500){
                dispatch(setSnackbar(true, 'error', 'Error Registering :('))
            }
        })
    }
}