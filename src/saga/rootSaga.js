import { all, fork } from "redux-saga/effects"
import sagaC4 from "./c4/common/saga"

export default function* rootSaga() {
  yield all([
    fork(sagaC4)
  ])
}
