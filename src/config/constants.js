
export const DEFAULT_URL = window.location.origin;

const dataList = {
  data: [],
  isLoading: false,
  error: null
}

export const dataTablePagination = {...dataList, totalRecords: 0}

export const dataOneItem = {
  data: null,
  isLoading: false,
  error: null
}

export const ServiceData = {
  all: "all",
  customer: "cus",
  t2: "t2",
  c4: "c4",
  dns: "dns",
  elm: "elm",
  cdn: "cdn",
  monitor: "monitor",
  ssl: "ssl"
}

export const OIDC = {
  singpass: "Singpass",
  vkey: "V-Key"
}
