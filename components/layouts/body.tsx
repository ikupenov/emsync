import React from 'react'

import { Container, ContainerProps } from '@chakra-ui/react'

export function Body({ width, centerContent, children }: ContainerProps) {
  return (
    <Container
      as="main"
      w="full"
      maxW={width}
      py={8}
      centerContent={centerContent}
    >
      {children}
    </Container>
  )
}
