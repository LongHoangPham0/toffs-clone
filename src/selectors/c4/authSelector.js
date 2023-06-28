import { createSelector } from "reselect"

const loginAuth = state => state.reducer.loginAuthReducer
export const loginAuthSelector = createSelector(loginAuth, (data) => data)