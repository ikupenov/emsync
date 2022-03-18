import { isNil } from 'lodash-es'
import { AxiosError } from 'axios'

import type { Store } from '../../store'
import { spotifyClient } from '../../../services'
import { HttpStatusCode } from '../../../http'
import { reconnectSpotify } from '../../../features/connection'

function init(store: Store) {
  spotifyClient.interceptors.request.use(
    async (request) => {
      const state = store?.getState()
      const connection = state?.connections.spotify
      const accessToken = connection?.data?.accessToken

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
        await store?.dispatch(reconnectSpotify())
        return spotifyClient(originalRequest)
      }

      return Promise.reject(error)
    }
  )
}

export const spotifyClientInterceptor = Object.freeze({
  init
})
