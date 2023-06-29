import { all, fork } from "redux-saga/effects"
import { watchGetListOIDCPublic } from "../oidcSaga"

export default function* rootSagaAuth() {
  yield all([
    fork(watchGetListOIDCPublic)
  ])
}