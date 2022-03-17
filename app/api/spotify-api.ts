import { createApi } from '@reduxjs/toolkit/query/react'
import { isNil } from 'lodash-es'

import { callbackQuery } from './callback-base-query'
import { ReconnectArgs } from '../../services/spotify/types'
import {
  spotifyService,
  spotifyClient,
  ConnectArgs,
  ConnectResult,
  GetPlaylistsResult
} from '../../services/spotify'

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: callbackQuery(),
  endpoints: builder => ({
    connect: builder.mutation<ConnectResult, ConnectArgs>({
      query: ({ code, state }) => ({
        callback: spotifyService.connect,
        args: [{ code, state }]
      })
    }),
    reconnect: builder.mutation<ConnectResult, ReconnectArgs>({
      query: ({ refreshToken }) => ({
        callback: spotifyService.reconnect,
        args: [{ refreshToken }]
      })
    }),
    getPlaylists: builder.query<GetPlaylistsResult, void>({
      query: () => ({
        callback: spotifyService.getPlaylists,
        requestEndpointInterceptor: async (_, api) => {
          const { getState } = api

          const state = getState()
          const connection = state.connections.spotify
          const accessToken = connection.data?.accessToken

          if (isNil(accessToken)) {
            throw Error('unauthorized')
          }

          spotifyClient.interceptors.request.use(
            async (request) => {
              request.headers = {
                ...request.headers,
                Authorization: `Bearer ${accessToken}`
              }

              return Promise.resolve(request)
            }
          )

          return Promise.resolve()
        },
        responseEndpointInterceptor: async (response, args, api) => {
          const { getState, dispatch } = api

          const state = getState()
          const connection = state.connections.spotify
          const refreshToken = connection.data?.refreshToken

          if ('error' in response && !isNil(refreshToken)) {
            await dispatch(spotifyApi.endpoints.reconnect.initiate({ refreshToken }))
            const { callback, args: callbackArgs } = args
            await callback(callbackArgs)
          }

          return Promise.resolve()
        }
      })
    })
  })
})

export const {
  connect,
  reconnect,
  getPlaylists
} = spotifyApi.endpoints

export const {
  useConnectMutation,
  useReconnectMutation,
  useGetPlaylistsQuery
} = spotifyApi
