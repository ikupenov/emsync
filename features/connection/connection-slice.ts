import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'
import { signIn } from '../../app/api/spotify'
import {
  ConnectionState,
  SignInArg,
  SpotifyConnectionData
} from './types'

const initialState: ConnectionState = {
  spotify: {
    data: null,
    error: null,
    status: 'idle',
    connected: false
  }
}

export const connectSpotify = createAsyncThunk(
  'connect/spotify',
  async ({ code, state }: SignInArg, { dispatch }) => {
    const result = await dispatch(signIn.initiate({ code, state }))

    if ('error' in result) {
      throw Error()
    }

    return result.data
  }
)

export const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    connectSpotifyFailed: (state: ConnectionState) => {
      state.spotify.status = 'failed'
      state.spotify.data = null
      state.spotify.error = 'rejected'
      state.spotify.connected = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSpotify.pending, (state) => {
        state.spotify.status = 'loading'
        state.spotify.data = null
        state.spotify.error = null
        state.spotify.connected = false
      })
      .addCase(connectSpotify.fulfilled, (state, { payload }) => {
        state.spotify.status = 'idle'
        state.spotify.data = payload as SpotifyConnectionData
        state.spotify.error = null
        state.spotify.connected = true
      })
      .addCase(connectSpotify.rejected, connectionsSlice.caseReducers.connectSpotifyFailed)
  }
})

export const selectConnections = (state: RootState) => state.connections
export const selectSpotifyAccessToken = (state: RootState) =>
  state.connections.spotify.data?.accessToken
export const selectSpotifyConnection = (state: RootState) => state.connections.spotify

export const {
  connectSpotifyFailed
} = connectionsSlice.actions

export const connectionsReducer = connectionsSlice.reducer
