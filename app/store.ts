import {
  configureStore,
  combineReducers,
  Action,
  ThunkAction,
  AnyAction,
  Reducer
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import { counterReducer } from '../features/counter'
import { connectReducer } from '../features/connect'

const combinedReducer = combineReducers({
  counter: counterReducer,
  connect: connectReducer
})

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload // apply delta from hydration
    }

    return nextState
  }

  return combinedReducer(state, action)
}

export const makeStore = () =>
  configureStore({ reducer: reducer as Reducer<ReturnType<typeof combinedReducer>> })

type Store = ReturnType<typeof makeStore>

export type RootState = ReturnType<Store['getState']>
export type AppDispatch = Store['dispatch']
export type AppThunk<ReturnType = void> =
  ThunkAction<ReturnType, RootState, unknown, Action<string>>

export const wrapper = createWrapper(makeStore, { debug: true })
