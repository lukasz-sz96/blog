import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../middleware/database";

export default NextAuth({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase();
        const user = await db
          .collection("admins")
          .findOne({ user: credentials.username }, { projection: { _id: 0 } });
        if (user) {
          const passCheck = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (passCheck) {
            return user;
          }
        }
      },
    }),
  ],
});
