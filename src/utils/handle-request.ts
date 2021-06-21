import axios from 'axios'
import qs from 'qs'
import { handleResponseErr } from './handle-error'

const SERVER_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BACKEND_API_PROD
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
}
