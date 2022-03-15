import React from 'react'

import { Container } from '@chakra-ui/react'

export interface BodyProps {
  width: number | string
  children: React.ReactNode
}

export function Body({ width, children }: BodyProps) {
  return (
    <Container as="main" w="full" maxW={width} py={8}>
      {children}
    </Container>
  )
}
