import * as ACTIONS from '../constants/actions.js';
import {API_URL, API_PORT} from '../constants/enviroment.js';
import history from '../history.js'
import jwt from 'jsonwebtoken'

export const postData = async (data, endpoint) => {
    try{
        data.token = localStorage.getItem('token');
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
    if(userData.id){
        userData.loggedIn = true;
    }
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
                localStorage.setItem('token', responseData.data.token);
                const token = jwt.decode(responseData.data.token);
                localStorage.setItem('tokenExpiration', token.exp);
                const userData = {
                    email: token.data.email,
                    id: token.data.id,
                    firstName: token.data.first_name,
                    lastName: token.data.last_name
                }
                dispatch(setUserData(userData))
                dispatch(setSnackbar(true, 'success', `Welcome ${userData.firstName || ''} ${userData.lastName || ''} :)`))
                history.push("/createProfile");
            }
            if(responseData.response.status === 500){
                dispatch(setSnackbar(true, 'error', 'Error Logging In :('))
            }
        })
    }
}

export const submitRegister = (email, password) => {
    return dispatch => {
        const data = {
            email,
            password
        }
        postData(data, '/register')
        .then(responseData => {
            if(responseData.response.status === 200){
                dispatch(toggleRegisterDialog())
                dispatch(setSnackbar(true, 'success', 'Registered :)'))
                setTimeout(() => {
                    dispatch(submitLogin(email, password))
                }, 1500)
            }
            if(responseData.response.status === 500){
                dispatch(setSnackbar(true, 'error', 'Error Registering :('))
            }
        })
    }
}

export const logout = () => {
    const emptyUser = {
        loggedIn: false,
        id: null,
        email: '',
        firstName: '',
        lastName: ''
    }
    return function(dispatch){
        localStorage.removeItem('token')
        dispatch(setUserData(emptyUser))
        dispatch(setSnackbar(true, 'info', 'Logged out... see you next time :/'))
        history.push('/')
    }
}

export const updateProfile = (userId, firstName, lastName) => {
    return dispatch => {
        const data = {
            userId,
            firstName,
            lastName
        }
        postData(data, '/updateProfile')
        .then(responseData => {
            if(responseData.response.status === 200){
                localStorage.setItem('token', responseData.data.token);
                const token = jwt.decode(responseData.data.token);
                const userData = {
                    email: token.data.email,
                    id: token.data.id,
                    firstName: token.data.first_name,
                    lastName: token.data.last_name
                }
                dispatch(setUserData(userData))
                dispatch(setSnackbar(true, 'success', 'Profile Updated! Welcome ' + userData.firstName + ' ' + userData.lastName + ' :)'))
            }
            if(responseData.response.status === 500){
                dispatch(setSnackbar(true, 'error', 'Error Updating Profile :('))
            }
        })
    }
}