import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ChakraProvider } from '@chakra-ui/react'

import '../styles/globals.scss'

import { theme } from '../styles'
import { wrapper } from '../app/store'
import { spotifyClientInterceptor } from '../app/api/extensions'

function App({ Component, pageProps }: AppProps) {
  const store = useStore()
  const { persistor } = store

  spotifyClientInterceptor.init(store)

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
