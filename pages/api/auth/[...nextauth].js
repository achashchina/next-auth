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
        console.log('result', result);
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }

        // compare()
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
};

export default NextAuth(authOptions);
