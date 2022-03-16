export interface SignInArgs {
  code: string
  state: string
}

export interface SignInResult {
  accessToken?: string
  expiresIn?: string
  error?: string
}

export interface GetPlaylistsArgs {
  accessToken: string
}

export interface PlaylistResult {
  id: string
  name: string
  description: string
  collaborative: boolean
}

export interface GetPlaylistsResult {
  items: PlaylistResult[]
  offset: number
  limit: number
}
