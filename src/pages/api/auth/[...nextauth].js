import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../database/connectDB";
import EmailProvider from "next-auth/providers/email";
import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../models/user";

export default NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectMongo();
      const dbUser = await User.findOne({
        email: user.email,
      });
      if (dbUser != null) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token, user }) {
      console.log(user);
      //Pass user doc to session
      session.user = user;
      return session;
    },
  },

  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
});
