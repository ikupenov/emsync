import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { AxiosError } from 'axios'
import { isArray } from 'lodash-es'

interface CallbackQueryArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => Promise<unknown>
  args?: unknown[] | unknown
}

export const callbackBaseQuery = (): BaseQueryFn<CallbackQueryArgs, unknown, unknown> =>
  async ({ callback, args }) => {
    try {
      const result = isArray(args) ? await callback(...args) : await callback(args)
      return { data: result }
    }
    catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data
        }
      }
    }
  }
