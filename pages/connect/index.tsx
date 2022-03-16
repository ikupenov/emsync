import { Box, Button } from '@chakra-ui/react'

import { authorize } from '../../services/spotify'

export default function Connect() {
  return (
    <Box>
      <Button onClick={() => authorize()}>
        Connect to Spotify
      </Button>
    </Box>
  )
}
