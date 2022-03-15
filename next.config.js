/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_ENDPOINT: process.env.API_ENDPOINT
  },
  images: {
    domains: []
  }
}

module.exports = nextConfig
