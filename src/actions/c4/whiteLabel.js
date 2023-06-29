import { GET_WHITELABEL } from "./common/actionType"

export const getWhiteLabel = (data) => {
  return {
    type: GET_WHITELABEL,
    data
  }
}