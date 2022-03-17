import { createApi } from '@reduxjs/toolkit/query/react'

import { callbackBaseQuery } from './callback-base-query'
import { ReconnectArgs } from '../../services/spotify/types'
import {
  spotifyService,
  ConnectArgs,
  ConnectResult,
  GetPlaylistsResult
} from '../../services/spotify'

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: callbackBaseQuery(),
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
        callback: spotifyService.getPlaylists
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
