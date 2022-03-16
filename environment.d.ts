declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_URL: string
      GOOGLE_ID: string
      GOOGLE_SECRET: string
      SPOTIFY_ACCOUNTS_BASE_URL: string
      SPOTIFY_ACCOUNTS_API_URL: string
      SPOTIFY_ID: string
      SPOTIFY_SECRET: string
      SPOTIFY_SCOPE: string
      SPOTIFY_REDIRECT_URL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
