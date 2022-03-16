/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_ENDPOINT,
    SPOTIFY_BASE_URL: process.env.SPOTIFY_BASE_URL,
    SPOTIFY_API_URL: process.env.SPOTIFY_API_URL,
    SPOTIFY_ID: process.env.SPOTIFY_ID,
    SPOTIFY_SCOPE: process.env.SPOTIFY_SCOPE,
    SPOTIFY_REDIRECT_URL: process.env.SPOTIFY_REDIRECT_URL
  },
  images: {
    domains: []
  }
}

module.exports = nextConfig
