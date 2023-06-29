import { GET_LIST_OIDC_PUBLIC } from "./common/actionType"

export const getListOIDCPublic = data => {
  return {
    type: GET_LIST_OIDC_PUBLIC,
    data
  }
}
