import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
  AnyAction,
  Reducer
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { persistReducer, persistStore } from 'redux-persist'

import { storage } from './storage'
import { counterSlice, counterReducer } from '../features/counter'
import { connectionsSlice, connectionsReducer } from '../features/connect'

const combinedReducer = combineReducers({
  [counterSlice.name]: counterReducer,
  [connectionsSlice.name]: connectionsReducer
})

const hydratedReducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    // use previous state and apply delta from hydration
    const nextState = { ...state, ...action.payload }
    return nextState
  }

  return combinedReducer(state, action)
}

const persistedReducer = persistReducer(
  { key: 'emsync', storage },
  hydratedReducer as Reducer<ReturnType<typeof combinedReducer>>
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)

export const makeStore = () => store

type Store = ReturnType<typeof makeStore>

export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<Store>(makeStore, { debug: true })
