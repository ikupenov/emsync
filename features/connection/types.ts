export interface SpotifyConnectionData {
  accessToken: string
}

export interface SpotifyConnectionState {
  data: SpotifyConnectionData | null
  error: string | null,
  status: 'idle' | 'loading' | 'failed',
  connected: boolean
}

export interface ConnectionState {
  spotify: SpotifyConnectionState
}

export interface SignInArg {
  code: string
  state: string
}
