import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  providers: [GitHub],
  callbacks: {
    jwt(params) {
    // jwt({ token, profile }) {
      console.log('jwt', params);
      return params.token
      // if (profile) {
      //   token.id = profile.id
      //   token.image = profile.avatar_url || profile.picture
      // }
      // return token
    },
    // This callback is called whenever a session is checked
    session: ({ session, token }) => {
      console.log('session', session, token);
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ request, auth }) {
      console.log('authorized', request, auth);
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})
