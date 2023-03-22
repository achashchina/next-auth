import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      async authorize(credentials, req) {
        const response = await fetch('https://redux-adv-new-default-rtdb.firebaseio.com/users.json', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Request failed!');
        }

        const users = await response.json();
        const userList = [];

        for (const property in users) {
          userList.push(users[property]);
        }

        const user = userList.find((user) => user.email === credentials.email);

        if (!user) {
          throw new Error('No user Found with Email Please Sign Up...!');
        }

        const checkPassword = await compare(credentials.password, user.password);

        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Username or Password doesn't match");
        }

        return user;
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
