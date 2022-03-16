import { v4 as uuid } from 'uuid'
import qs from 'query-string'

import {
  SPOTIFY_BASE_URL,
  SPOTIFY_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SCOPE
} from '../../config'
import { apiClient } from '../../http'

export function authorize() {
  const url = qs.stringifyUrl({
    url: `${SPOTIFY_BASE_URL}/authorize`,
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

export interface SignInResult {
  accessToken?: string
  expiresIn?: string
  error?: string
}

export async function signIn(code: string, state: string): Promise<SignInResult> {
  const response = await apiClient.post('/spotify/access-token', { code, state })
  return response.data
}
