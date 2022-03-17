import { v4 as uuid } from 'uuid'
import qs from 'query-string'
import axios, { AxiosError } from 'axios'
import { isNil } from 'lodash-es'

import { store } from '../../app/store'
import {
  reconnectSpotify,
  selectSpotifyConnection
} from '../../features/connection'
import {
  SPOTIFY_ACCOUNTS_BASE_URL,
  SPOTIFY_API_URL,
  SPOTIFY_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SCOPE
} from '../../config'
import { httpClient, HttpStatusCode } from '../../http'
import {
  ConnectArgs,
  ConnectResult,
  ReconnectArgs,
  ReconnectResult,
  GetPlaylistsResult
} from './types'

const spotifyClient = axios.create({
  baseURL: SPOTIFY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

spotifyClient.interceptors.request.use(
  async (request) => {
    const state = store.getState()
    const connection = selectSpotifyConnection(state)
    const accessToken = connection.data?.accessToken

    if (isNil(accessToken)) {
      return Promise.reject()
    }

    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`
    }

    return Promise.resolve(request)
  }
)

spotifyClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (
      error.response?.status === HttpStatusCode.Unathorized &&
      !originalRequest.hasRetried
    ) {
      originalRequest.hasRetried = true
      await store.dispatch(reconnectSpotify())
      return spotifyClient(originalRequest)
    }

    return Promise.reject(error)
  }
)

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
