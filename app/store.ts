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
import { spotifyApi } from './api/spotify'
import { connectionsSlice, connectionsReducer } from '../features/connection'
import { playlistsSlice, playlistsReducer } from '../features/playlists'

const combinedReducer = combineReducers({
  [spotifyApi.reducerPath]: spotifyApi.reducer,

  [connectionsSlice.name]: connectionsReducer,
  [playlistsSlice.name]: playlistsReducer
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
  { key: 'emsync', storage, blacklist: [spotifyApi.reducerPath] },
  hydratedReducer as Reducer<ReturnType<typeof combinedReducer>>
)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(
      spotifyApi.middleware
    )
})

export const persistor = persistStore(store)

export const makeStore = () => store

type Store = ReturnType<typeof makeStore>

export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<Store>(makeStore)
