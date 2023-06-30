import { all, fork } from "redux-saga/effects"
import { watchGetListOIDCPublic } from "../oidcSaga"
import { watchGetMe } from "../../c4/authSaga"

export default function* rootSagaAuth() {
  yield all([
    fork(watchGetListOIDCPublic),
    fork(watchGetMe)
  ])
}