import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { isClientSide } from '../lib/common'

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null)
  },
  setItem(_: unknown, value: unknown) {
    return Promise.resolve(value)
  },
  removeItem() {
    return Promise.resolve()
  }
})

export const storage =
  isClientSide()
    ? createWebStorage('local')
    : createNoopStorage()
