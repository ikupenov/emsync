import { useEffect } from 'react'

import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import {
  Box,
  Button,
  ButtonGroup,
  Text
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Page } from '../components/layouts'
import {
  increment,
  decrement,
  incrementByAmount,
  selectCount
} from '../features/counter'
import {
  getSpotifyPlaylists,
  selectSpotifyPlaylists
} from '../features/playlists'

function Home() {
  const { data: session, status } = useSession()

  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  const playlists = useAppSelector(selectSpotifyPlaylists)

  useEffect(() => {
    dispatch(getSpotifyPlaylists())
  }, [dispatch])

  return (
    <Page title="Dashboard">
      {status === 'authenticated' && (
        <Text>Hello, {session?.user?.name}</Text>
      )}

      {playlists.status === 'loading' && 'Loading playlists...'}

      {playlists.status === 'idle' && (
        <Box>
          {playlists.data?.items.map(playlist => (
            <Box key={playlist.id}>
              {playlist.name}
            </Box>
          ))}
        </Box>
      )}

      <Text>{count}</Text>

      <ButtonGroup>
        <Button onClick={() => dispatch(increment())}>
          Increment
        </Button>

        <Button onClick={() => dispatch(decrement())}>
          Decrement
        </Button>

        <Button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </Button>
      </ButtonGroup>
    </Page>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  return { props: { session } }
}

export default Home
