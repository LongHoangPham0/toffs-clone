import * as rootServer from '../../rootServer'

const prefixApiAuth = "/auth"

export const get = (path, params = null) => {
  return rootServer.get(prefixApiAuth + path, params)
}

export const post = (path, params = null, options = {}) => {
  return rootServer.post(prefixApiAuth + path, params, options)
}

export const put = (path, params = null) => {
  return rootServer.put(prefixApiAuth + path, params)
}

export const destroy = (path, data) => {
  return rootServer.destroy(prefixApiAuth + path, data)
}
