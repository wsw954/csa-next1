import NextAuth from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../database/connectDB";

export default NextAuth({
  providers: [],
  adapter: MongoDBAdapter(clientPromise),
});
