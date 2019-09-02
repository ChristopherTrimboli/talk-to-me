const getter = (property) => {
    return state => state.getIn(property);
};

const navDrawerGetter = () => {
    return getter(['navDrawer'])
}

const loginDialogGetter = () => {
    return getter(['loginDialog'])
}

export const getNavDrawer = navDrawerGetter();
export const getLoginDialog = loginDialogGetter();