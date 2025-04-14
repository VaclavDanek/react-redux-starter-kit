import axios from 'axios'

// utils
import { requestInterceptor, responseInterceptor } from '../utils'

// types
import type { AxiosBasicCredentials, AxiosInstance, AxiosResponse } from 'axios'
import type { LoginRequestResponse } from '../epics/authEpic'

const apis = {
  myApi: axios.create({
    baseURL: '',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    }
  }),
} satisfies Record<string, AxiosInstance>;

Object.values(apis).forEach((api: AxiosInstance) => api.interceptors.request.use(...requestInterceptor))
Object.values(apis).forEach((api: AxiosInstance) => api.interceptors.response.use(...responseInterceptor))

export const setHeader = (apiKey: string, header: string, value?: string | string[]): void => {
  if (value) { apis[apiKey].defaults.headers.common[header] = value } else { delete apis[apiKey].defaults.headers.common[header] }
}

export const setGlobalHeader = (header: string, value?: string | string[]): void => {
  if (value) { axios.defaults.headers.common[header] = value } else { delete axios.defaults.headers.common[header] }
}

export const setBasicAuth = (apiKey: string, credentials?: AxiosBasicCredentials): void => {
  if (credentials) { apis[apiKey].defaults.auth = credentials } else { delete apis[apiKey].defaults.auth }
}

export const setGlobalBasicAuth = (credentials?: AxiosBasicCredentials): void => {
  if (credentials) { axios.defaults.auth = credentials } else { delete axios.defaults.auth }
}

const endpoints = {
  // post
  login: (username: string, password: string): Promise<AxiosResponse<LoginRequestResponse>> => (
    apis.myApi.post(`login`, { username, password })
  ),

  // put

  // get

  // delete
} satisfies Record<string, (...args: any[]) => Promise<AxiosResponse>>

export default endpoints
