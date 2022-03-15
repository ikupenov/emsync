import type { NextPage } from 'next'

import { useDispatch, useSelector } from 'react-redux'
import {
  Box,
  Button,
  ButtonGroup,
  Text
} from '@chakra-ui/react'

import { RootState } from '../app/store'
import { decrement, increment, incrementByAmount } from '../features/counter'

const Home: NextPage = () => {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <Box>
      Hello

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

export default Home
