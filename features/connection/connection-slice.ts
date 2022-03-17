import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isNil } from 'lodash-es'

import type { RootState } from '../../app/store'
import { connect, reconnect } from '../../app/api/spotify-api'
import { ConnectionState, SignInArg } from './types'

const initialState: ConnectionState = {
  spotify: {
    data: null,
    error: null,
    status: 'idle',
    connected: false
  }
}

export const connectSpotify = createAsyncThunk(
  'connections/connectSpotify',
  async ({ code, state }: SignInArg, { dispatch }) => {
    const result = await dispatch(connect.initiate({ code, state }))

    if ('error' in result) {
      throw Error()
    }

    return result.data
  }
)

export const reconnectSpotify = createAsyncThunk(
  'connections/reconnectSpotify',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState
    const refreshToken = state.connections.spotify.data?.refreshToken

    if (isNil(refreshToken)) {
      throw Error()
    }

    const result = await dispatch(reconnect.initiate({ refreshToken }))

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
    connectSpotifyPending: (state) => {
      state.spotify.status = 'loading'
      state.spotify.data = null
      state.spotify.error = null
      state.spotify.connected = false
    },
    connectSpotifyFulfilled: (state, { payload }) => {
      state.spotify.status = 'idle'
      state.spotify.data = { ...state.spotify.data, ...payload }
      state.spotify.error = null
      state.spotify.connected = true
    },
    connectSpotifyFailed: (state: ConnectionState) => {
      state.spotify.status = 'failed'
      state.spotify.data = null
      state.spotify.error = 'rejected'
      state.spotify.connected = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectSpotify.pending, connectionsSlice.caseReducers.connectSpotifyPending)
      .addCase(connectSpotify.fulfilled, connectionsSlice.caseReducers.connectSpotifyFulfilled)
      .addCase(connectSpotify.rejected, connectionsSlice.caseReducers.connectSpotifyFailed)

      .addCase(reconnectSpotify.fulfilled, connectionsSlice.caseReducers.connectSpotifyFulfilled)
      .addCase(reconnectSpotify.rejected, connectionsSlice.caseReducers.connectSpotifyFailed)
  }
})

export const selectConnections = (state: RootState) => state.connections
export const selectSpotifyAccessToken = (state: RootState) =>
  state.connections.spotify.data?.accessToken
export const selectSpotifyConnection = (state: RootState) => state.connections.spotify

export const {
  connectSpotifyPending,
  connectSpotifyFulfilled,
  connectSpotifyFailed
} = connectionsSlice.actions

export const connectionsReducer = connectionsSlice.reducer
