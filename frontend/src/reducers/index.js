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
        default:
            return state;
    }
}