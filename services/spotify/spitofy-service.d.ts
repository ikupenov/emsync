import 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    hasRetried?: boolean
  }
}
