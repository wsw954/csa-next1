import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../database/connectDB";
import EmailProvider from "next-auth/providers/email";
import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../models/user";
let dbUser = null;

export default NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectMongo();
      dbUser = await User.findOne({
        email: user.email,
      });
      if (dbUser != null) {
        return true;
      } else {
        return false;
      }
    },
    async session({ session, token, user }) {
      //Pass user doc to session
      session.user = user;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (dbUser != null) {
        //Route to page relevant to userType (buyer or dealer)
        return `${baseUrl}` + "/" + dbUser.userType + "s/dashboard";
      }
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
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
