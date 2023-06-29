import { createSelector } from "reselect"

const auth = state => state.reducer.authReducer
export const getAuthSelector = createSelector(auth, (data) => data)

const loginAuth = state => state.reducer.loginAuthReducer
export const loginAuthSelector = createSelector(loginAuth, (data) => data)

const listOIDCPublic = state => state.reducer.listOIDCPublicReducer
export const listOIDCPublicSelector = createSelector(listOIDCPublic, (data) => data)