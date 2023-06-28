import { removeDotEndValue } from "../Utils/Domain";

export const resetDataMiddleware = (store) => (next) => (action) => {
  if(action?.type.indexOf("GET_LIST") >= 0 && action?.type.indexOf("SUCCESS") <= -1 && action?.type.indexOf("ERROR") <= -1) {
    const actionName = removeDotEndValue(action.type.replace("_LIST", ""), "S")
    store.dispatch({type: `RESET_${actionName}`})
  }
  next(action)
}
