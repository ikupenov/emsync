import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'
import { spotifyService } from '../../services/spotify'

export interface SpotifyConnectState {
  data: object | null
  pending: boolean | null
  error: string | null
}

export interface ConnectState {
  spotify: SpotifyConnectState
}

const initialState: ConnectState = {
  spotify: {
    data: null,
    pending: false,
    error: null
  }
}

export interface SignInArg {
  code: string
  state: string
}

export const signInSpotify = createAsyncThunk(
  'connect/spotify/signIn',
  async ({ code, state }: SignInArg) => {
    const result = await spotifyService.signIn(code, state)
    return result
  }
)

export const connectSlice = createSlice({
  name: 'connect',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInSpotify.pending, (state) => {
        state.spotify.pending = true
      })
      .addCase(signInSpotify.fulfilled, (state, { payload }) => {
        state.spotify.pending = false
        state.spotify.data = payload
      })
      .addCase(signInSpotify.rejected, (state) => {
        state.spotify.pending = false
        state.spotify.error = 'An error occured.'
      })
  }
})

export const selectConnect = (state: RootState) => state.connect

export const connectReducer = connectSlice.reducer
