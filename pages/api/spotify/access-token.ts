import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'query-string'
import { isNil } from 'lodash-es'

import {
  SPOTIFY_ACCOUNTS_API_URL,
  SPOTIFY_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SECRET
} from '../../../config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state, refreshToken } = req.body

  if (!isNil(code) && isNil(state)) {
    res.status(400).json({ error: 'invalid_state' })
  }
  else {
    const credentials = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString('base64')

    let data = null

    if (!isNil(code)) {
      data = qs.stringify({
        code,
        redirect_uri: SPOTIFY_REDIRECT_URL,
        grant_type: 'authorization_code'
      })
    }
    else if (!isNil(refreshToken)) {
      data = qs.stringify({
        refresh_token: refreshToken,
        redirect_uri: SPOTIFY_REDIRECT_URL,
        grant_type: 'refresh_token'
      })
    }
    else {
      res.status(400).json({ error: 'invalid_body' })
      return
    }

    const options = {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    try {
      const { data: responseData } = await axios.post(
        `${SPOTIFY_ACCOUNTS_API_URL}/token`,
        data,
        options
      )

      const {
        access_token: accessToken,
        refresh_token: refreshTokenResponse,
        expires_in: expiresIn
      } = responseData

      res.status(200).json({
        accessToken,
        refreshToken: refreshTokenResponse,
        expiresIn
      })
    }
    catch (responseError) {
      res.status(400).json({ error: responseError })
    }
  }
}
