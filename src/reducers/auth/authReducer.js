import { LOGIN_AUTH, LOGIN_AUTH_ERROR } from "../../actions/auth/common/actionType"


export const loginAuthReducer = (state = null, action) => {
  switch (action.type) {
    case LOGIN_AUTH:
      return null
    case LOGIN_AUTH_ERROR:
      return {error: action.error}
    default:
      return state
  }
}