import { Button } from '@chakra-ui/react'

import { Page } from '../../components/layouts'
import { useAppSelector } from '../../app/hooks'
import { spotifyService } from '../../services'
import { selectSpotifyConnection } from '../../features/connection'

export default function Connect() {
  const spotifyConnection = useAppSelector(selectSpotifyConnection)

  return (
    <Page title="Connect providers">
      <Button
        colorScheme={spotifyConnection.connected ? 'green' : 'gray'}
        onClick={() => spotifyService.authorize()}
      >
        {spotifyConnection.connected ? 'Connected to Spotify' : 'Connect to Spotify'}
      </Button>
    </Page>
  )
}
