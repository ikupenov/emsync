import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'
import { spotifyService } from '../../services/spotify'

export interface SpotifyConnectState {
  data: object | null
  error: string | null,
  status: 'idle' | 'loading' | 'failed'
}

export interface ConnectState {
  spotify: SpotifyConnectState
}

const initialState: ConnectState = {
  spotify: {
    data: null,
    error: null,
    status: 'idle'
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
        state.spotify.status = 'loading'
      })
      .addCase(signInSpotify.fulfilled, (state, { payload }) => {
        state.spotify.status = 'idle'
        state.spotify.data = payload
      })
      .addCase(signInSpotify.rejected, (state) => {
        state.spotify.status = 'failed'
        state.spotify.error = 'An error occured.'
      })
  }
})

export const selectConnect = (state: RootState) => state.connect

export const connectReducer = connectSlice.reducer
