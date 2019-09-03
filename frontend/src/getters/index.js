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

export const getNavDrawer = navDrawerGetter();
export const getLoginDialog = loginDialogGetter();
export const getRegisterDialog = registerDialogGetter();