import {
    all,
    put,
    takeLatest
  } from 'redux-saga/effects';
import * as AuthService from '../../apis/c4/auth'
import i18n from '../../i18n';
import { push } from 'react-router-redux';
import queryString from 'query-string';
import { saveToken, saveLocalStorage } from '../../Utils/Token';
import { DEFAULT_URL, ServiceData } from '../../config/constants';
import history from '../../history';
import { GET_ME, GET_ME_SUCCESS } from '../../actions/c4/common/actionType';

function* getMe() {
    try {
        const data = yield AuthService.getMe()
        saveLocalStorage(ServiceData.dns, data.data)
        yield put({
            type: GET_ME_SUCCESS,
            data:data.data
        })
        // const pathname = window.location.pathname;
        // if (!data.data.data.isCreatedSubscription && !pathname.includes("/domain/paymentmethod")  && !pathname.includes("/domain/success-inquiry")) {
        //   if (data.data.data.role === "Busniess" || data.data.data.role === "Staff") {
        //     yield put(push({
        //       pathname: "403",
        //     }));
        //   } else {
        //     yield put(push({
        //       pathname: "/domain/chooseplan",
        //       search: queryString.stringify({
        //         wizardType: wizardTypeConstant.UPGRADE_EXCEED
        //       })
        //     }));
        //   }
        // }
    } catch (error) {
        // yield put({ type: GET_LIST_WAF_ERROR, error })
        // window.location.href = DEFAULT_URL + "/Account/Login";
    }
}

export function* watchGetMe() {
  yield takeLatest(GET_ME, getMe)
}