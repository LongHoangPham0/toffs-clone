import { GET_LIST_OIDC_PUBLIC, GET_LIST_OIDC_PUBLIC_ERROR, GET_LIST_OIDC_PUBLIC_SUCCESS } from "../../actions/auth/common/actionType";
import { dataTablePagination } from "../../config/constants";


export const listOIDCPublicReducer = (state = {...dataTablePagination}, action) => {
  switch (action.type) {
    case GET_LIST_OIDC_PUBLIC:
      return {...state, isLoading: true, data: []}
    case GET_LIST_OIDC_PUBLIC_SUCCESS:
      return {...state, isLoading: false, data: action.data}
    case GET_LIST_OIDC_PUBLIC_ERROR:
      return {...state, isLoading: false, data: []}
    default:
      return state
  }
}