import { LOGIN_API } from './common/path'
import * as ApiAuth from './common/server'
import * as ApiExternalAuth from './common/serverExternalAuth'

export const Login = data => {
  return ApiAuth.post(LOGIN_API, data, {withCredentials: true})
}