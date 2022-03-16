import { v4 as uuid } from 'uuid'
import qs from 'query-string'

import {
  SPOTIFY_ACCOUNTS_BASE_URL,
  SPOTIFY_API_URL,
  SPOTIFY_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SCOPE
} from '../../config'
import { httpClient } from '../../http'
import {
  SignInArgs,
  SignInResult,
  GetPlaylistsArgs,
  GetPlaylistsResult
} from './types'

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

async function signIn({ code, state }: SignInArgs): Promise<SignInResult> {
  const response = await httpClient.post('/spotify/access-token', { code, state })
  return response.data
}

async function getPlaylists({ accessToken }: GetPlaylistsArgs): Promise<GetPlaylistsResult> {
  const response = await httpClient.get(`${SPOTIFY_API_URL}/v1/me/playlists`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })

  return response.data
}

export const spotifyService = Object.freeze({
  authorize,
  signIn,
  getPlaylists
})
