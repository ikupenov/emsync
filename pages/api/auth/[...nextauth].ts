/* eslint-disable @typescript-eslint/no-non-null-assertion */

import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
// import SpotifyProvider from 'next-auth/providers/spotify'
// import FacebookProvider from 'next-auth/providers/facebook'
// import EmailProvider from 'next-auth/providers/email'

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    })
  ],
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out'
  },
  theme: {
    colorScheme: 'dark',
    brandColor: '#f79489',
    logo: ''
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin'
      return token
    }
  }
})
