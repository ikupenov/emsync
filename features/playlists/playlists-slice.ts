import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isNil } from 'lodash-es'

import type { RootState } from '../../app/store'
import { getPlaylists } from '../../app/api/spotify'

export interface Playlist {
  id: string
  name: string
  description: string
}

interface PlaylistData {
  items: Playlist[]
}

export interface SpotifyPlaylistsState {
  data: PlaylistData | null,
  error: string | null,
  status: 'idle' | 'loading' | 'failed'
}

export interface PlaylistsState {
  spotify: SpotifyPlaylistsState
}

const initialState: PlaylistsState = {
  spotify: {
    data: null,
    error: null,
    status: 'idle'
  }
}

export const getSpotifyPlaylists = createAsyncThunk(
  'playlists/spotify',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState

    const accessToken = state.connections.spotify.data?.accessToken

    if (isNil(accessToken)) {
      throw Error()
    }

    const result = await dispatch(getPlaylists.initiate({ accessToken }))

    if ('error' in result) {
      throw Error()
    }

    return result.data
  }
)

export const playlistsSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSpotifyPlaylists.pending, (state) => {
        state.spotify.status = 'loading'
        state.spotify.data = null
        state.spotify.error = null
      })
      .addCase(getSpotifyPlaylists.fulfilled, (state, { payload }) => {
        state.spotify.status = 'idle'
        state.spotify.data = { items: payload?.items ?? [] }
        state.spotify.error = null
      })
      .addCase(getSpotifyPlaylists.rejected, (state) => {
        state.spotify.status = 'failed'
        state.spotify.data = null
        state.spotify.error = 'rejected'
      })
  }
})

export const selectPlaylists = (state: RootState) => state.playlists
export const selectSpotifyPlaylists = (state: RootState) => state.playlists.spotify

export const playlistsReducer = playlistsSlice.reducer
