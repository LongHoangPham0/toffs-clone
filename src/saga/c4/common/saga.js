import { all, fork } from "redux-saga/effects";
import { watchGetWhitelabel } from "../whiteLabelSaga";

export default function* sagaC4() {
  yield all([
    fork(watchGetWhitelabel)
  ])
}