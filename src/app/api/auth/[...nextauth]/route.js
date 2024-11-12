import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "@/app/models/User";
import NextAuth, { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/libs/mongoConnect";
import { UserInfo } from "@/app/models/UserInfo";
import { signIn } from "next-auth/react";

export const authOptions = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      async profile(profile) {
        // Check if there's a user with the same email
        const existingUser = await User.findOne({ email: profile.email });
        if (existingUser && !existingUser.googleId) {
          existingUser.googleId = profile.sub; //Save Googel Id
          await existingUser.save();
        } else if (existingUser && existingUser.googleId !== profile.sub) {
          throw new Error("Account alredy linked with a different Google ID.");
        }
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      id: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          // Changed from 'username' to 'email'
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const email = credentials?.email;
        const password = credentials?.password;

        // Ensure mongoose connection is handled properly
        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email });
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        if (passwordOk) {
          return {
            id: user._id,
            email: user.email,
            name: user.name || email.split("@")[0], // Fallback to email username
          };
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the user data on the token if they exist
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the token properties to the session for easy access in the UI
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
