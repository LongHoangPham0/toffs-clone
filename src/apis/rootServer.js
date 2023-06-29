import axios from 'axios'
import history from '../history'
import { GET_ME_URL } from './c4/common/path'
import _ from 'lodash'
import store from '../storeReducer'
import { saveToken, destroyToken, saveLocalStorage } from '../Utils/Token'
import { GET_ME_SUCCESS } from '../actions/c4/common/actionType'
import { REFRESH_TOKEN_API } from './auth/common/path'
import { ServiceData } from '../config/constants'
import { prefixApiC4 } from './c4/common/server'
import { prefixApiSSL } from './ssl/common/server'

axios.defaults.baseURL = process.env.REACT_APP_URI_API
axios.defaults.headers.common['Content-Type'] = 'application/json, multipart/form-data'
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
axios.defaults.withCredentials = false

let isAlreadyFetchingAccessToken = false
let subscribers = []

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => {
    return callback(access_token)
  })
}

function addSubscriber(callback) {
  subscribers.push(callback)
}

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if(!_.isEmpty(token)) {
    config.headers.Authorization = "Bearer " + token
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use((response) => {
  // Do something with response data
  return response;
}, async (error) => {
  const { config, response } = error;
  const originalRequest = config

  if (response?.status !== 401) {
    return Promise.reject(error);
  }

  if (!isAlreadyFetchingAccessToken) {
    isAlreadyFetchingAccessToken = true
    const refreshToken = localStorage.getItem("refreshToken");
    if (_.isEmpty(refreshToken)) {
      destroyToken()
      isAlreadyFetchingAccessToken = false
      subscribers = [];
      return history.push('/login');
    }
    axios.post(REFRESH_TOKEN_API, {refreshtoken: refreshToken}, {withCredentials: true}).then((response) => {
      isAlreadyFetchingAccessToken = false
      saveToken(response.data);
      // store.dispatch({
      //   type: ACCESS_TOKEN,
      //   data: response.data.accessToken
      // })
      let pathGetMe = prefixApiC4 + GET_ME_URL;
      const pathUrl = history.location.pathname
      if (pathUrl.indexOf(`/${ServiceData.ssl}/`) >= 0) {
        pathGetMe = prefixApiSSL + "/me";
      }
      axios.get(pathGetMe).then((data) => {
        saveLocalStorage(data.data.data)
        store.dispatch({
          type: GET_ME_SUCCESS,
          data: data.data.data
        })
        onAccessTokenFetched(response.data.accessToken)
      })
    })
  }

  const retryOriginalRequest = new Promise((resolve) => {
    addSubscriber(access_token => {
      if (originalRequest.url.indexOf(GET_ME_URL) === -1) {
        originalRequest.headers.Authorization = 'Bearer ' + access_token
        resolve(axios(originalRequest))
      }
      resolve()
    })
  })
  return retryOriginalRequest
});

export const get = (path, params = null) => {
  return axios.get(path, {
    params: params
  })
}

export const post = (path, params = null, options = {}) => {
  return axios.post(path, params, options)
}

export const put = (path, params = null) => {
  return axios.put(path, params)
}

export const destroy = (path, params = null) => {
  return axios.delete(path, params)
}

export const downloadFile = (path, params, typeFile = 'application/vnd.ms-excel') => {
  return axios.get(path, {
    params,
    responseType: typeFile
  })
}