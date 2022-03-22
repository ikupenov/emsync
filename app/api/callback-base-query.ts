/* eslint-disable @typescript-eslint/indent */
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { AxiosError } from 'axios'
import { isArray } from 'lodash-es'

import { BaseQueryApi, QueryReturnValue } from './types'

export type RequestInterceptor = (args: CallbackQueryArgs, api: BaseQueryApi) => Promise<void>
export type ResponseInterceptor = (
  response: QueryReturnValue,
  args: CallbackQueryArgs,
  api: BaseQueryApi
) => Promise<void>

export interface CallbackQueryFnArgs {
  requestQueryInterceptor?: RequestInterceptor
  responseQueryInterceptor?: ResponseInterceptor
}

export interface CallbackQueryFnMeta {
  retried?: boolean
}

export interface CallbackQueryArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (...args: any[]) => Promise<unknown>
  args?: unknown[] | unknown
  requestEndpointInterceptor?: RequestInterceptor
  responseEndpointInterceptor?: ResponseInterceptor
}

export const callbackQuery = ({
  requestQueryInterceptor,
  responseQueryInterceptor
}: CallbackQueryFnArgs = {}): BaseQueryFn<
  CallbackQueryArgs,
  unknown,
  unknown,
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  CallbackQueryFnMeta
> =>
  async (
    {
      callback,
      args,
      requestEndpointInterceptor,
      responseEndpointInterceptor
    },
    { getState, dispatch }
  ) => {
    let response: QueryReturnValue<unknown, unknown, CallbackQueryFnMeta>

    try {
      await requestQueryInterceptor?.(
        { callback, args },
        { getState, dispatch } as BaseQueryApi
      )

      await requestEndpointInterceptor?.(
        { callback, args },
        { getState, dispatch } as BaseQueryApi
      )

      const result = isArray(args) ? await callback(...args) : await callback(args)
      response = { data: result }
    }
    catch (axiosError) {
      const err = axiosError as AxiosError
      response = {
        error: {
          status: err.response?.status,
          data: err.response?.data
        }
      }
    }
    finally {
      await responseQueryInterceptor?.(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        response!,
        { callback, args },
        { getState, dispatch } as BaseQueryApi
      )

      await responseEndpointInterceptor?.(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        response!,
        { callback, args },
        { getState, dispatch } as BaseQueryApi
      )
    }

    return response
  }
