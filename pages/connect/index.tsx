import { Button } from '@chakra-ui/react'

import { Page } from '../../components/layouts'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { spotifyService } from '../../services'
import { reconnectSpotify, selectSpotifyConnection } from '../../features/connection'

export default function Connect() {
  const dispatch = useAppDispatch()
  const spotifyConnection = useAppSelector(selectSpotifyConnection)

  return (
    <Page title="Connect providers">
      <Button
        variant="outline"
        colorScheme={spotifyConnection.connected ? 'green' : 'gray'}
        onClick={() => spotifyConnection.connected ?
          dispatch(reconnectSpotify()) :
          spotifyService.authorize()
        }
      >
        {spotifyConnection.connected ? 'Connected to Spotify' : 'Connect to Spotify'}
      </Button>
    </Page>
  )
}
