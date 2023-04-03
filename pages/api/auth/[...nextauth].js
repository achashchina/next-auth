import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import connectMongo from '../../../db/connection';
import Users from '../../../model/UsersSchema';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: 'Connection Failed...!';
        });

        const result = await Users.findOne({ email: credentials.email });
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }

        const checkPassword = await compare(credentials.password, result.password);

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return result;
      },
    }),
  ],
  // to generate secret: openssl rand -base64 32
  secret: 'tuyZ3mJYFwuxHw22yusO+wo7aW0+w99pmQTEQY2qIcg=',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user, account }) => {
      if (user && account) {
        token.user = user;
        token.account = account;
        return {
          ...token,
          accessToken: token.account.access_token,
          accessTokenExpires: Date.now() + token.account.expires_at * 1000,
          refreshToken: token.account.refresh_token ? token.account.refresh_token : '',
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      // return refreshAccessToken(token)
    },
    session: async ({ session, token }) => {
      if (token.account.provider === 'credentials') {
        session.user = {
          ...token.user,
          name: token.user.username,
          id: token.user.username,
        };
      }
      if (token.account.provider === 'google') {
        session.user = token.user;
      }

      session.localization = token.user.localization || 'en';
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
};

export default NextAuth(authOptions);
