import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'

export default {
    providers: [Google],
    callbacks: {
        authorized: async ({ auth }) => {
          // Logged in users are authenticated, otherwise redirect to login page
          // implemented this so that we can bypass authjs for testing purposes
          if(process.env.NEXT_PUBLIC_USE_TEST === 'true') {
            return true
          }
          return !!auth
        },
      }
} satisfies NextAuthConfig