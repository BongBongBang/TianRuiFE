import NextAuth, { type DefaultSession } from 'next-auth'
import { NextResponse } from 'next/server'
import GitHub from 'next-auth/providers/github'
import { BASE_URL } from './lib/utils';
import path from 'path';

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
    providers: [{
        id: 'official-account',
        name: '公众号登录',
        issuer: 'tian-rui',
        type: 'oauth',
        checks: ['none'],
        token: `${BASE_URL}/oauth/token`,
        clientId: 'next',
        clientSecret: 'next-secret',
        userinfo: `${BASE_URL}/oauth/userinfo`,
    }],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        // jwt(params) {
        jwt({ token, profile }) {
            console.log('jwt---\n', profile);
            if (profile) {
                token.id = profile.id
                token.image = profile.avatar_url || profile.picture
            }
            return token
        },
        // This callback is called whenever a session is checked
        session: ({ session, token }) => {
            console.log('session-here--\n', session, token);
            if (session?.user && token?.id) {
                session.user.id = String(token.id)
            }
            return session
        },
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl;
            if (pathname == "/sign-in") {
                return true;
            }
            console.log('authorized', pathname);
            // return true
            // const response = await fetch(`${BASE_URL}/check_session`, {
            // method: "GET",
            // cache: 'no-cache'
            // });
            // if (401 == response.status) {
            // return false;
            // }
            // return true;
            return !!auth?.user // this ensures there is a logged in user for -every- request
            // return true;
        },
    },
    pages: {
        signIn: '/sign-in'
    }
})
