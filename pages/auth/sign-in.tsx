import { NextPageContext } from 'next'
import {
  ClientSafeProvider,
  getProviders,
  getSession,
  signIn
} from 'next-auth/react'
import { Box, Button } from '@chakra-ui/react'

import { Page } from '../../components/layouts'

interface SignInProps {
  providers: [ClientSafeProvider]
}

export default function SignIn({ providers }: SignInProps) {
  return (
    <Page title="Sign in" centerContent>
      {Object.values(providers).map(provider => (
        <Box key={provider.id}>
          <Button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </Button>
        </Box>
      ))}
    </Page>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders()
  const session = await getSession(context)

  if (session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { providers, session } }
}
