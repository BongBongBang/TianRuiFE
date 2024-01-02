import NextAuth, { type DefaultSession } from 'next-auth'
import { NextResponse } from 'next/server'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials';

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
  secret: 'alkdsjfklasjdlk1',
  providers: [GitHub],
  callbacks: {
    jwt(params) {
    // jwt({ token, profile }) {
      console.log('jwt---\n', params);
      return params.token
      // if (profile) {
      //   token.id = profile.id
      //   token.image = profile.avatar_url || profile.picture
      // return token
    },
    // This callback is called whenever a session is checked
    session: ({ session, token }) => {
      console.log('session--\n', session, token);
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ request, auth }) {
      console.log('authorized--\n');
    //   if (!!!auth?.user) {
        // return NextResponse.redirect("http://www.baidu.com")
    //   }
      return !!auth?.user // this ensures there is a logged in user for -every- request
    // return true;
    },
  },
  pages: {
    signIn: '/sign-in'      
  }
})
