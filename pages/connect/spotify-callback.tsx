import { useEffect } from 'react'

import { useRouter } from 'next/router'
import { isNil } from 'lodash-es'
import { useToast } from '@chakra-ui/react'

import { SignInResult } from '../../services'
import { wrapper } from '../../app/store'
import { connectSpotify } from '../../features/connect'

interface CallbackProps {
  error: string
}

export default function Callback({ error }: CallbackProps) {
  const router = useRouter()
  const toast = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: 'We could not connect to your Spotify account.',
        description: 'There was an issue connecting to your Spotify account. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true
      })

      router.push('/connect')
    }
  }, [toast, router, error])

  return null
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async (context) => {
    const { code, state, error: callbackError } = context.query

    if (!isNil(callbackError)) {
      return { props: { error: callbackError } }
    }

    if (isNil(code) || isNil(state)) {
      return {
        redirect: {
          destination: '/connect',
          permanent: false
        }
      }
    }

    const { payload } = await store.dispatch(
      connectSpotify({ code: code as string, state: state as string })
    )

    const { accessToken, error: serverError } = payload as SignInResult

    if (!isNil(serverError)) {
      return { props: { error: serverError } }
    }

    return {
      redirect: {
        destination: isNil(accessToken) ? '/connect' : '/',
        permanent: false
      }
    }
  }
)
