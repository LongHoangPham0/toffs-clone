import * as rootServer from '../../rootServer'

export const prefixApiC4 = "cdnlite/api/v1"
export const prefixApiNoAuthC4 = "/cdnlite/api/v1/noauth/"

export const get = (path, params = null) => {
  return rootServer.get(prefixApiC4 + path, params)
}

export const getNoAuth = (path, params = null) => {
  return rootServer.get(prefixApiNoAuthC4 + path, params);
}

export const post = (path, params = null) => {
  return rootServer.post(prefixApiC4 + path, params);
}

export const put = (path, params = null) => {
  return rootServer.put(prefixApiC4 + path, params);
}

export const destroy = (path, params = null) => {
  return rootServer.destroy(prefixApiC4 + path, params);
}

export const downloadFile = (path, params) => {
  return rootServer.downloadFile(prefixApiC4 + path, params, 'text/csv');
}