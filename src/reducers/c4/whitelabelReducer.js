import { GET_WHITELABEL, GET_WHITELABEL_ERROR, GET_WHITELABEL_SUCCESS } from "../../actions/c4/common/actionType";
import { dataOneItem } from "../../config/constants";


export const whiteLabelReducer = (state = {...dataOneItem}, action) => {
  switch(action.type) {
    case GET_WHITELABEL:
      return {...state, isLoading: true}
    case GET_WHITELABEL_SUCCESS:
      return {...state, isLoading: false, data: action.data?.returnData || null, error: null }
    case GET_WHITELABEL_ERROR:
      return {...state, isLoading: false, data: null, error: "Error"}
    default:
      return state
  }
}
