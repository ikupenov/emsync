import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit'

import { counterSlice, counterReducer } from '../features/counter'
import { connectSlice, connectReducer } from '../features/connect'

export const store = configureStore({
  reducer: {
    [counterSlice.name]: counterReducer,
    [connectSlice.name]: connectReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>
