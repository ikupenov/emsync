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

export interface PlaylistImage {
  url: string,
  width?: number | null
  height?: number | null
}

export interface PlaylistResult {
  id: string
  name: string
  description: string
  collaborative: boolean
  images: PlaylistImage[]
}

export interface GetPlaylistsResult {
  items: PlaylistResult[]
  offset: number
  limit: number
  total: number
}
