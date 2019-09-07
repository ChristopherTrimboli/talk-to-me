import Immutable from 'immutable'

export default Immutable.fromJS({
    navDrawer: false,
    loginDialog: {
        visible: false
    },
    registerDialog: {
        visible: false
    },
    userData: {
        loggedIn: false,
        email: '',
        firstName: '',
        lastName: ''
    }
})