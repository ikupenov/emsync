import { configureStore } from '@reduxjs/toolkit'

import { counterSlice, counterReducer } from '../features/counter'

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
