export interface ConnectArgs {
  code: string
  state: string
}

export interface ConnectResult {
  accessToken?: string
  refreshToken?: string
  expiresIn?: string
  error?: string
}

export interface ReconnectArgs {
  refreshToken: string
}

export interface ReconnectResult {
  accessToken?: string
  expiresIn?: string
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
