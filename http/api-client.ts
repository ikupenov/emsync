import axios from 'axios'
import qs from 'query-string'

import { API_URL } from '../config'
import { ObjectUtils } from '../utils'

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: params => qs.stringify(ObjectUtils.pickNonEmpty(params))
})

export const createCancelToken = () => axios.CancelToken.source()

export const isHttpError = (error: unknown) => axios.isAxiosError(error)
