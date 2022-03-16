import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import qs from 'query-string'
import { isNil } from 'lodash-es'

import {
  SPOTIFY_API_URL,
  SPOTIFY_ID,
  SPOTIFY_REDIRECT_URL,
  SPOTIFY_SECRET
} from '../../../config'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code, state } = req.body

  if (isNil(state)) {
    res.status(400).json({ error: 'invalid_state' })
  }
  else {
    const credentials = Buffer.from(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString('base64')

    const data = qs.stringify({
      code,
      redirect_uri: SPOTIFY_REDIRECT_URL,
      grant_type: 'authorization_code'
    })

    const options = {
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    try {
      const { data: responseData } = await axios.post(
        `${SPOTIFY_API_URL}/token`,
        data,
        options
      )

      const {
        access_token: accessToken,
        expires_in: expiresIn
      } = responseData

      res.status(200).json({ accessToken, expiresIn })
    }
    catch (responseError) {
      res.status(400).json({ error: responseError })
    }
  }
}
