import { useEffect } from 'react'

import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import {
  Box,
  Heading,
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
        <Heading mb={8}>Hello, {session?.user?.name}</Heading>
      )}

      {playlists.status === 'loading' && 'Loading playlists...'}

      {playlists.status === 'idle' && (
        <SimpleGrid columns={[1, 1, 3]} spacing={8} autoRows="1fr">
          {playlists.data?.items.map(playlist => (
            <Box
              key={playlist.id}
              bgColor="gray.700"
              p={4}
              borderRadius="md"
              filter="grayscale(100%)"
              transition="
                filter var(--emsync-transition-duration-fast) var(--emsync-transition-easing-ease-in-out),
                transform var(--emsync-transition-duration-fast) var(--emsync-transition-easing-ease-in-out)
              "
              _hover={{
                filter: 'none',
                transform: 'scale(1.05)'
              }}
            >
              <Image
                src={playlist.images[0].url}
                objectFit="cover"
                borderRadius="md"
                boxShadow="xl"
                mb={4}
              />

              <Text isTruncated>{playlist.name}</Text>

              <Text
                noOfLines={2}
                dangerouslySetInnerHTML={{ __html: playlist.description }}
                fontSize="sm"
                color="gray.300"
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
