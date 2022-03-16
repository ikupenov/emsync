import { NextPageContext } from 'next'
import { getSession, signOut, useSession } from 'next-auth/react'
import {
  Box,
  Button,
  ButtonGroup,
  Link,
  Text
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  increment,
  decrement,
  incrementByAmount,
  selectCount
} from '../features/counter'

function Home() {
  const { data: session, status } = useSession()

  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()

  return (
    <Box>
      {status === 'authenticated' && (
        <>
          <Text>Hello, {session?.user?.name}</Text>

          <Button
            as={Link}
            variant="link"
            href="api/auth/sign-out"
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Sign out
          </Button>
        </>
      )}

      {status === 'unauthenticated' && (
        <Button
          as={Link}
          variant="link"
          href="/auth/sign-in"
        >
          Sign in
        </Button>
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
    </Box>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  return { props: { session } }
}

export default Home
