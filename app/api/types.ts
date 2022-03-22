import type {
  BaseQueryApi as RtkBaseQueryApi
} from '@reduxjs/toolkit/dist/query/baseQueryTypes'

import type { AppDispatch, RootState } from '../store'

export interface BaseQueryApi extends RtkBaseQueryApi {
  dispatch: AppDispatch;
  getState: () => RootState;
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> = {
  error: E;
  data?: undefined;
  meta?: M;
} | {
  error?: undefined;
  data: T;
  meta?: M;
}
