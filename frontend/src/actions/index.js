import * as ACTIONS from '../constants/actions.js';

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