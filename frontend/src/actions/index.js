import * as ACTIONS from '../constants/actions.js';

export const postData = (data, endpoint) => {
    fetch('https://localhost:3001' + endpoint, {
        method: 'POST',
        body: data
    }).then((response) => {
        return response.json()
    }).then(json => {
        console.log(json)
    })
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