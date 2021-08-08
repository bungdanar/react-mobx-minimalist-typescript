import axios from 'axios'
import qs from 'qs'
import { handleResponseErr } from './handle-error'

function getProdServerHost() {
  const port = window.location.port
  const protocol = window.location.protocol

  // PORT EXISTS
  if (port !== '') {
    return `${protocol}//${window.location.host}`
  } else {
    return `${protocol}//${window.location.hostname}`
  }
}

export const SERVER_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? getProdServerHost()
    : process.env.REACT_APP_BACKEND_API

export const request = {
  get: <T>(url: string, params: Object = {}, additionalConfig: Object = {}) =>
    axios
      .get<T>(`${SERVER_BASE_URL}${url}`, {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: 'repeat' }),
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleResponseErr(err)),

  post: <T>(url: string, payload: Object = {}, additionalConfig: Object = {}) =>
    axios
      .post<T>(`${SERVER_BASE_URL}${url}`, payload, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleResponseErr(err)),

  put: <T>(url: string, payload: Object = {}, additionalConfig: Object = {}) =>
    axios
      .put<T>(`${SERVER_BASE_URL}${url}`, payload, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleResponseErr(err)),

  patch: <T>(
    url: string,
    payload: Object = {},
    additionalConfig: Object = {}
  ) =>
    axios
      .patch<T>(`${SERVER_BASE_URL}${url}`, payload, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleResponseErr(err)),

  delete: <T>(url: string, additionalConfig: Object = {}) =>
    axios
      .delete<T>(`${SERVER_BASE_URL}${url}`, {
        withCredentials: true,
        ...additionalConfig,
      })
      .catch((err) => handleResponseErr(err)),
}
