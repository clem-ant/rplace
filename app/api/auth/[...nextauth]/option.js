import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/util/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        user.pixelNumber = 0;
      }
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
};

export default authOptions;
