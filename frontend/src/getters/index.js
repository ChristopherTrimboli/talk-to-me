const getter = (property) => {
    return state => state.getIn(property);
};

const navDrawerGetter = () => {
    return getter(['navDrawer'])
}

const loginDialogGetter = () => {
    return getter(['loginDialog', 'visible'])
}

const registerDialogGetter = () => {
    return getter(['registerDialog', 'visible'])
}

const userDataGetter = () => {
    return getter(['userData'])
}

const snackbarGetter = () => {
    return getter(['snackbar'])
}

export const getNavDrawer = navDrawerGetter();
export const getLoginDialog = loginDialogGetter();
export const getRegisterDialog = registerDialogGetter();
export const getUserData = userDataGetter();
export const getSnackbar = snackbarGetter();