import { useEffect } from 'react'

import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import {
  Box,
  Image,
  SimpleGrid,
  Text
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Page } from '../components/layouts'
import {
  getSpotifyPlaylists,
  selectSpotifyPlaylists
} from '../features/playlists'

function Home() {
  const { data: session, status } = useSession()

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
        <SimpleGrid columns={4} spacing={8} autoRows="1fr">
          {playlists.data?.items.map(playlist => (
            <Box key={playlist.id}>
              <Image
                src={playlist.images[0].url}
                objectFit="cover"
                filter="grayscale()"
                transition="filter 0.15s ease, transform 0.15s ease"
                _hover={{
                  filter: 'none',
                  transform: 'scale(1.1)'
                }}
              />

              <Text isTruncated>{playlist.name}</Text>

              <Text
                noOfLines={2}
                dangerouslySetInnerHTML={{ __html: playlist.description }}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}
    </Page>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  return { props: { session } }
}

export default Home
