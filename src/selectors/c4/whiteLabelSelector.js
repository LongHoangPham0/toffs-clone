import { createSelector } from "reselect";

const whiteLabel = state => state.reducer.whiteLabelReducer
export const whiteLabelSelector = createSelector(whiteLabel, (data) => data)
