import _ from "lodash"
import { TypeDNS } from "../services/dns/views/Zone/data"
import { ipV4Regex } from "./Regex"

export const addDotEndValue = (value, prefixString = ".") => {
  return _.isEmpty(value) ? "" : value?.lastIndexOf(prefixString) === value?.length - 1 ? value : value + prefixString
}

export const removeDotEndValue = (value, prefixString = ".") => {
  return _.isEmpty(value) ? "" : value.lastIndexOf(prefixString) === value.length - 1 ? value.slice(0, 1) : value
}

export const detectTypeValueRecord = (value) => {
  if (ipV4Regex.test(value)) {
    return TypeDNS.a
  }
  return TypeDNS.cname
}
