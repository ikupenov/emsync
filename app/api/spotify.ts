import { createApi } from '@reduxjs/toolkit/query/react'

import { callbackBaseQuery } from './callback-base-query'
import {
  spotifyService,
  SignInResult,
  SignInArgs,
  GetPlaylistsArgs,
  GetPlaylistsResult
} from '../../services/spotify'

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: callbackBaseQuery(),
  endpoints: builder => ({
    signIn: builder.mutation<SignInResult, SignInArgs>({
      query: ({ code, state }) => ({
        callback: spotifyService.signIn,
        args: [{ code, state }]
      })
    }),
    getPlaylists: builder.query<GetPlaylistsResult, GetPlaylistsArgs>({
      query: ({ accessToken }) => ({
        callback: spotifyService.getPlaylists,
        args: [{ accessToken }]
      })
    })
  })
})

export const {
  signIn,
  getPlaylists
} = spotifyApi.endpoints

export const {
  useSignInMutation,
  useGetPlaylistsQuery
} = spotifyApi
