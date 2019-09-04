import * as ACTIONS from '../constants/actions.js';
import {API_URL, API_PORT} from '../constants/enviroment.js';

export const postData = (data, endpoint) => {
    return dispatch => {
        try{
            fetch(API_URL + ':' + API_PORT + endpoint, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
                return response.json()
            }).then((json) => {
                console.log(json)
            })
        }
        catch(error){
            console.log(error);
        }
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

export const submitLogin = (email, password) => {
    return function(dispatch){
        const data = {
            email,
            password
        }
        dispatch(postData(data, '/login'))
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

export const submitRegister = (email, password, firstName, lastName) => {
    return function(dispatch){
        const data = {
            email,
            password,
            firstName,
            lastName
        }
        dispatch(postData(data, '/register'))
    }
}