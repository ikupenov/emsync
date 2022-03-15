import { NextPageContext } from 'next'
import Link from 'next/link'
import { getSession, useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  ButtonGroup,
  Text
} from '@chakra-ui/react'

import { RootState } from '../app/store'
import {
  increment,
  decrement,
  incrementByAmount
} from '../features/counter'

function Home() {
  const { data: session, status } = useSession()

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <Box>
      {status === 'authenticated' && (
        <Text>Hello {session?.user?.name}</Text>
      )}

      {status === 'unauthenticated' && (
        <Link href="/api/auth/signin">Sign in</Link>
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
  return {
    props: {
      session: await getSession(context)
    }
  }
}

export default Home
