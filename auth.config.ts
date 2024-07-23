import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'

export default {
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
          // Logged in users are authenticated, otherwise redirect to login page
          return !!auth
        },
      }
} satisfies NextAuthConfig