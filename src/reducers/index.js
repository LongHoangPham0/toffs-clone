import { combineReducers } from "redux";
import ReducerC4 from "./c4/common";
import ReducerAuth from "./auth/common";
import ReducerUI from "./ui/common";

const Reducer = combineReducers({
  ...ReducerC4,
  ...ReducerAuth,
  ...ReducerUI
})

export default Reducer
