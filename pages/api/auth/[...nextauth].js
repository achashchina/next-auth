import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import connectMongo from '../../../db/connection';
import Users from '../../../model/Schema';

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
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return { ...token };
    },
    session: async ({ session, token }) => {
      session.user.name = token.user.username || token.name;
      session.user.id = token.user._id || token.user.id;
      session.localization = token.user.localization || 'en';
      return session;
    },
  },
};

export default NextAuth(authOptions);
