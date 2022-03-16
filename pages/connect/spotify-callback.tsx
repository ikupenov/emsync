import { useEffect } from 'react'

import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import { isNil } from 'lodash-es'
import { serialize } from 'cookie'
import { useToast } from '@chakra-ui/react'

import { spotifyService } from '../../services'

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

export async function getServerSideProps(context: NextPageContext) {
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

  const {
    accessToken,
    error: serverError
  } = await spotifyService.signIn(code as string, state as string)

  if (!isNil(serverError)) {
    return { props: { error: serverError } }
  }

  if (!isNil(accessToken)) {
    const accessTokenCookie = serialize('emsync.spotify-at', accessToken, { path: '/' })
    context.res?.setHeader('Set-Cookie', [accessTokenCookie])

    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    redirect: {
      destination: '/connect',
      permanent: false
    }
  }
}
