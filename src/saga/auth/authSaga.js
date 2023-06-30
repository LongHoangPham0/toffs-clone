import { ServiceData } from "../../config/constants"
import history from "../../history"
import * as AuthService from '../../apis/auth/auth'
import * as AuthC4Service from '../../apis/c4/auth'
import { takeLatest } from "redux-saga/effects"
import { GET_ME } from "../../actions/c4/common/actionType"
import { saveLocalStorage, saveToken } from "../../Utils/Token"
import { GetCurrentLanguage } from "../../Utils/Path"
import { LOGIN_AUTH, LOGIN_AUTH_ERROR } from "../../actions/auth/common/actionType"

function* loginAuth(action) {
  try {
    const data = yield AuthService.Login(action.data)
    saveToken(data.data)
    saveLocalStorage(data.data)
    yield put(push({
      pathname: `/${GetCurrentLanguage()}/${ServiceData.all}/service`
    }))
  } catch (error) {
    if (error?.response) {
      const {status, data} = error?.response
      if (status === 403 && _.isEmpty(action.data?.MfaToken)) {
        return yield put(push({
          pathname: "/two-factor-auth",
          search: queryString.stringify({
            id: data.mfa_token,
            OtpType: data.OtpType
          })
        }))
      }
    }

    yield put({
      type: LOGIN_AUTH_ERROR,
      error: "incorrect_login"
    })
  }
}
function* getMe() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let location = history.location
    let data = null;
    let type = ServiceData.c4
    if (location.pathname.indexOf(`/${ServiceData.dns}/`) >= 0) {
      type = ServiceData.dns;
    }
    data = yield AuthC4Service.getMe();
    data = data.data;
    saveLocalStorage(type, data.data);
    yield put({
      type: GET_ME_SUCCESS,
      data: data.data
    })
  } catch (err) {

  }
}

export function* watchLogin() {
  yield takeLatest(LOGIN_AUTH, loginAuth)
}

export function* getMe() {
  yield takeLatest(GET_ME, getMe)
}