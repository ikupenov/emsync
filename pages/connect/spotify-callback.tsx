import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { isNil } from 'lodash-es'
import { useToast } from '@chakra-ui/react'

import { wrapper } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import {
  connectSpotify,
  connectSpotifyFailed,
  selectSpotifyConnection
} from '../../features/connection'

export default function Callback() {
  const router = useRouter()
  const toast = useToast()

  const { status, error } = useAppSelector(selectSpotifyConnection)

  useEffect(() => {
    if (status === 'loading') return

    if (error) {
      toast({
        title: 'We could not connect to your Spotify account.',
        description: 'There was an issue connecting to your Spotify account. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }

    router.push('/connect')
  }, [router, toast, status, error])

  return null
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context) => {
    const { code, state, error: callbackError } = context.query

    if (!isNil(callbackError)) {
      store.dispatch(connectSpotifyFailed())
      return { props: {} }
    }

    if (isNil(code) || isNil(state)) {
      return {
        redirect: {
          destination: '/connect',
          permanent: false
        }
      }
    }

    await store.dispatch(
      connectSpotify({ code: code as string, state: state as string })
    )

    return { props: {} }
  }
)
