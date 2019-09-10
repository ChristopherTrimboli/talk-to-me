import Immutable from 'immutable'

export const userDataSchema = {
    loggedIn: false,
    id: null,
    email: '',
    firstName: '',
    lastName: '',
    gender: null,
    birthday: null,
    location: null
}

export default Immutable.fromJS({
    navDrawer: false,
    loginDialog: {
        visible: false
    },
    registerDialog: {
        visible: false
    },
    userData: userDataSchema,
    snackbar: {
        open: false,
        variant: '',
        message: ''
    }
})