import { createSelector } from "reselect"

const sidebarShow = state => state.reducer.uiMenuReducer
export const getSidebarShowSelector = createSelector(sidebarShow, data => data)

const notification = (state) => state.reducer.notificationReducer
export const getNotificationSelector = createSelector(notification, data => data)