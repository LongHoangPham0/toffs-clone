import { CHANGE_STATUS_MENU_BAR } from "../../actions/ui/common/actionType"


const initialState = {
  sidebarShow: true
}

export const uiMenuReducer = (state = initialState, { type, data }) => {
  switch(type) {
    case CHANGE_STATUS_MENU_BAR:
      return {...state, ...data}
    default:
      return state
  }
}