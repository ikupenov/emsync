import '@reduxjs/toolkit'
import type { Persistor } from 'redux-persist'

declare module '@reduxjs/toolkit' {
  export interface Store {
    persistor: Persistor
  }
}
