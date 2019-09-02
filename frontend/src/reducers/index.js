import * as ACTIONS from '../constants/actions.js';
import defaultState from './defaultState'

export default (state = defaultState, action) => {
    switch (action.type) {
        case ACTIONS.TOGGLE_NAV_DRAWER:
            return state.setIn(['navDrawer'], !state.getIn(['navDrawer']));
        case ACTIONS.TOGGLE_LOGIN_DIALOG:
                return state.setIn(['loginDialog'], !state.getIn(['loginDialog']));
        default:
            return state;
    }
}