import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'

import '../styles/globals.scss'

import { theme } from '../styles'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
