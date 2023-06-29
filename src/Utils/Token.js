import _ from "lodash"
import { ServiceData } from "../config/constants"
import { decryptBase64 } from "./EncryptDecrypt"

export const saveToken = async (data) => {
  data.access_token && localStorage.setItem("accessToken", data.access_token)
  data.refresh_token && localStorage.setItem("refreshToken", data.refresh_token)
  // // instantiate
  // const token = new TokenDB([], (name, value) => {
  //   console.log(`${ name } is now ${ value }`)
  // });

  // // set a new state value
  // await token.set("accessToken", {type: "accessToken", value: data.access_token})
  // await token.set("refreshToken", {type: "refreshToken", value: data.refresh_token})
}

export const destroyToken = () => {
  localStorage.removeItem("userId")
  localStorage.removeItem("role")
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("customerId")
}

export const saveLocalStorage = (type, data) => {
  localStorage.setItem("customerId", data?.customerId || "")
  let role = localStorage.getItem("role")
  role = _.isEmpty(role) ? {} : JSON.parse(role)
  switch(type) {
    case ServiceData.dns:
      role.dns = data?.role || ""
      break
    case ServiceData.c4:
      role.c4 = data?.roleDetail || ""
      break
    default:
      role.t2 = data?.roleDetail || ""
      break
  }
  localStorage.setItem("role", JSON.stringify(role))
}