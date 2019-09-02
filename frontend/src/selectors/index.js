import { createStructuredSelector, createSelector } from "reselect";
import { getNavDrawer, getLoginDialog } from "../getters";

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

export default createStructuredSelector({
    navDrawer,
    loginDialog
})