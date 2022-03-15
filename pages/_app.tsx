import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Provider as StateProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.scss'

import { theme } from '../styles'
import { store } from '../app/store'

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <StateProvider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </StateProvider>
    </SessionProvider>
  )
}

export default App
