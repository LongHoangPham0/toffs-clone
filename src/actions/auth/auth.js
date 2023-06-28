import { GET_ACCESS_TOKEN_OIDC, LOGIN_AUTH } from "./common/actionType"

export const loginAuth = data => {
  return {
    type: LOGIN_AUTH,
    data
  }
}

export const getAccessTokenOIDC = data => {
  return {
    type: GET_ACCESS_TOKEN_OIDC,
    data
  }
}
