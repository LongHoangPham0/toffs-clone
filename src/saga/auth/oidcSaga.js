import { put, takeLatest } from 'redux-saga/effects'
import { GET_LIST_OIDC_PUBLIC, GET_LIST_OIDC_PUBLIC_ERROR, GET_LIST_OIDC_PUBLIC_SUCCESS } from '../../actions/auth/common/actionType'
import * as OIDCAuth from '../../apis/auth/oidc'

function* loginAuth(action) {
  try {
    const data = yield OIDCAuth.getListOIDCPublic()
    yield put({
      type: GET_LIST_OIDC_PUBLIC_SUCCESS,
      data: data.data
    })
  } catch (error) {
    yield put({
      type: GET_LIST_OIDC_PUBLIC_ERROR,
      data: "error"
    })
  }
}

export function* watchGetListOIDCPublic() {
  yield takeLatest(GET_LIST_OIDC_PUBLIC, loginAuth)
}