import { CHANGE_STATUS_MENU_BAR } from "./common/actionType"

export const changeStatusMenu = (data) => {
  return {
    type: CHANGE_STATUS_MENU_BAR,
    data
  }
}
