import { GET_ME_SUCCESS, LOGIN_FAILED, LOG_OUT, RESET_DATA_LOGIN, UPDATE_INFO_AUTH_ME } from "../../actions/c4/common/actionType";


export const authReducer = (state = null, action) => {
  switch (action.type) {
    case GET_ME_SUCCESS:
      return {...action.data}
    case UPDATE_INFO_AUTH_ME:
      return {...state, purchaseBalance: action.data}
    case LOG_OUT:
      return null;
    default:
      return state;
  }
}

export const loginErrorReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_FAILED:
      return {
        ...action.error
      }
    case RESET_DATA_LOGIN:
      return null
    default:
      return state
  }
}