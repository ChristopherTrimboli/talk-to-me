import { createStructuredSelector, createSelector } from "reselect";
import { getNavDrawer, getLoginDialog, getRegisterDialog, getUserData, getSnackbar, getUsers} from "../getters";

export const userData = createSelector(
    [getUserData],
    (userData) => {
        return JSON.parse(JSON.stringify(userData));
    }
)

export const snackbar = createSelector(
    [getSnackbar],
    (snackbar) => {
        return JSON.parse(JSON.stringify(snackbar));
    }
)

export const navDrawer = createSelector(
    [getNavDrawer],
    (navDrawer) => {
        return navDrawer;
    }
)

export const users = createSelector(
    [getUsers],
    (users) => {
        return JSON.parse(JSON.stringify(users));
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
    registerDialog,
    userData,
    snackbar,
    users
})