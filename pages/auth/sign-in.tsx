import { getProviders, signIn } from 'next-auth/react'
import { Box, Button } from '@chakra-ui/react'

import { Page } from '../../components/layouts'

interface SignInProps {
  providers: [any]
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

export async function getServerSideProps() {
  const providers = await getProviders()
  return { props: { providers } }
}
