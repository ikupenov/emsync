import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import {
  Link as ChakraLink,
  Box,
  BoxProps,
  Button
} from '@chakra-ui/react'

export function Header(props: BoxProps) {
  const { status } = useSession()

  return (
    <Box as="header" {...props}>
      {status === 'authenticated' && (
        <Link href="api/auth/sign-out" passHref>
          <Button
            as={ChakraLink}
            variant="link"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign out
          </Button>
        </Link>
      )}

      {status === 'unauthenticated' && (
        <Link href="/auth/sign-in" passHref>
          <Button as={ChakraLink} variant="link">Sign in</Button>
        </Link>
      )}

      <Link href="/" passHref>
        <Button as={ChakraLink} variant="link">Dashboard</Button>
      </Link>

      <Link href="/connect" passHref>
        <Button as={ChakraLink} variant="link">Connect providers</Button>
      </Link>
    </Box>
  )
}
