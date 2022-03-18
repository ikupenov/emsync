import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
  AnyAction,
  Reducer
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'

import { storage } from './storage'
import { spotifyApi } from './api/spotify-api'
import { connectionsSlice, connectionsReducer } from '../features/connection'
import { playlistsSlice, playlistsReducer } from '../features/playlists'
import { isServerSide } from '../lib/common'

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

const makeConfiguredStore = (reducer: Reducer) => configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(
      spotifyApi.middleware
    )
})

export const makeStore = (): ReturnType<typeof makeConfiguredStore> => {
  if (isServerSide()) {
    return makeConfiguredStore(hydratedReducer)
  }

  const persistedReducer = persistReducer(
    { key: 'emsync', storage, blacklist: [spotifyApi.reducerPath] },
    hydratedReducer as Reducer<ReturnType<typeof combinedReducer>>
  )

  const store = makeConfiguredStore(persistedReducer)
  store.persistor = persistStore(store)

  return store
}

export type Store = ReturnType<typeof makeStore>

export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper<Store>(makeStore)
