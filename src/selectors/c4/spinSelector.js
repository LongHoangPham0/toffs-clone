import { createSelector } from "reselect"

const notification = (state) => state.reducer.notificationReducer
export const getNotificationSelector = createSelector(notification, data => data)