import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'
import { signIn } from '../../app/api/spotify'

export interface SpotifyConnectionState {
  data: object | null
  error: string | null,
  status: 'idle' | 'loading' | 'failed',
  connected: boolean
}

export interface ConnectionState {
  spotify: SpotifyConnectionState
}

const initialState: ConnectionState = {
  spotify: {
    data: null,
    error: null,
    status: 'idle',
    connected: false
  }
}

export interface SignInArg {
  code: string
  state: string
}

export const connectSpotify = createAsyncThunk(
  'connect/spotify',
  async ({ code, state }: SignInArg, { dispatch }) => {
    const result = await dispatch(signIn.initiate({ code, state }))
    return result
  }
)

export const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(connectSpotify.pending, (state) => {
        state.spotify.status = 'loading'
      })
      .addCase(connectSpotify.fulfilled, (state, { payload }) => {
        state.spotify.status = 'idle'
        state.spotify.data = payload
        state.spotify.connected = true
      })
      .addCase(connectSpotify.rejected, (state) => {
        state.spotify.status = 'failed'
        state.spotify.error = 'An error occured.'
        state.spotify.connected = false
      })
  }
})

export const selectConnections = (state: RootState) => state.connections
export const selectSpotifyConnection = (state: RootState) => state.connections.spotify

export const connectionsReducer = connectionsSlice.reducer
