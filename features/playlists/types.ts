export interface PlaylistImage {
  url: string,
  width?: number | null
  height?: number | null
}

export interface Playlist {
  id: string
  name: string
  description: string
  collaborative: boolean
  images: PlaylistImage[]
}

interface PlaylistData {
  items: Playlist[],
  skip: number
  limit: number
  total: number
}

export interface SpotifyPlaylistsState {
  data: PlaylistData | null,
  error: string | null,
  status: 'idle' | 'loading' | 'failed'
}

export interface PlaylistsState {
  spotify: SpotifyPlaylistsState
}
