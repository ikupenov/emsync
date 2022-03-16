import { createApi } from '@reduxjs/toolkit/query/react'

import { callbackBaseQuery } from './callback-base-query'
import { SignInResult, SignInArgs, spotifyService } from '../../services/spotify'

export const spotifyApi = createApi({
  reducerPath: 'spotifyApi',
  baseQuery: callbackBaseQuery(),
  endpoints: builder => ({
    signIn: builder.mutation<SignInResult, SignInArgs>({
      query: ({ code, state }) => ({
        callback: spotifyService.signIn,
        args: [{ code, state }]
      })
    })
  })
})

export const { signIn } = spotifyApi.endpoints
export const { useSignInMutation } = spotifyApi
