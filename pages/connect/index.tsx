import { Button } from '@chakra-ui/react'

import { Page } from '../../components/layouts'
import { spotifyService } from '../../services'

export default function Connect() {
  return (
    <Page title="Connect providers">
      <Button onClick={() => spotifyService.authorize()}>
        Connect to Spotify
      </Button>
    </Page>
  )
}
