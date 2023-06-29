import { GET_ME, RESET_DATA_LOGIN } from "./common/actionType"


export const getMe = () => {
  return {
    type: GET_ME
  }
}

export const resetDataError = () => {
  return {
    type: RESET_DATA_LOGIN
  }
}