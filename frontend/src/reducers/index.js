import * as ACTIONS from '../constants/actions.js';
import defaultState from './defaultState'

export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_NAV_DRAWER:
            return state.setIn(['navDrawer'], !state.getIn(['navDrawer']));
        case ACTIONS.TOGGLE_LOGIN_DIALOG:
            return state.setIn(['loginDialog', 'visible'], !state.getIn(['loginDialog', 'visible']));
        case ACTIONS.TOGGLE_REGISTER_DIALOG:
            return state.setIn(['registerDialog', 'visible'], !state.getIn(['registerDialog', 'visible']));
        case ACTIONS.SET_USER_DATA:
            state = state.setIn(['userData', 'loggedIn'], true);
            state = state.setIn(['userData', 'email'], action.userData.email);
            state = state.setIn(['userData', 'firstName'], action.userData.first_name);
            state = state.setIn(['userData', 'lastName'], action.userData.last_name);
            return state;
        case ACTIONS.SET_SNACKBAR:
            state = state.setIn(['snackbar', 'open'], action.open);
            state = state.setIn(['snackbar', 'variant'], action.variant);
            state = state.setIn(['snackbar', 'message'], action.message);
            return state;
        default:
            return state;
    }
}