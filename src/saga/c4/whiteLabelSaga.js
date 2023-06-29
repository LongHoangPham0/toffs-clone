import {
  put,
  takeLatest
} from 'redux-saga/effects'
import * as WhiteLabelService from '../../apis/c4/whitelabel'
import { GET_WHITELABEL, GET_WHITELABEL_SUCCESS } from '../../actions/c4/common/actionType'

function* getWhiteLabel(action) {
  try {
    const data = yield WhiteLabelService.getWhiteLabel(action.data)
    yield put({
      type: GET_WHITELABEL_SUCCESS,
      data: data.data.data
    })
  } catch (error) {

  }
}

export function* watchGetWhitelabel() {
  yield takeLatest(GET_WHITELABEL, getWhiteLabel)
}
