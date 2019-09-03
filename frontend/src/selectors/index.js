import { createStructuredSelector, createSelector } from "reselect";
import { getNavDrawer, getLoginDialog, getRegisterDialog } from "../getters";

export const navDrawer = createSelector(
    [getNavDrawer],
    (navDrawer) => {
        return navDrawer;
    }
)

export const loginDialog = createSelector(
    [getLoginDialog],
    (loginDialog) => {
        return loginDialog;
    }
)

export const registerDialog = createSelector(
    [getRegisterDialog],
    (registerDialog) => {
        return registerDialog;
    }
)

export default createStructuredSelector({
    navDrawer,
    loginDialog,
    registerDialog
})