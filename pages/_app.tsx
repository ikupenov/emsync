import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/integration/react'

import '../styles/globals.scss'

import { theme } from '../styles'
import { wrapper, persistor } from '../app/store'

function App({ Component, pageProps }: AppProps) {
  return (
    <PersistGate persistor={persistor}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </PersistGate>
  )
}

export default wrapper.withRedux(App)
