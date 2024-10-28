import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/util/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the user exists in the database
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        });

        if (!user) {
          // If the user doesn't exist, create a new user in the database
          const newUser = await prisma.user.create({
            data: {
              username: credentials.username,
              password: credentials.password,
            },
          });
          return newUser;
        }

        // If the user exists, return the user object
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
};

export default authOptions;
