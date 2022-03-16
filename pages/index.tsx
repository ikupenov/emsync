import { NextPageContext } from 'next'
import { getSession, useSession } from 'next-auth/react'
import {
  Button,
  ButtonGroup,
  Text
} from '@chakra-ui/react'

import { useAppSelector, useAppDispatch } from '../app/hooks'
import { Page } from '../components/layouts'
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
    <Page title="Dashboard">
      {status === 'authenticated' && (
        <Text>Hello, {session?.user?.name}</Text>
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
    </Page>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)
  return { props: { session } }
}

export default Home
