import { Box, Button } from '@chakra-ui/react'

import { spotifyService } from '../../services'

export default function Connect() {
  return (
    <Box>
      <Button onClick={() => spotifyService.authorize()}>
        Connect to Spotify
      </Button>
    </Box>
  )
}
