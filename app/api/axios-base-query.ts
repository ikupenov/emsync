import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { isString } from 'lodash-es'

interface BaseQueryArgs {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
}

interface BaseQueryProps {
  baseUrl: string
}

export const axiosBaseQuery = (
  { baseUrl }: BaseQueryProps = { baseUrl: '' }
): BaseQueryFn<BaseQueryArgs | string, unknown, unknown> =>
  async (args) => {
    const { url = args, method = 'GET', data = null } = isString(args) ? {} : args

    try {
      const result = await axios({ url: baseUrl + url, method, data })
      return { data: result.data }
    }
    catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: { status: err.response?.status, data: err.response?.data }
      }
    }
  }
