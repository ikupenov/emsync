import { v4 as uuid } from 'uuid'
import qs from 'query-string'
import axios from 'axios'

import { httpClient } from '../../http'
import {
  SPOTIFY_ACCOUNTS_BASE_URL,
  SPOTIFY_API_URL,
  SPOTIFY_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SCOPE
} from '../../config'
import {
  ConnectArgs,
  ConnectResult,
  ReconnectArgs,
  ReconnectResult,
  GetPlaylistsResult
} from './types'

export const spotifyClient = axios.create({
  baseURL: SPOTIFY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

function authorize() {
  const url = qs.stringifyUrl({
    url: `${SPOTIFY_ACCOUNTS_BASE_URL}/authorize`,
    query: {
      response_type: 'code',
      client_id: SPOTIFY_ID,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      scope: SPOTIFY_SCOPE,
      state: uuid()
    }
  })

  window.location.href = url
}

async function connect({ code, state }: ConnectArgs): Promise<ConnectResult> {
  const response = await httpClient.post<ConnectResult>(
    '/spotify/access-token',
    { code, state }
  )

  return response.data
}

async function reconnect({ refreshToken }: ReconnectArgs): Promise<ReconnectResult> {
  const response = await httpClient.post<ReconnectResult>(
    '/spotify/access-token',
    { refreshToken }
  )

  return response.data
}

async function getPlaylists(): Promise<GetPlaylistsResult> {
  const response = await spotifyClient.get('/v1/me/playlists')
  return response.data
}

export const spotifyService = Object.freeze({
  authorize,
  connect,
  reconnect,
  getPlaylists
})
